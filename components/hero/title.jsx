"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

const titleWords = ["Finance", "Tracker"]
const glitchChars = "!@#$%^&*()_+-=[]{}|;:,.<>?"

export function AnimatedTitle() {
  const [displayText, setDisplayText] = useState("")
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    const currentWord = titleWords[currentWordIndex]
    
    const timeout = setTimeout(() => {
      if (!isDeleting && currentCharIndex < currentWord.length) {
        setDisplayText(currentWord.substring(0, currentCharIndex + 1))
        setCurrentCharIndex(currentCharIndex + 1)
      } else if (isDeleting && currentCharIndex > 0) {
        setDisplayText(currentWord.substring(0, currentCharIndex - 1))
        setCurrentCharIndex(currentCharIndex - 1)
      } else if (!isDeleting && currentCharIndex === currentWord.length) {
        if (currentWordIndex === titleWords.length - 1) {
          // Finished typing all words, stop here
          setShowCursor(false)
          return
        }
        setTimeout(() => setIsDeleting(true), 1000)
      } else if (isDeleting && currentCharIndex === 0) {
        setIsDeleting(false)
        setCurrentWordIndex((currentWordIndex + 1) % titleWords.length)
      }
    }, isDeleting ? 50 : 100)

    return () => clearTimeout(timeout)
  }, [currentCharIndex, currentWordIndex, isDeleting])

  // Cursor blinking effect
  useEffect(() => {
    if (!showCursor) return
    
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)

    return () => clearInterval(cursorInterval)
  }, [showCursor])

  return (
    <div className="relative">
      {/* Main title */}
      <motion.h1
        className="text-7xl md:text-8xl lg:text-9xl font-black font-orbitron tracking-tight leading-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.span
          className="bg-gradient-to-r from-white via-slate-200 to-slate-300 bg-clip-text text-transparent"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            backgroundSize: "200% 200%",
          }}
        >
          {displayText}
        </motion.span>
        
        {/* Animated cursor */}
        <motion.span
          className="text-slate-400"
          animate={{ opacity: showCursor ? 1 : 0 }}
          transition={{ duration: 0.1 }}
        >
          |
        </motion.span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="text-xl md:text-2xl text-slate-400 mt-6 font-light tracking-wide max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2.5 }}
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 2.5 }}
        >
          Professional financial management with
        </motion.span>{" "}
        <motion.span
          className="text-slate-200 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 2.8 }}
        >
          intelligent insights
        </motion.span>{" "}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 3.1 }}
        >
          and enterprise-grade analytics
        </motion.span>
      </motion.p>

      {/* Subtle glitch effect overlay */}
      <motion.div
        className="absolute inset-0 text-7xl md:text-8xl lg:text-9xl font-black font-orbitron tracking-tight leading-none text-slate-500 opacity-0"
        animate={{
          opacity: [0, 0.05, 0, 0.02, 0],
          x: [0, -1, 1, -0.5, 0],
        }}
        transition={{
          duration: 0.15,
          repeat: Infinity,
          repeatDelay: 5,
        }}
      >
        {displayText.split('').map((char, index) => (
          <motion.span
            key={index}
            animate={{
              opacity: Math.random() > 0.9 ? 1 : 0,
            }}
            transition={{
              duration: 0.05,
              repeat: Infinity,
              repeatDelay: Math.random() * 3,
            }}
          >
            {Math.random() > 0.8 ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : char}
          </motion.span>
        ))}
      </motion.div>

      {/* Minimal floating elements */}
      <div className="absolute -top-8 -right-8">
        <motion.div
          className="w-2 h-2 bg-slate-600 rounded-full"
          animate={{
            y: [0, -10, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
      
      <div className="absolute -bottom-4 -left-4">
        <motion.div
          className="w-1.5 h-1.5 bg-slate-500 rounded-full"
          animate={{
            x: [0, 8, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
        />
      </div>

      {/* Subtle underline effect */}
      <motion.div
        className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 h-0.5 bg-slate-600 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: "40%" }}
        transition={{ duration: 1.5, delay: 2 }}
      />
    </div>
  )
}
