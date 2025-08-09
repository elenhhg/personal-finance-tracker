"use client"

import { motion } from "framer-motion"
import { CreditCard, Plus } from "lucide-react" // Keep List import for the card, if it's still there
import { Button } from "@/components/ui/button"

export function HeroTransactions({ transactions, onAddTransaction, onDelete }) {
  const recentTransactions = transactions.slice(0, 3)

  const gradientAnimation = {
    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
  }

  const gradientTransition = {
    duration: 2,
    repeat: Number.POSITIVE_INFINITY,
    ease: "linear",
  }

  return (
    <div className="w-full max-w-[1400px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
      <div className="text-center space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12 px-2 sm:px-4 md:px-6 pt-8 sm:pt-16 md:pt-24 lg:pt-36">
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
            TRANSACTIONS
          </motion.span>
        </motion.h1>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {/* Total Transactions Card */}
          <motion.div
            className="bg-gray-900/70 border border-gray-600 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 backdrop-blur-sm"
            whileHover={{ scale: 1.02, rotateY: 2 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="mb-3 sm:mb-4"
            >
              <CreditCard className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-gray-400 mx-auto" />
            </motion.div>
            <motion.h3
              className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-gray-900 via-gray-300 to-gray-400 bg-clip-text text-transparent mb-2"
              animate={gradientAnimation}
              transition={gradientTransition}
              style={{ backgroundSize: "200% 200%" }}
            >
              TOTAL
            </motion.h3>
            <motion.p
              className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-300 font-jetbrains"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              {transactions.length}
            </motion.p>
            <p className="text-sm sm:text-base text-gray-400 mt-2">All Transactions</p>
          </motion.div>

          {/* Add New Transaction Card */}
          <motion.div
            className="bg-gray-700/70 border border-gray-500 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 backdrop-blur-sm sm:col-span-2 lg:col-span-1"
            whileHover={{ scale: 1.02, rotateY: 2 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              initial={{ rotate: 0 }}
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.4 }}
              className="mb-3 sm:mb-4"
            >
              <Plus className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-gray-300 mx-auto" />
            </motion.div>
            <motion.h3
              className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-gray-900 via-gray-300 to-gray-400 bg-clip-text text-transparent mb-2"
              animate={gradientAnimation}
              transition={gradientTransition}
              style={{ backgroundSize: "200% 200%" }}
            >
              ADD NEW
            </motion.h3>
            <Button
              onClick={onAddTransaction}
              className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white border-0 shadow-md shadow-gray-700/40 transition-all duration-300 font-bold px-4 sm:px-6 py-2 sm:py-3 text-base sm:text-lg rounded-lg sm:rounded-xl mt-3 sm:mt-4 w-full sm:w-auto"
            >
              CREATE
            </Button>
          </motion.div>

          {/* Recent Transactions Card - This was the third card, now removed */}
        </motion.div>

        {/* Recent Activity Section - This entire section is now removed */}
      </div>
    </div>
  )
}
