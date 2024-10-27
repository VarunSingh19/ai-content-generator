'use client'

import React, { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Cog, History, Home, IndianRupee, Brain } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import UsageTrack from './UsageTrack'

const MenuList = [
  {
    name: 'Home',
    icon: Home,
    path: '/dashboard',
  },
  {
    name: 'History',
    icon: History,
    path: '/dashboard/history',
  },
  {
    name: 'Billing',
    icon: IndianRupee,
    path: '/dashboard/billing',
  },
  {
    name: 'Settings',
    icon: Cog,
    path: '/dashboard/setting',
  },
]

export default function SideNav() {
  const router = useRouter()
  const path = usePathname()

  useEffect(() => {
    console.log(path)
  }, [path])

  return (
    <div className="h-screen p-5 bg-gray-900 text-white border-r border-gray-800">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] opacity-10 bg-cover bg-center"></div>
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Animated Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      </div>
      {/* Logo section */}
      <div className="flex justify-center border-b border-gray-800 pb-6">
        <div className="flex items-center space-x-3">
          <div className="flex">
            <motion.div
              className="w-8 h-8 rounded-full bg-blue-500"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 360],
                borderRadius: ["50%", "30%", "50%"]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          </div>
          <span className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">AIContent</span>
        </div>
      </div>

      {/* Menu Items */}
      <div className="mt-8 space-y-2">
        {MenuList.map((menu, index) => (
          <motion.div
            key={menu.path}
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors duration-200 ${path === menu.path
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
              : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            onClick={() => router.push(menu.path)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <menu.icon className="h-5 w-5" />
            <span className="text-sm font-medium">{menu.name}</span>
          </motion.div>
        ))}
      </div>

      {/* Usage Track */}
      <div className="absolute bottom-8 left-5 right-5">
        <UsageTrack />
      </div>
    </div>
  )
}
