"use client"

import { motion } from "framer-motion"
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react"
import { Bruno_Ace_SC, Open_Sans } from "next/font/google" // Import the fonts
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

// Define the fonts
const brunoAceSC = Bruno_Ace_SC({
  weight: "400", // Bruno Ace SC is a single weight font
  subsets: ["latin"],
  display: "swap",
})

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
})

export function HeroOverview({ balance, totalIncome, totalExpenses, transactions }) {
  return (
    <div>
      <div className="flip-container w-full max-w-[1400px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flip-inner">
          <div className="text-center space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12 px-2 sm:px-4 md:px-6">
            <motion.h1
              className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-gray-800 tracking-tight leading-tight ${brunoAceSC.className}`} // Apply Bruno Ace SC and adjust size
              initial={{ opacity: 0, rotateX: -90 }} // Original animation initial state
              animate={{ opacity: 1, rotateX: 0 }} // Original animation animate state
              transition={{ duration: 1, ease: "easeOut" }} // Original animation transition
            >
              <motion.span
                className="bg-gradient-to-r from-gray-600 via-gray-300 to-gray-600 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"], // Original gradient animation
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
                whileHover={{ scale: 1.02, rotateY: 2 }}
                transition={{ duration: 0.3 }}
                className="md:col-span-2 xl:col-span-1"
              >
                <Card className="bg-gradient-to-br from-red-900/20 to-black/80 border-red-800/50 shadow-xl shadow-red-500/20 backdrop-blur-sm h-full">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4 sm:p-6">
                    <CardTitle className="text-sm sm:text-base font-medium text-red-200 font-inter">
                      Total Balance
                    </CardTitle>
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    >
                      <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-red-400" />
                    </motion.div>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0">
                    <motion.div
                      className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-poppins ${balance >= 0 ? "text-green-400" : "text-red-400"}`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      ${balance.toLocaleString()}
                    </motion.div>
                    <p className="text-xs sm:text-sm text-red-300 mt-1 sm:mt-2 font-inter">
                      {balance >= 0 ? "+" : ""}
                      {totalIncome > 0 ? ((balance / totalIncome) * 100).toFixed(1) : 0}% from income
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

                     {/* Income Card */}
          <motion.div whileHover={{ scale: 1.02, rotateY: 2 }} transition={{ duration: 0.3 }}>
            <Card className="bg-gradient-to-br from-green-900/20 to-black/80 border-green-800/50 shadow-xl shadow-green-500/20 h-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4 sm:p-6">
                <CardTitle className="text-sm sm:text-base font-medium text-green-200 font-inter">
                  Total Income
                </CardTitle>
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                >
                  <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-green-400" />
                </motion.div>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <motion.div
                  className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-green-400 font-poppins"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  ${totalIncome.toLocaleString()}
                </motion.div>
                <p className="text-xs sm:text-sm text-green-300 mt-1 sm:mt-2 font-inter">
                  {transactions.filter((t) => t.type === "income").length} transactions
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Expenses Card */}
          <motion.div whileHover={{ scale: 1.02, rotateY: 2 }} transition={{ duration: 0.3 }}>
            <Card className="bg-gradient-to-br from-red-900/20 to-black/80 border-red-800/50 shadow-xl shadow-red-500/20 h-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4 sm:p-6">
                <CardTitle className="text-sm sm:text-base font-medium text-red-200 font-inter">
                  Total Expenses
                </CardTitle>
                <motion.div
                  animate={{ y: [0, 3, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                >
                  <TrendingDown className="h-4 w-4 sm:h-5 sm:w-5 text-red-400" />
                </motion.div>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <motion.div
                  className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-red-400 font-poppins"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  ${totalExpenses.toLocaleString()}
                </motion.div>
                <p className="text-xs sm:text-sm text-red-300 mt-1 sm:mt-2 font-inter">
                  {transactions.filter((t) => t.type === "expense").length} transactions
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
        <motion.p
          className={`text-base sm:text-lg md:text-xl text-gray-500 max-w-3xl mx-auto px-2 ${openSans.className}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          Complete financial overview with{" "}
          <span className={`font-bold text-white ${openSans.className}`}>
            {transactions.filter((t) => t.type === "income").length} income
          </span>{" "}
          and{" "}
          <span className={`font-bold text-white ${openSans.className}`}>
            {transactions.filter((t) => t.type === "expense").length} expense
          </span>{" "}
            transactions
          </motion.p>
            </div>
          </div>
            </div>
          </div>
        // </div>
      )
    }