"use client"

import { motion } from "framer-motion"
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react"

export function HeroOverview({ balance, totalIncome, totalExpenses, transactions }) {
  return (
    <div className="flip-container w-full max-w-[1400px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
      <div className="flip-inner">
        <div className="text-center space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12 px-2 sm:px-4 md:px-6">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-black font-orbitron tracking-tight leading-none text-gray-200"
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
                repeat: Number.POSITIVE_INFINITY,
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
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {/* Balance Card */}
            <motion.div
              className="bg-gradient-to-br from-gray-700/40 to-transparent border-2 border-gray-600 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 backdrop-blur-sm sm:col-span-2 lg:col-span-1"
              whileHover={{ scale: 1.02, rotateY: 2 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="mb-3 sm:mb-4"
              >
                <DollarSign className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-gray-300 mx-auto" />
              </motion.div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-700 mb-2">BALANCE</h3>
              <motion.p
                className={`text-2xl sm:text-3xl md:text-4xl font-black font-jetbrains ${balance >= 0 ? "text-gray-100" : "text-red-400"}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                ${balance.toLocaleString()}
              </motion.p>
            </motion.div>

            {/* Income Card */}
            <motion.div
              className="bg-gradient-to-br from-gray-700/30 to-transparent border-2 border-gray-600 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 backdrop-blur-sm"
              whileHover={{ scale: 1.02, rotateY: 2 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                className="mb-3 sm:mb-4"
              >
                <TrendingUp className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-gray-300 mx-auto" />
              </motion.div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-700 mb-2">INCOME</h3>
              <motion.p
                className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-100 font-jetbrains"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 1.2 }}
              >
                ${totalIncome.toLocaleString()}
              </motion.p>
            </motion.div>

            {/* Expenses Card */}
            <motion.div
              className="bg-gradient-to-br from-gray-700/30 to-transparent border-2 border-gray-600 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 backdrop-blur-sm"
              whileHover={{ scale: 1.02, rotateY: 2 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                className="mb-3 sm:mb-4"
              >
                <TrendingDown className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-gray-300 mx-auto" />
              </motion.div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-700 mb-2">EXPENSES</h3>
              <motion.p
                className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-100 font-jetbrains"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 1.4 }}
              >
                ${totalExpenses.toLocaleString()}
              </motion.p>
            </motion.div>
          </motion.div>

          <motion.p
            className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto px-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.6 }}
          >
            Complete financial overview with{" "}
            <span className="font-bold text-gray-800">
              {transactions.filter((t) => t.type === "income").length} income
            </span>{" "}
            and{" "}
            <span className="font-bold text-gray-800">
              {transactions.filter((t) => t.type === "expense").length} expense
            </span>{" "}
            transactions
          </motion.p>
        </div>
      </div>
    </div>
  )
}
