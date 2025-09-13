"use client"

import { motion } from "framer-motion"
import { CreditCard, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Bruno_Ace_SC, Open_Sans } from "next/font/google"

const brunoAceSC = Bruno_Ace_SC({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
})

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
})

export function HeroTransactions({ transactions, onAddTransaction }) {
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
      <div className="text-center space-y-10 px-2 pt-20 sm:pt-24 md:pt-28 lg:pt-32">
        <motion.h1
          className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-gray-200 tracking-tight leading-tight ${brunoAceSC.className}`}
          initial={{ opacity: 0, rotateX: -90 }}
          animate={{ opacity: 1, rotateX: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.span
            className="bg-gradient-to-r from-gray-500 via-gray-200 to-gray-500 bg-clip-text text-transparent"
            animate={gradientAnimation}
            transition={gradientTransition}
            style={{ backgroundSize: "200% 200%" }}
          >
            TRANSACTIONS
          </motion.span>
        </motion.h1>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {/* Total Transactions */}
          <motion.div whileHover={{ scale: 1.02, rotateY: 2 }} transition={{ duration: 0.3 }}>
            <Card className="bg-gradient-to-br from-blue-900/20 to-black/80 border-blue-800/50 shadow-xl shadow-blue-500/20 h-full backdrop-blur-sm">
              <CardHeader className="text-center">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="mb-3"
                >
                  <CreditCard className="w-10 h-10 text-blue-400 mx-auto" />
                </motion.div>
                <CardTitle
                  className={`text-lg sm:text-xl font-bold text-blue-200 ${openSans.className}`}
                >
                  TOTAL
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <motion.p
                  className={`text-3xl sm:text-4xl font-black text-blue-400 ${openSans.className}`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 1 }}
                >
                  {transactions.length}
                </motion.p>
                <p className="text-sm text-blue-300 mt-2">All Transactions</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Add New Transaction */}
          <motion.div whileHover={{ scale: 1.02, rotateY: 2 }} transition={{ duration: 0.3 }}>
            <Card className="bg-gradient-to-br from-emerald-900/20 to-black/80 border-emerald-800/50 shadow-xl shadow-emerald-500/20 h-full backdrop-blur-sm">
              <CardHeader className="text-center">
                <motion.div
                  initial={{ rotate: 0 }}
                  whileHover={{ rotate: 180 }}
                  transition={{ duration: 0.4 }}
                  className="mb-3"
                >
                  <Plus className="w-10 h-10 text-emerald-400 mx-auto" />
                </motion.div>
                <CardTitle
                  className={`text-lg sm:text-xl font-bold text-emerald-200 ${openSans.className}`}
                >
                  ADD NEW
                </CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <Button
                  onClick={onAddTransaction}
                  className={`bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white shadow-md shadow-emerald-500/30 transition-all duration-300 font-bold px-6 py-3 text-lg rounded-xl ${openSans.className}`}
                >
                  CREATE
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
