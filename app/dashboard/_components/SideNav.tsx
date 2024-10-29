'use client'

import React, { useEffect, useState, useCallback } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Cog, History, Home, IndianRupee, CreditCard, Brain, ChevronUp, ChevronDown } from 'lucide-react'
import UsageTrack from './UsageTrack'

const MenuList = [
  { name: 'Home', icon: Home, path: '/dashboard' },
  { name: 'History', icon: History, path: '/dashboard/history' },
  { name: 'Billing', icon: IndianRupee, path: '/dashboard/billing' },
  { name: 'Settings', icon: Cog, path: '/dashboard/setting' },
]

interface SideNavProps {
  onExpand: (expanded: boolean) => void;
}

export default function SideNav({ onExpand }: SideNavProps) {
  const router = useRouter()
  const path = usePathname()
  const [isSmallScreen, setIsSmallScreen] = useState(false)
  const [isNavExpanded, setIsNavExpanded] = useState(false)
  const [isUsageTrackExpanded, setIsUsageTrackExpanded] = useState(false)

  const handleResize = useCallback(() => {
    const smallScreen = window.innerWidth < 768
    setIsSmallScreen(smallScreen)
    setIsNavExpanded(!smallScreen)
    onExpand(!smallScreen)
  }, [onExpand])

  useEffect(() => {
    handleResize() // Check on initial render
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [handleResize])

  const toggleUsageTrack = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsUsageTrackExpanded(!isUsageTrackExpanded)
  }

  const handleClick = () => {
    router.push('/')
  }

  const handleExpand = useCallback((expanded: boolean) => {
    setIsNavExpanded(expanded)
    onExpand(expanded)
  }, [onExpand])

  return (
    <motion.div
      className="h-screen bg-gray-900 text-white border-r border-gray-800 transition-all duration-300 flex flex-col overflow-hidden fixed left-0 top-0 z-50"
      initial={false}
      animate={{ width: isNavExpanded ? 256 : 64 }}
      onHoverStart={() => isSmallScreen && handleExpand(true)}
      onHoverEnd={() => isSmallScreen && handleExpand(false)}
    >
      {/* Logo Section */}
      <div className={`flex ${isNavExpanded ? 'justify-start' : 'justify-center'} border-b border-gray-800 p-6 `}>
        <div className="flex items-center space-x-3 cursor-pointer" onClick={handleClick}>
          <motion.div
            className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 360],
              borderRadius: ['50%', '30%', '50%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          >
            <Brain className="w-5 h-5 text-white" />
          </motion.div>
          <AnimatePresence>
            {isNavExpanded && (
              <motion.span
                className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
              >
                AIContent
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Menu Items */}
      <div className="flex-grow mt-8 space-y-2 px-2">
        {MenuList.map((menu) => (
          <motion.div
            key={menu.path}
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors duration-200 ${path === menu.path ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            onClick={() => router.push(menu.path)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <menu.icon className="h-5 w-5 flex-shrink-0" />
            <AnimatePresence>
              {isNavExpanded && (
                <motion.span
                  className="text-sm font-medium whitespace-nowrap"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {menu.name}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Usage Track Section */}
      <div className="p-2 mb-4">
        <motion.div
          className={`bg-gray-800 rounded-lg overflow-hidden ${!isNavExpanded ? 'cursor-pointer' : ''}`}
          onClick={() => !isNavExpanded && handleExpand(true)}
        >
          {isNavExpanded ? (
            <>
              <UsageTrack />
              {isSmallScreen && (
                <div className="p-2 flex justify-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleUsageTrack}
                  >
                    {isUsageTrackExpanded ? (
                      <ChevronDown className="h-6 w-6 text-gray-400" />
                    ) : (
                      <ChevronUp className="h-6 w-6 text-gray-400" />
                    )}
                  </motion.div>
                </div>
              )}
            </>
          ) : (
            <div className="p-2 flex justify-center items-center">
              <CreditCard className="h-6 w-6 text-blue-400" />
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}