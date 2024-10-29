'use client'

import React, { useState, useEffect } from 'react'
import { ArrowRight, FileText, Sliders, BookOpen, MessageCircle, User, Menu, X, Brain, Zap, Shield, Sparkles } from 'lucide-react'
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
      icon: FileText,
      title: "Smart Templates",
      description: "AI-powered templates for every content need",
      color: "from-cyan-500 to-blue-600"
    },
    {
      icon: Sliders,
      title: "Adaptive Learning",
      description: "Our AI evolves with your content preferences",
      color: "from-indigo-500 to-purple-600"
    },
    {
      icon: BookOpen,
      title: "Knowledge Integration",
      description: "Seamlessly blend AI insights with your expertise",
      color: "from-fuchsia-500 to-pink-600"
    },
    {
      icon: MessageCircle,
      title: "AI Collaboration",
      description: "Real-time AI assistance in your workflow",
      color: "from-rose-500 to-red-600"
    }
  ]

  const pricingPlans = [
    {
      name: "Basic",
      price: "₹100.0",
      features: ["100 AI-generated articles/month", "Basic templates", "Email support"],
      color: "from-blue-400 to-blue-600"
    },
    {
      name: "Pro",
      price: "₹2999.99",
      features: ["Unlimited AI-generated content", "Advanced templates", "Priority support", "API access"],
      color: "from-purple-400 to-purple-600"
    },
    {
      name: "Enterprise",
      price: "Custom",
      features: ["Custom AI model training", "Dedicated account manager", "24/7 phone support", "On-premise deployment"],
      color: "from-pink-400 to-pink-600"
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

      {/* Floating AI Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-500 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
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
      <div id="features" className="relative z-10 max-w-7xl mx-auto px-6 pb-24">
        <h2 className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          Powerful AI Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-gray-600 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(0, 0, 255, 0.3)" }}
            >
              <div className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-6`}>
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">{feature.title}</h3>
              <p className="text-gray-400 mb-6">{feature.description}</p>
              <motion.button
                className="text-blue-400 flex items-center gap-2 hover:gap-3 transition-all duration-300"
                aria-label={`Learn more about ${feature.title}`}
                whileHover={{ x: 5, color: "#60A5FA" }}
              >
                Learn more <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* AI-generated Content Preview */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-24">
        <motion.div
          className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            AI-Generated Content Preview
          </h2>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-4 text-white">Input</h3>
              <div className="bg-gray-900 rounded-lg p-4 text-gray-300">
                Write a short blog post about the future of AI in content creation.
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-4 text-white">AI-Generated Output</h3>
              <div className="bg-gray-900 rounded-lg p-4 text-gray-300">
                <p>The future of AI in content creation is nothing short of revolutionary. As natural language processing and machine learning technologies continue to advance, we're witnessing a paradigm shift in how content is produced and consumed.</p>
                <p className="mt-2">AI-powered tools are not just augmenting human creativity; they're opening up new realms of possibility. From personalized articles tailored to individual readers' preferences to real-time content adaptation based on user engagement, the potential applications are boundless.</p>
                <p className="mt-2">However, it's crucial to remember that AI is a tool to enhance human creativity, not replace it. The most effective content strategies will likely involve a symbiosis of human insight and AI capabilities, leading to more engaging, relevant, and impactful content than ever before.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Pricing Section */}
      <div id="pricing" className="relative z-10 max-w-7xl mx-auto px-6 pb-24">
        <h2 className="text-4xl  font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          Choose Your AI Power
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-gray-600 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(0, 0, 255, 0.3)" }}
            >
              <h3 className="text-2xl font-bold mb-4 text-white">{plan.name}</h3>
              <p className={`text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r ${plan.color}`}>
                {plan.price}
              </p>
              <ul className="mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center mb-2 text-gray-300">
                    <Zap className="w-5 h-5 mr-2 text-blue-400" />
                    {feature}
                  </li>
                ))}
              </ul>
              <motion.button
                className={`w-full py-2 rounded-full bg-gradient-to-r ${plan.color} text-white font-medium`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Choose Plan
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* About Section */}
      <div id="about" className="relative z-10 max-w-7xl mx-auto px-6 pb-24">
        <h2 className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          About AIContent
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-4 text-white">Our Mission</h3>
            <p className="text-gray-300 mb-6">
              At AIContent, we're on a mission to revolutionize content creation through the power of artificial intelligence. We believe that by combining human creativity with AI capabilities, we can unlock new levels of productivity and innovation in content production.
            </p>
            <h3 className="text-2xl font-bold mb-4 text-white">Our Vision</h3>
            <p className="text-gray-300">
              We envision a future where AI-assisted content creation becomes the norm, enabling individuals and businesses to produce high-quality, engaging content at scale while focusing on strategy and creativity.
            </p>
          </motion.div>
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="aspect-square bg-gradient-to-br from-blue-500 to-purple-600 rounded-full absolute inset-0 blur-3xl opacity-20"></div>
            <img
              src='https://www.eweek.com/wp-content/uploads/2023/04/top-generative-ai-companies.png'
              alt="AI Content Creation"
              className="relative z-10 rounded-lg shadow-2xl"
            />
          </motion.div>
        </div>
      </div>

      {/* Contact Section */}
      <div id="contact" className="relative z-10 max-w-7xl mx-auto px-6 pb-24">
        <h2 className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          Get in Touch
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-4 text-white">Contact Us</h3>
            <p className="text-gray-300 mb-6">
              Have questions about AIContent? We're here to help! Reach out to us using the form below or through our social media channels.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-blue-400 hover:text-blue-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-blue-400 hover:text-blue-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </motion.div>
          <motion.form
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name</label>
              <input type="text" id="name" name="name" className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
              <input type="email" id="email" name="email" className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300">Message</label>
              <textarea id="message" name="message" rows={4} className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"></textarea>
            </div>
            <motion.button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Send Message
            </motion.button>
          </motion.form>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 bg-gray-900 border-t border-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-6 md:flex md:items-center md:justify-between">
          <div className="flex justify-center space-x-6 md:order-2">
            <a href="#" className="text-gray-400 hover:text-gray-300">
              <span className="sr-only">Facebook</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-300">
              <span className="sr-only">Instagram</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-300">
              <span className="sr-only">Twitter</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-300">
              <span className="sr-only">GitHub</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-center text-base text-gray-400">&copy; 2024 AI-Apps by Varun Singh, Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}