"use client"

import { motion } from "framer-motion"
import { Plus, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroHome({ onAddTransaction }) {
  return (
    <div className="flip-container w-full max-w-[1400px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
      <div className="flip-inner"></div>
      <section className="relative px-3 sm:px-4 md:px-6 py-12 sm:py-16 md:py-20 max-w-6xl mx-auto text-center">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-black font-orbitron tracking-tight leading-none"
          initial={{ opacity: 0, rotateX: -90 }}
          animate={{ opacity: 1, rotateX: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.span
            className="bg-gradient-to-r from-gray-600 via-gray-200 to-gray-500 bg-clip-text text-transparent block sm:inline"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            style={{
              backgroundSize: "200% 200%",
            }}
          >
            Cash Flow{" "}
          </motion.span>
          <motion.span
            className="bg-gradient-to-r from-gray-600 via-gray-300 to-gray-500 bg-clip-text text-transparent block sm:inline"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
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
          className="mt-6 sm:mt-8 max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-gray-600 font-semibold tracking-wide px-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          Take control of your finances with clarity and precision, powered by dynamic insights.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 mt-8 sm:mt-12 md:mt-14"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <Button
            onClick={onAddTransaction}
            className="flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 hover:from-gray-800 hover:via-gray-900 hover:to-black text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold shadow-lg shadow-black/70 transition-transform duration-300 w-full sm:w-auto text-sm sm:text-base"
          >
            <motion.div initial={{ rotate: 0 }} whileHover={{ rotate: 180 }} transition={{ duration: 0.4 }}>
              <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.div>
            Add Transaction
          </Button>

          <Button
            variant="outline"
            className="flex items-center gap-2 sm:gap-3 border-2 border-gray-500 text-gray-400 hover:bg-gray-800 hover:text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold shadow-md shadow-black/40 transition-all duration-300 w-full sm:w-auto text-sm sm:text-base bg-transparent"
          >
            <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5" />
            View Dashboard
          </Button>
        </motion.div>
      </section>
    </div>
  )
}
