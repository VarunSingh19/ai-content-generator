'use client'

import React from 'react'
import { Search, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input'

interface SearchSectionProps {
  onSearchInput: (value: string) => void
}

export default function SearchSection({ onSearchInput }: SearchSectionProps) {
  return (
    <motion.div
      className="p-10 bg-gradient-to-br bg-gray-900  border-r border-gray-800 flex justify-center flex-col items-center text-white"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
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
      <motion.h2
        className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
      >
        Browse AI-Powered Templates
      </motion.h2>
      <motion.p
        className="text-lg text-gray-300 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        What would you like to create with AI today?
      </motion.p>
      <motion.div
        className="w-full max-w-2xl"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.4, type: 'spring', stiffness: 300 }}
      >
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search AI templates..."
            onChange={(event) => onSearchInput(event.target.value)}
            className="pl-10 pr-4 py-3 w-full bg-gray-800 border-2 border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-all duration-300"
          />
          <motion.div
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="text-purple-400" />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}