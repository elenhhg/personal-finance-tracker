"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CreditCard, Plus, List, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroTransactions({ transactions, onAddTransaction, onDeleteTransaction }) {
  const recentTransactions = transactions.slice(0, 3)

  const gradientAnimation = {
    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
  }

  const gradientTransition = {
    duration: 2,
    repeat: Infinity,
    ease: "linear",
  }

  return (
    <div className="flip-container w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8">
  <div className="flip-inner">
    <div className="text-center space-y-12 px-6 pt-36">
      <motion.h1
        className="text-7xl md:text-8xl lg:text-9xl font-black font-orbitron tracking-tight leading-none"
        initial={{ opacity: 0, scale: 0.3, rotateZ: -45 }}
        animate={{ opacity: 1, scale: 1, rotateZ: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.span
          className="bg-gradient-to-r from-gray-600 via-gray-300 to-gray-400 bg-clip-text text-transparent"
          animate={gradientAnimation}
          transition={gradientTransition}
          style={{ backgroundSize: "200% 200%" }}
        >
          TRANSACTIONS
        </motion.span>
      </motion.h1>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <motion.div
          className="bg-gray-900/70 border border-gray-600 rounded-2xl p-8 backdrop-blur-sm"
          whileHover={{ scale: 1.05, rotateY: 5 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="mb-4"
          >
            <CreditCard className="w-12 h-12 text-gray-400 mx-auto" />
          </motion.div>
          <motion.h3
            className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-gray-300 to-gray-400 bg-clip-text text-transparent mb-2"
            animate={gradientAnimation}
            transition={gradientTransition}
            style={{ backgroundSize: "200% 200%" }}
          >
            TOTAL
          </motion.h3>
          <motion.p
            className="text-4xl font-black text-gray-300 font-jetbrains"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            {transactions.length}
          </motion.p>
          <p className="text-gray-400 mt-2">All Transactions</p>
        </motion.div>

        <motion.div
          className="bg-gray-700/70 border border-gray-500 rounded-2xl p-8 backdrop-blur-sm"
          whileHover={{ scale: 1.05, rotateY: 5 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            initial={{ rotate: 0 }}
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.4 }}
            className="mb-4"
          >
            <Plus className="w-12 h-12 text-gray-300 mx-auto" />
          </motion.div>
          <motion.h3
            className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-gray-300 to-gray-400 bg-clip-text text-transparent mb-2"
            animate={gradientAnimation}
            transition={gradientTransition}
            style={{ backgroundSize: "200% 200%" }}
          >
            ADD NEW
          </motion.h3>
          <Button
            onClick={onAddTransaction}
            className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white border-0 shadow-md shadow-gray-700/40 transition-all duration-300 font-bold px-6 py-3 text-lg rounded-xl mt-4"
          >
            CREATE
          </Button>
        </motion.div>

        <motion.div
          className="bg-gray-800/70 border border-gray-600 rounded-2xl p-8 backdrop-blur-sm"
          whileHover={{ scale: 1.05, rotateY: 5 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="mb-4"
          >
            <List className="w-12 h-12 text-gray-300 mx-auto" />
          </motion.div>
          <motion.h3
            className="text-2xl font-bold bg-gradient-to-r from-gray-400 via-gray-300 to-gray-400 bg-clip-text text-transparent mb-2"
            animate={gradientAnimation}
            transition={gradientTransition}
            style={{ backgroundSize: "200% 200%" }}
          >
            RECENT
          </motion.h3>
          <motion.p
            className="text-3xl font-black text-gray-300 font-jetbrains"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 1.4 }}
          >
            {recentTransactions.length}
          </motion.p>
          <p className="text-gray-400 mt-2">Latest Entries</p>
        </motion.div>
      </motion.div>

      {recentTransactions.length > 0 && (
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-6">RECENT ACTIVITY</h3>
          <div className="space-y-4">
            {recentTransactions.map((transaction, index) => (
              <motion.div
                key={transaction.id}
                className={`p-4 rounded-xl border backdrop-blur-sm flex justify-between items-center ${
                  transaction.type === "income"
                    ? "bg-gray-900/50 border-gray-900"
                    : "bg-gray-900/50 border-gray-900"
                }`}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.8 + index * 0.15 }}
                whileHover={{ scale: 1.02 }}
              >
                <div>
                  <h4 className="font-bold text-white">{transaction.description}</h4>
                  <p className="text-sm text-blue-950">{transaction.category}</p>
                </div>
                <div className="flex items-center gap-4">
                  <p
                    className={`font-bold text-xl ${
                      transaction.type === "income" ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {transaction.type === "income" ? "+" : "-"}$
                    {transaction.amount.toLocaleString()}
                  </p>
                  <button
                    onClick={() => onDeleteTransaction(transaction.id)}
                    className="text-gray-800 hover:text-red-500 transition-colors"
                    aria-label="Delete transaction"
                  >
                    <Trash2 className="w-6 h-6" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  </div>
</div>
  )
}