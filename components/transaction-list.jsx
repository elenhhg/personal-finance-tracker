"use client"

import { Trash2, TrendingUp, TrendingDown } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function TransactionList({ transactions, onDelete }) {
  const sortedTransactions = [...transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  if (transactions.length === 0) {
    return (
      <motion.div
        className="text-center py-12 text-white font-inter"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-6xl mb-4"
        >
          💳
        </motion.div>
        <p className="text-lg font-poppins">No transactions yet</p>
        <p className="text-sm mt-1 text-gray-300">Add your first transaction to get started!</p>
      </motion.div>
    )
  }

  return (
    <motion.div className="space-y-4">
      <AnimatePresence mode="popLayout">
        {sortedTransactions.map((transaction, index) => (
          <motion.div
            key={transaction.id}
            layout
            initial={{ opacity: 0, x: -50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.9 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ scale: 1.02, y: -2 }}
            className={`flex items-center justify-between p-6 rounded-2xl border-2 backdrop-blur-sm transition-all duration-300 shadow-xl ${
              transaction.type === "income"
                ? "bg-gradient-to-br from-green-600/20 to-green-400/10 border-green-500/70 hover:border-green-400 shadow-green-500/40"
                : "bg-gradient-to-br from-red-600/20 to-red-400/10 border-red-500/70 hover:border-red-400 shadow-red-500/40"
            }`}
          >
            <div className="flex items-center gap-6">
              <motion.div
                className={`p-4 rounded-full ${
                  transaction.type === "income"
                    ? "bg-green-600/30 text-green-400"
                    : "bg-red-600/30 text-red-400"
                }`}
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.4 }}
              >
                {transaction.type === "income" ? (
                  <TrendingUp className="w-6 h-6" />
                ) : (
                  <TrendingDown className="w-6 h-6" />
                )}
              </motion.div>
              <div>
                <div className="flex items-center gap-4">
                  <h3 className="font-bold text-white text-xl font-poppins">{transaction.description}</h3>
                  <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
                    <Badge
                      variant="secondary"
                      className="bg-white/10 text-white text-sm backdrop-blur-sm border border-white/20 font-inter px-3 py-1"
                    >
                      {transaction.category}
                    </Badge>
                  </motion.div>
                </div>
                <p className="text-sm text-gray-300 mt-2 font-inter">
                  {new Date(transaction.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <motion.span
                className={`font-black text-2xl font-jetbrains ${
                  transaction.type === "income" ? "text-green-400" : "text-red-400"
                }`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                {transaction.type === "income" ? "+" : "-"}${transaction.amount.toLocaleString()}
              </motion.span>
              <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(transaction.id)}
                  className="text-white hover:text-red-400 hover:bg-red-500/20 transition-all duration-300 p-3"
                >
                  <Trash2 className="w-5 h-5" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  )
}
