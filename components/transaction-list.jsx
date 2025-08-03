"use client"

import { Trash2, TrendingUp, TrendingDown } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -20, scale: 0.95 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    x: 100,
    scale: 0.95,
    transition: {
      duration: 0.2,
    },
  },
}

export function TransactionList({ transactions, onDelete }) {
  const sortedTransactions = [...transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  if (transactions.length === 0) {
    return (
      <motion.div
        className="py-12 text-center text-gray-400"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="mb-4 text-6xl"
        >
          💸
        </motion.div>
        <p className="text-lg">No transactions yet</p>
        <p className="mt-1 text-sm">Add your first transaction to get started!</p>
      </motion.div>
    )
  }

  return (
    <motion.div className="space-y-3" variants={listVariants} initial="hidden" animate="visible">
      <AnimatePresence mode="popLayout">
        {sortedTransactions.map((transaction) => (
          <motion.div
            key={transaction.id}
            variants={itemVariants}
            layout
            exit="exit"
            whileHover={{ scale: 1.02, y: -2 }}
            className="flex items-center justify-between p-4 transition-all duration-300 border shadow-lg bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-xl border-gray-700/50 backdrop-blur-sm hover:border-gray-600 shadow-black/20"
          >
            <div className="flex items-center gap-4">
              <motion.div
                className={`p-3 rounded-full ${
                  transaction.type === "income"
                    ? "bg-gradient-to-r from-emerald-900/30 to-emerald-800/30 text-emerald-400 shadow-lg shadow-emerald-500/20"
                    : "bg-gradient-to-r from-red-900/30 to-red-800/30 text-red-400 shadow-lg shadow-red-500/20"
                }`}
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                {transaction.type === "income" ? (
                  <TrendingUp className="w-5 h-5" />
                ) : (
                  <TrendingDown className="w-5 h-5" />
                )}
              </motion.div>
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-semibold text-white">{transaction.description}</h3>
                  <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                    <Badge
                      variant="secondary"
                      className="text-xs text-gray-300 border bg-gray-700/50 backdrop-blur-sm border-gray-600/50"
                    >
                      {transaction.category}
                    </Badge>
                  </motion.div>
                </div>
                <p className="mt-1 text-sm text-gray-400">
                  {new Date(transaction.date).toLocaleDateString("en-US", {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <motion.span
                className={`font-bold text-xl ${transaction.type === "income" ? "text-emerald-400" : "text-red-400"}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                {transaction.type === "income" ? "+" : "-"}${transaction.amount.toLocaleString()}
              </motion.span>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(transaction.id)}
                  className="text-gray-400 transition-all duration-300 hover:text-red-400 hover:bg-red-900/20"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  )
}
