'use client'

import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { motion } from 'framer-motion'
import { eq, desc } from 'drizzle-orm'
import { TotalUsageContext } from '@/app/(context)/TotalUsageContext'
import { UpdateCreditUsageContext } from '@/app/(context)/UpdateCreditUsageContext'
import { UserSubscriptionContext } from '@/app/(context)/UserSubscriptionContext'
import { Progress } from '@/components/ui/progress'
import { db } from '@/utils/db'
import { aiOutput, UserSubscription } from '@/utils/schema'
import { Sparkles, Zap } from 'lucide-react'
import { HISTORY } from '../history/page'

export default function UsageTrack() {
    const { user } = useUser()
    const { totalUsage, setTotalUsage } = useContext(TotalUsageContext)
    const { userSubscription, setUserSubscription } = useContext(UserSubscriptionContext)
    const { updateCreditUsage } = useContext<any>(UpdateCreditUsageContext)
    const [maxWords, setMaxWords] = useState(10000)
    const router = useRouter()

    useEffect(() => {
        if (user) {
            GetData()
            IsUserSubscribed()
        }
    }, [user])

    useEffect(() => {
        if (user && updateCreditUsage) {
            GetData()
        }
    }, [updateCreditUsage])

    const GetData = async () => {
        try {
            const fullName = `${user?.firstName} ${user?.lastName}`
            console.log("Searching for user:", fullName)

            const result: HISTORY[] = await db.select()
                .from(aiOutput)
                .where(eq(aiOutput.createdBy, fullName))
                .orderBy(desc(aiOutput.id))

            console.log("Fetched AI responses:", result)
            GetTotalUsage(result)
        } catch (error) {
            console.error("Error fetching data:", error)
        }
    }

    const IsUserSubscribed = async () => {
        const result = await db.select().from(UserSubscription)
            .where(eq(UserSubscription.email, user?.primaryEmailAddress?.emailAddress))
        console.log("Subscription check result:", result)
        if (result.length > 0) {
            setUserSubscription(true)
            setMaxWords(100000)
        }
    }

    const GetTotalUsage = (result: HISTORY[]) => {
        let total = result.reduce((acc, element) => {
            console.log("Current AI response:", element.aiResponse)
            return acc + (element.aiResponse ? element.aiResponse.split(/\s+/).length : 0)
        }, 0)
        console.log("Total words:", total)
        setTotalUsage(total)
    }

    const handleUpgradeClick = () => {
        router.push('/dashboard/billing')
    }

    const usagePercentage = (totalUsage / maxWords) * 100

    return (
        <motion.div
            className="bg-gray-800 rounded-lg p-6 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white">AI Credits</h2>
                <Zap className="w-6 h-6 text-yellow-400" />
            </div>
            <Progress
                value={usagePercentage}
                className="h-2 mb-2"
                indicatorClassName="bg-gradient-to-r from-blue-500 to-purple-600"
            />
            <p className="text-sm text-gray-300 mb-4">
                {totalUsage.toLocaleString()} / {maxWords.toLocaleString()} credits used
            </p>
            <motion.button
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-md font-medium flex items-center justify-center gap-2 hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                onClick={handleUpgradeClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <Sparkles className="w-5 h-5" />
                Upgrade Plan
            </motion.button>
        </motion.div>
    )
}