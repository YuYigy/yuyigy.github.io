'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { scrollToTop, getScrollProgress } from '@/lib/scroll'

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const toggleVisibility = () => {
      const progress = getScrollProgress()
      setScrollProgress(progress)
      setIsVisible(window.pageYOffset > 300)
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 p-3 bg-dark-slate border border-cyber-cyan/50 text-cyber-cyan rounded-full shadow-lg hover:bg-cyber-cyan hover:text-space-blue transition-all duration-300 group"
        >
          {/* 进度环 */}
          <svg
            className="absolute inset-0 w-full h-full -rotate-90"
            viewBox="0 0 36 36"
          >
            <path
              className="text-slate-gray/20"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <motion.path
              className="text-cyber-cyan"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              initial={{ strokeDasharray: '0 100' }}
              animate={{ strokeDasharray: `${scrollProgress} 100` }}
              transition={{ duration: 0.1 }}
            />
          </svg>
          
          {/* 箭头图标 */}
          <ArrowUp 
            size={20} 
            className="relative z-10 group-hover:scale-110 transition-transform duration-300" 
          />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
