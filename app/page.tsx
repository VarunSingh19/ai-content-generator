'use client'

import React, { useState, useEffect } from 'react'
import { ArrowRight } from 'lucide-react'
import { FileText } from 'lucide-react'
import { Sliders } from 'lucide-react'
import { BookOpen } from 'lucide-react'
import { MessageCircle } from 'lucide-react'
import { User } from 'lucide-react'
import { Menu } from 'lucide-react'
import { X } from 'lucide-react'
import { Brain } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { motion, useAnimation } from 'framer-motion'

export default function Home() {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const controls = useAnimation()

  useEffect(() => {
    controls.start({
      opacity: [0.5, 1, 0.5],
      scale: [1, 1.2, 1],
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
    })
  }, [controls])

  const handleClick = () => {
    router.push('/dashboard')
  }

  const features = [
    {
      icon: <FileText className="w-7 h-7" />,
      title: "Smart Templates",
      description: "AI-powered templates for every content need",
      color: "from-cyan-500 to-blue-600"
    },
    {
      icon: <Sliders className="w-7 h-7" />,
      title: "Adaptive Learning",
      description: "Our AI evolves with your content preferences",
      color: "from-indigo-500 to-purple-600"
    },
    {
      icon: <BookOpen className="w-7 h-7" />,
      title: "Knowledge Integration",
      description: "Seamlessly blend AI insights with your expertise",
      color: "from-fuchsia-500 to-pink-600"
    },
    {
      icon: <MessageCircle className="w-7 h-7" />,
      title: "AI Collaboration",
      description: "Real-time AI assistance in your workflow",
      color: "from-rose-500 to-red-600"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-hidden">
      {/* AI Background Effect */}
      <div className="absolute inset-0 overflow-hidden">
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

      {/* Navigation */}
      <nav className="relative z-10 p-6 flex justify-between items-center max-w-7xl mx-auto">
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
        <div className="hidden md:flex items-center gap-6">
          {['Features', 'Pricing', 'About', 'Contact'].map((item, index) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-gray-300 hover:text-white transition-colors"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.1 }}
            >
              {item}
            </motion.a>
          ))}
          <motion.button
            className="flex items-center gap-2 text-white bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
            onClick={handleClick}
            aria-label="Get Started"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <User className="w-4 h-4" />
            Get Started
          </motion.button>
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <motion.div
          className="md:hidden bg-gray-800 shadow-xl rounded-b-2xl absolute z-20 w-full"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {['Features', 'Pricing', 'About', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="block px-6 py-3 text-gray-300 hover:bg-gray-700">
              {item}
            </a>
          ))}
          <button
            className="flex items-center gap-2 text-white bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 w-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
            onClick={handleClick}
            aria-label="Get Started"
          >
            <User className="w-4 h-4" />
            Get Started
          </button>
        </motion.div>
      )}

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <div className="text-center max-w-4xl mx-auto">
          <motion.h1
            className="text-6xl font-bold mb-8 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-white">Unleash the Power of </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">AI Content</span>
          </motion.h1>
          <motion.p
            className="text-gray-300 text-xl leading-relaxed mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Experience the future of content creation with our cutting-edge AI technology. Generate captivating, context-aware content in seconds.
          </motion.p>
          <motion.button
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 flex items-center gap-2 mx-auto group"
            onClick={handleClick}
            aria-label="Get started with AI Content Generator"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get started
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>

        {/* AI Brain Animation */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 pointer-events-none"
          animate={controls}
        >
          <Brain className="w-full h-full text-purple-500/20" />
        </motion.div>
      </main>

      {/* Features Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-gray-600 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <div className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-6`}>
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
