"use client"

import { motion } from "framer-motion"
import { PieChart, BarChart3, TrendingUp } from "lucide-react"

export function HeroAnalytics({ transactions }) {
  const expenseCategories = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + 1
      return acc
    }, {})

  const topCategory = Object.entries(expenseCategories).sort(([, a], [, b]) => b - a)[0]

  return (
    <div className="flip-container w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8">
  <div className="flip-inner">
    <div className="text-center space-y-12 px-6">
      <motion.h1
        className="text-7xl md:text-8xl lg:text-9xl font-black font-orbitron tracking-tight leading-none"
        initial={{ opacity: 0, rotateY: -180 }}
        animate={{ opacity: 1, rotateY: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <motion.span
          className="bg-gradient-to-r from-gray-600 via-gray-400 to-gray-500 bg-clip-text text-transparent"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            backgroundSize: "200% 200%",
          }}
        >
          ANALYTICS
        </motion.span>
      </motion.h1>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <motion.div
          className="bg-gradient-to-br from-gray-300/15 to-transparent border-2 border-gray-400/40 rounded-2xl p-8 backdrop-blur-sm"
          whileHover={{ scale: 1.08, rotateX: 10 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="mb-4"
          >
            <PieChart className="w-12 h-12 text-gray-600 mx-auto" />
          </motion.div>
          <h3 className="text-2xl font-bold text-gray-700 mb-2">CATEGORIES</h3>
          <motion.p
            className="text-3xl font-black text-gray-700 font-jetbrains"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            {Object.keys(expenseCategories).length}
          </motion.p>
          <p className="text-gray-500 mt-2">Active Categories</p>
        </motion.div>

        <motion.div
          className="bg-gradient-to-br from-gray-300/15 to-transparent border-2 border-gray-400/40 rounded-2xl p-8 backdrop-blur-sm"
          whileHover={{ scale: 1.08, rotateX: 10 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="mb-4"
          >
            <BarChart3 className="w-12 h-12 text-gray-600 mx-auto" />
          </motion.div>
          <h3 className="text-2xl font-bold text-gray-700 mb-2">TOP CATEGORY</h3>
          <motion.p
            className="text-2xl font-black text-gray-700 font-jetbrains"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            {topCategory ? topCategory[0] : "N/A"}
          </motion.p>
          <p className="text-gray-500 mt-2">
            {topCategory ? `${topCategory[1]} transactions` : "No data"}
          </p>
        </motion.div>

        <motion.div
          className="bg-gradient-to-br from-gray-300/15 to-transparent border-2 border-gray-400/40 rounded-2xl p-8 backdrop-blur-sm"
          whileHover={{ scale: 1.08, rotateX: 10 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="mb-4"
          >
            <TrendingUp className="w-12 h-12 text-gray-600 mx-auto" />
          </motion.div>
          <h3 className="text-2xl font-bold text-gray-700 mb-2">INSIGHTS</h3>
          <motion.p
            className="text-3xl font-black text-gray-700 font-jetbrains"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 1.4 }}
          >
            {transactions.length}
          </motion.p>
          <p className="text-gray-500 mt-2">Total Transactions</p>
        </motion.div>
      </motion.div>

      <motion.p
        className="text-xl text-gray-500 max-w-3xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.6 }}
      >
        <span className="text-gray-700 font-bold">POWERFUL ANALYTICS</span>{" "}
        with real-time insights and{" "}
        <span className="text-gray-500 font-bold">dynamic visualizations</span>
      </motion.p>
    </div>
    </div>
  </div>
  )
}
