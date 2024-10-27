'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import SearchSection from './_components/SearchSection'
import TemplatelistSection from './_components/TemplatelistSection'

export default function Dashboard() {
  const [userSearchInput, setUserSearchInput] = useState<string>('')

  return (
    <motion.div
      className="min-h-screen bg-gray-900 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
      >
        <SearchSection onSearchInput={(value: string) => setUserSearchInput(value)} />
      </motion.div>
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.4, type: 'spring', stiffness: 300 }}
      >
        <TemplatelistSection userSearchInput={userSearchInput} />
      </motion.div>
    </motion.div>
  )
}