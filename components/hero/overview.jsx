"use client"

import { motion } from "framer-motion"
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react'

export function HeroOverview({ balance, totalIncome, totalExpenses, transactions }) {
  return (
    <div className="flip-container w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8">
  <div className="flip-inner">
    <div className="text-center space-y-12 px-6">
      <motion.h1
        className="text-7xl md:text-8xl lg:text-9xl font-black font-orbitron tracking-tight leading-none text-gray-200"
        initial={{ opacity: 0, rotateX: -90 }}
        animate={{ opacity: 1, rotateX: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.span
          className="bg-gradient-to-r from-gray-600 via-gray-300 to-gray-600 bg-clip-text text-transparent"
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
          OVERVIEW
        </motion.span>
      </motion.h1>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <motion.div 
          className="bg-gradient-to-br from-gray-700/40 to-transparent border-2 border-gray-600 rounded-2xl p-8 backdrop-blur-sm"
          whileHover={{ scale: 1.05, rotateY: 5 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            className="mb-4"
          >
            <DollarSign className="w-12 h-12 text-gray-300 mx-auto" />
          </motion.div>
          <h3 className="text-2xl font-bold text-gray-700 mb-2">BALANCE</h3>
          <motion.p
            className={`text-4xl font-black font-jetbrains ${balance >= 0 ? "text-gray-100" : "text-red-400"}`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            ${balance.toLocaleString()}
          </motion.p>
        </motion.div>

        <motion.div 
          className="bg-gradient-to-br from-gray-700/30 to-transparent border-2 border-gray-600 rounded-2xl p-8 backdrop-blur-sm"
          whileHover={{ scale: 1.05, rotateY: 5 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="mb-4"
          >
            <TrendingUp className="w-12 h-12 text-gray-300 mx-auto" />
          </motion.div>
          <h3 className="text-2xl font-bold text-gray-700 mb-2">INCOME</h3>
          <motion.p
            className="text-4xl font-black text-gray-100 font-jetbrains"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            ${totalIncome.toLocaleString()}
          </motion.p>
        </motion.div>

        <motion.div 
          className="bg-gradient-to-br from-gray-700/30 to-transparent border-2 border-gray-600 rounded-2xl p-8 backdrop-blur-sm"
          whileHover={{ scale: 1.05, rotateY: 5 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="mb-4"
          >
            <TrendingDown className="w-12 h-12 text-gray-300 mx-auto" />
          </motion.div>
          <h3 className="text-2xl font-bold text-gray-700 mb-2">EXPENSES</h3>
          <motion.p
            className="text-4xl font-black text-gray-100 font-jetbrains"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 1.4 }}
          >
            ${totalExpenses.toLocaleString()}
          </motion.p>
        </motion.div>
      </motion.div>

      <motion.p
        className="text-xl text-gray-400 max-w-3xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.6 }}
      >
        Complete financial overview with{" "}
        <span className="font-bold text-gray-800">
          {transactions.filter(t => t.type === "income").length} income
        </span>{" "}
        and{" "}
        <span className="font-bold text-gray-800">
          {transactions.filter(t => t.type === "expense").length} expense
        </span>{" "}
        transactions
      </motion.p>
    </div>
  </div>
</div>
  )
}
