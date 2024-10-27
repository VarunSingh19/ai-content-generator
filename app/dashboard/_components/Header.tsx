'use client'

import React from 'react'
import { UserButton } from '@clerk/nextjs'
import { Search, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input'

export default function Header() {
  return (

    <motion.div
      className="p-5 border-b border-gray-800 flex justify-between items-center bg-gray-900 text-white"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
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
      <motion.div
        className="flex gap-2 items-center p-2 border border-gray-700 rounded-md max-w-lg bg-gray-800"
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      >
        <Search className="text-gray-400" />
        <Input
          type="text"
          placeholder="Search AI-powered content..."
          className="bg-transparent border-none text-white placeholder-gray-400 focus:outline-none focus:ring-0"
        />
      </motion.div>
      <div className="flex gap-5 items-center">
        <motion.div
          className="bg-gradient-to-r from-blue-600 to-purple-600 p-1 rounded-full text-xs text-white px-4 py-2 flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Sparkles className="w-4 h-4" />
          <span>Upgrade to Pro for 100₹/month</span>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "border-2 border-purple-500"
              }
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}