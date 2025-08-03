"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, TrendingUp, TrendingDown, DollarSign } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TransactionForm } from "@/components/transaction-form"
import { TransactionList } from "@/components/transaction-list"
import { SpendingChart } from "@/components/spending"
import { CategoryChart } from "@/components/category"
import { LogIn } from "lucide-react"
import { AuthButtons } from "@/components/buttons"
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs"


const initialTransactions = [
  {
    id: "1",
    type: "income",
    amount: 3500,
    category: "Salary",
    description: "Monthly salary",
    date: "2024-01-15",
  },
  {
    id: "2",
    type: "expense",
    amount: 1200,
    category: "Rent",
    description: "Monthly rent payment",
    date: "2024-01-01",
  },
  {
    id: "3",
    type: "expense",
    amount: 450,
    category: "Groceries",
    description: "Weekly grocery shopping",
    date: "2024-01-10",
  },
  {
    id: "4",
    type: "expense",
    amount: 80,
    category: "Utilities",
    description: "Electricity bill",
    date: "2024-01-05",
  },
  {
    id: "5",
    type: "expense",
    amount: 200,
    category: "Entertainment",
    description: "Movie tickets and dinner",
    date: "2024-01-12",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
}

export default function FinanceTracker() {
  const [transactions, setTransactions] = useState(initialTransactions)
  const [showAddForm, setShowAddForm] = useState(false)

  const totalIncome = transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)
  const totalExpenses = transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)
  const balance = totalIncome - totalExpenses

  const addTransaction = (transaction) => {
    const newTransaction = {
      ...transaction,
      id: Date.now().toString(),
    }
    setTransactions([newTransaction, ...transactions])
    setShowAddForm(false)
  }

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id))
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-50" />
      <div className="relative z-10">
        <motion.div
          className="container mx-auto p-6 space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
         
{/* Header */}
<motion.div className="flex items-center justify-between" variants={itemVariants}>
  <div>
    <motion.h1
      className="text-4xl font-bold text-emerald-400"
      initial={{ scale: 1 }}
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      Finance Tracker
    </motion.h1>
    <motion.p
      className="text-emerald-200"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      Manage your personal finances with style
    </motion.p>
  </div>

  <div className="flex items-center space-x-4">
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button
        onClick={() => setShowAddForm(true)}
        className="bg-red-900 hover:bg-red-800 text-white border-0 shadow-lg shadow-red-700/50 transition-all duration-300"
      >
        <motion.div initial={{ rotate: 0 }} whileHover={{ rotate: 90 }} transition={{ duration: 0.2 }}>
          <Plus className="w-4 h-4 mr-2" />
        </motion.div>
        Add Transaction
      </Button>
    </motion.div>

    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
      <SignedOut>
        <SignInButton mode="modal">
          <Button variant="ghost" aria-label="Sign In" className="text-green-900">
            <LogIn className="w-6 h-6" />
          </Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
    </motion.div>
  </div>
</motion.div>


          {/* Overview Cards */}
          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6" variants={itemVariants}>
            <motion.div whileHover={{ scale: 1.02, y: -5 }} transition={{ duration: 0.2 }}>
              <Card className="bg-gradient-to-br from-gray-900 to-black border-gray-800 shadow-xl shadow-black/50 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-400">Total Balance</CardTitle>
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    <DollarSign className="h-4 w-4 text-gray-400" />
                  </motion.div>
                </CardHeader>
                <CardContent>
                  <motion.div
                    className={`text-3xl font-bold ${balance >= 0 ? "text-emerald-400" : "text-red-400"}`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    ${balance.toLocaleString()}
                  </motion.div>
                  <p className="text-xs text-gray-500 mt-1">
                    {balance >= 0 ? "+" : ""}
                    {((balance / totalIncome) * 100).toFixed(1)}% from income
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02, y: -5 }} transition={{ duration: 0.2 }}>
              <Card className="bg-gradient-to-br from-emerald-900/20 to-black border-emerald-800/50 shadow-xl shadow-emerald-500/10">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-400">Total Income</CardTitle>
                  <motion.div
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  >
                    <TrendingUp className="h-4 w-4 text-emerald-400" />
                  </motion.div>
                </CardHeader>
                <CardContent>
                  <motion.div
                    className="text-3xl font-bold text-emerald-400"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    ${totalIncome.toLocaleString()}
                  </motion.div>
                  <p className="text-xs text-gray-500 mt-1">
                    {transactions.filter((t) => t.type === "income").length} transactions
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02, y: -5 }} transition={{ duration: 0.2 }}>
              <Card className="bg-gradient-to-br from-red-900/20 to-black border-red-800/50 shadow-xl shadow-red-500/10">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-400">Total Expenses</CardTitle>
                  <motion.div
                    animate={{ y: [0, 3, 0] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  >
                    <TrendingDown className="h-4 w-4 text-red-400" />
                  </motion.div>
                </CardHeader>
                <CardContent>
                  <motion.div
                    className="text-3xl font-bold text-red-400"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 1.0 }}
                  >
                    ${totalExpenses.toLocaleString()}
                  </motion.div>
                  <p className="text-xs text-gray-500 mt-1">
                    {transactions.filter((t) => t.type === "expense").length} transactions
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Charts */}
          <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-6" variants={itemVariants}>
            <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
              <Card className="bg-gradient-to-br from-gray-900 to-black border-gray-800 shadow-xl shadow-black/50">
                <CardHeader>
                  <CardTitle className="text-white">Spending Overview</CardTitle>
                  <CardDescription className="text-gray-400">Your spending pattern over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <SpendingChart transactions={transactions} />
                </CardContent>
              </Card>
            </motion.div>

            <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
              <Card className="bg-gradient-to-br from-gray-900 to-black border-gray-800 shadow-xl shadow-black/50">
                <CardHeader>
                  <CardTitle className="text-white">Expense Categories</CardTitle>
                  <CardDescription className="text-gray-400">Breakdown by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <CategoryChart transactions={transactions} />
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Recent Transactions */}
          <motion.div variants={itemVariants}>
            <motion.div whileHover={{ scale: 1.005 }} transition={{ duration: 0.2 }}>
              <Card className="bg-gradient-to-br from-gray-900 to-black border-gray-800 shadow-xl shadow-black/50">
                <CardHeader>
                  <CardTitle className="text-white">Recent Transactions</CardTitle>
                  <CardDescription className="text-gray-400">Your latest financial activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <TransactionList transactions={transactions} onDelete={deleteTransaction} />
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Add Transaction Form Modal */}
        <AnimatePresence>
          {showAddForm && (
            <motion.div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setShowAddForm(false)}
            >
              <motion.div
                className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-6 w-full max-w-md border border-gray-800 shadow-2xl shadow-black/50"
                initial={{ scale: 0.8, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 50 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                onClick={(e) => e.stopPropagation()}
              >
                <TransactionForm onSubmit={addTransaction} onCancel={() => setShowAddForm(false)} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
