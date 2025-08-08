"use client"

import { motion } from "framer-motion"
import { Plus, BarChart3 } from 'lucide-react'
import { Button } from "@/components/ui/button"

export function HeroHome({ onAddTransaction }) {
  return (
    <div className="flip-container w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8">
  <div className="flip-inner"></div>
    <section className="relative px-6 py-20 max-w-6xl mx-auto text-center">
     <motion.h1
  className="text-7xl md:text-8xl lg:text-9xl font-black font-orbitron tracking-tight leading-none"
  initial={{ opacity: 0, rotateX: -90 }}
  animate={{ opacity: 1, rotateX: 0 }}
  transition={{ duration: 1, ease: "easeOut" }}
>
  <motion.span
    className="bg-gradient-to-r from-gray-600 via-gray-200 to-gray-500 bg-clip-text text-transparent"
    animate={{
      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      ease: "linear",
    }}
    style={{
      backgroundSize: "200% 200%",
    }}
  >
    Cash Flow {" "}
  </motion.span>
  <motion.span
    className="bg-gradient-to-r from-gray-600 via-gray-300 to-gray-500 bg-clip-text text-transparent"
    animate={{
      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      ease: "linear",
      delay: 1.5,
    }}
    style={{
      backgroundSize: "200% 200%",
    }}
  >
    Analyzer
  </motion.span>
</motion.h1>

      <motion.p
        className="mt-8 max-w-3xl mx-auto text-xl text-gray-600 font-semibold tracking-wide"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        Take control of your finances with clarity and precision, powered by dynamic insights.
      </motion.p>

      <motion.div
        className="flex justify-center gap-10 mt-14"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <Button
          onClick={onAddTransaction}
          className="flex items-center gap-3 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 hover:from-gray-800 hover:via-gray-900 hover:to-black text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-black/70 transition-transform duration-300"
        >
          <motion.div
            initial={{ rotate: 0 }}
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.4 }}
          >
            <Plus className="w-5 h-5" />
          </motion.div>
          Add Transaction
        </Button>

        <Button
          variant="outline"
          className="flex items-center gap-3 border-2 border-gray-500 text-gray-400 hover:bg-gray-800 hover:text-white px-8 py-4 rounded-2xl font-bold shadow-md shadow-black/40 transition-all duration-300"
        >
          <BarChart3 className="w-5 h-5" />
          View Dashboard
        </Button>
      </motion.div>
    </section>

    </div>
  )
}
