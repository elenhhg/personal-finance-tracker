"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { Plus, TrendingUp, TrendingDown, DollarSign, Menu, X, Home, BarChart3, CreditCard, PieChart } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TransactionForm } from "@/components/transaction-form"
import { TransactionList } from "@/components/transaction-list"
import { SpendingChart } from "@/components/spending"
import { CategoryChart } from "@/components/category"
import { Navigation } from "@/components/header"
import { HeroHome } from "@/components/hero/home"
import { HeroOverview } from "@/components/hero/overview"
import { HeroAnalytics } from "@/components/hero/analytics"
import { HeroTransactions } from "@/components/hero/transactions"

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

export default function FinanceTracker() {
  const [transactions, setTransactions] = useState(initialTransactions)
  const [showAddForm, setShowAddForm] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  
  const parallaxY1 = useTransform(scrollYProgress, [0, 1], [0, -50])
  const parallaxY2 = useTransform(scrollYProgress, [0, 1], [0, -75])
  const parallaxY3 = useTransform(scrollYProgress, [0, 1], [0, -25])

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

  const handleSectionChange = async (sectionId) => {
    if (sectionId === activeSection || isTransitioning) return
    
    setIsTransitioning(true)
    setMobileMenuOpen(false)
    
    // Wait for page flip animation
    await new Promise(resolve => setTimeout(resolve, 800))
    
    setActiveSection(sectionId)
    setIsTransitioning(false)
  }

  const getHeroComponent = () => {
    switch (activeSection) {
      case "home":
        return <HeroHome onAddTransaction={() => setShowAddForm(true)} />
      case "overview":
        return <HeroOverview balance={balance} totalIncome={totalIncome} totalExpenses={totalExpenses} transactions={transactions} />
      case "analytics":
        return <HeroAnalytics transactions={transactions} />
      case "transactions":
        return <HeroTransactions transactions={transactions} onDelete={deleteTransaction} onAddTransaction={() => setShowAddForm(true)} />
      default:
        return <HeroHome onAddTransaction={() => setShowAddForm(true)} />
    }
  }

  const getSectionColor = () => {
    switch (activeSection) {
      case "home":
        return ["rgba(209, 213, 219, 0.9)", "rgba(229, 231, 235, 0.95)"]
      case "overview":
        return ["rgba(209, 213, 219, 0.9)", "rgba(229, 231, 235, 0.95)"]
      case "analytics":
        return ["rgba(209, 213, 219, 0.9)", "rgba(229, 231, 235, 0.95)"]
      case "transactions":
        return ["rgba(209, 213, 219, 0.9)", "rgba(229, 231, 235, 0.95)"]
      default:
        return ["rgba(209, 213, 219, 0.9)", "rgba(229, 231, 235, 0.95)"]
    }
  }

  return (
    <div
      className="min-h-screen font-inter overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #e0e0e0, #f8f9fa, #c0c0c0)",
        color: "#1f2937",
      }}
      ref={containerRef}
    >
      {/* Mobile Menu Button */}
      <button 
        className="fixed top-3 left-3 z-50 lg:hidden p-2 sm:p-3 rounded-lg bg-gray-800/80 text-white shadow-lg touch-manipulation"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <X size={20} className="sm:w-6 sm:h-6" /> : <Menu size={20} className="sm:w-6 sm:h-6" />}
      </button>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-gray-900/90 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div 
              className="absolute top-16 left-3 right-3 sm:top-20 sm:left-4 sm:right-4 bg-gray-800 rounded-xl p-4 sm:p-6 shadow-2xl"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col space-y-3 sm:space-y-4">
                {[
                  { id: "home", icon: Home, label: "Home" },
                  { id: "overview", icon: BarChart3, label: "Overview" },
                  { id: "analytics", icon: PieChart, label: "Analytics" },
                  { id: "transactions", icon: CreditCard, label: "Transactions" }
                ].map(({ id, icon: Icon, label }) => (
                  <button
                    key={id}
                    onClick={() => handleSectionChange(id)}
                    className={`flex items-center space-x-3 p-3 sm:p-4 rounded-lg transition-all duration-200 touch-manipulation ${
                      activeSection === id 
                        ? 'bg-gray-700 text-white shadow-md' 
                        : 'text-gray-300 hover:bg-gray-700/50 active:bg-gray-700/70'
                    }`}
                  >
                    <Icon size={18} className="sm:w-5 sm:h-5 flex-shrink-0" />
                    <span className="text-sm sm:text-base font-medium">{label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dynamic animated background */}
      <motion.div
        className="fixed inset-0 z-0"
        animate={{
          background: `linear-gradient(135deg, ${getSectionColor().join(', ')})`,
        }}
        transition={{ duration: 1 }}
      >
        {/* Responsive floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full ${
              i % 3 === 0
                ? "bg-gray-400/40"
                : i % 3 === 1
                ? "bg-gray-300/40"
                : "bg-white/30"
            }`}
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
            }}
            animate={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
            }}
            transition={{
              duration: Math.random() * 15 + 15,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
        
        {/* Responsive gradient orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 rounded-full blur-2xl sm:blur-3xl"
          style={{ background: "rgba(192, 192, 192, 0.2)" }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 rounded-full blur-2xl sm:blur-3xl"
          style={{ background: "rgba(224, 224, 224, 0.2)" }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
            x: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 rounded-full blur-2xl sm:blur-3xl"
          style={{ background: "rgba(255, 255, 255, 0.1)" }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Centered Navigation - Hidden on mobile */}
      <div className="hidden lg:block">
        <Navigation activeSection={activeSection} onSectionChange={handleSectionChange} />
      </div>

      {/* Page Flip Container */}
      <div className="relative z-10 min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            className="min-h-screen"
            initial={{ 
              rotateY: -90,
              opacity: 0,
              scale: 0.8,
              x: -100
            }}
            animate={{ 
              rotateY: 0,
              opacity: 1,
              scale: 1,
              x: 0
            }}
            exit={{ 
              rotateY: 90,
              opacity: 0,
              scale: 0.8,
              x: 100
            }}
            transition={{
              duration: 0.8,
              ease: "easeInOut",
              type: "spring",
              stiffness: 100,
              damping: 20
            }}
            style={{
              transformStyle: "preserve-3d",
              perspective: "1000px"
            }}
          >
            {/* Hero Section */}
            <motion.section
              className="min-h-screen flex items-center justify-center relative px-3 sm:px-4 md:px-6"
              style={{ y: parallaxY1 }}
            >
              {getHeroComponent()}
            </motion.section>

            {/* Content Sections */}
            {activeSection === "overview" && (
              <motion.section
                className="min-h-screen py-8 sm:py-12 md:py-16 lg:py-20 px-3 sm:px-4 md:px-6"
                style={{ y: parallaxY2 }}
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="container mx-auto max-w-7xl">
                  <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  >
                    {/* Balance Card */}
                    <motion.div 
                      whileHover={{ scale: 1.02, rotateY: 2 }} 
                      transition={{ duration: 0.3 }}
                      className="md:col-span-2 xl:col-span-1"
                    >
                      <Card className="bg-gradient-to-br from-red-900/20 to-black/80 border-red-800/50 shadow-xl shadow-red-500/20 backdrop-blur-sm h-full">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4 sm:p-6">
                          <CardTitle className="text-sm sm:text-base font-medium text-red-200 font-inter">Total Balance</CardTitle>
                          <motion.div
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                          >
                            <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-red-400" />
                          </motion.div>
                        </CardHeader>
                        <CardContent className="p-4 sm:p-6 pt-0">
                          <motion.div
                            className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-poppins ${balance >= 0 ? "text-green-400" : "text-red-400"}`}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.8 }}
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
                          <CardTitle className="text-sm sm:text-base font-medium text-green-200 font-inter">Total Income</CardTitle>
                          <motion.div
                            animate={{ y: [0, -3, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                          >
                            <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-green-400" />
                          </motion.div>
                        </CardHeader>
                        <CardContent className="p-4 sm:p-6 pt-0">
                          <motion.div
                            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-green-400 font-poppins"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5, delay: 1.0 }}
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
                          <CardTitle className="text-sm sm:text-base font-medium text-red-200 font-inter">Total Expenses</CardTitle>
                          <motion.div
                            animate={{ y: [0, 3, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                          >
                            <TrendingDown className="h-4 w-4 sm:h-5 sm:w-5 text-red-400" />
                          </motion.div>
                        </CardHeader>
                        <CardContent className="p-4 sm:p-6 pt-0">
                          <motion.div
                            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-red-400 font-poppins"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5, delay: 1.2 }}
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
                </div>
              </motion.section>
            )}

            {activeSection === "analytics" && (
              <motion.section
                className="min-h-screen py-8 sm:py-12 md:py-16 lg:py-20 px-3 sm:px-4 md:px-6"
                style={{ y: parallaxY3 }}
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="container mx-auto max-w-7xl">
                  <motion.div
                    className="grid grid-cols-1 gap-4 sm:gap-6 lg:gap-8"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  >
                    <motion.div whileHover={{ scale: 1.01, rotateY: 1 }} transition={{ duration: 0.3 }}>
                      <Card className="bg-gradient-to-br from-white/5 to-black/80 border-white/20 shadow-xl shadow-white/10 backdrop-blur-sm h-full">
                        <CardHeader className="p-4 sm:p-6">
                          <CardTitle className="text-white font-poppins text-base sm:text-lg md:text-xl">Spending Overview</CardTitle>
                          <CardDescription className="text-gray-300 font-inter text-xs sm:text-sm">Your spending pattern over time</CardDescription>
                        </CardHeader>
                        <CardContent className="h-48 sm:h-64 md:h-80 lg:h-96 p-4 sm:p-6 pt-0">
                          <SpendingChart transactions={transactions} />
                        </CardContent>
                      </Card>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.01, rotateY: 1 }} transition={{ duration: 0.3 }}>
                      <Card className="bg-gradient-to-br from-white/5 to-black/80 border-white/20 shadow-xl shadow-white/10 backdrop-blur-sm h-full">
                        <CardHeader className="p-4 sm:p-6">
                          <CardTitle className="text-white font-poppins text-base sm:text-lg md:text-xl">Expense Categories</CardTitle>
                          <CardDescription className="text-gray-300 font-inter text-xs sm:text-sm">Breakdown by category</CardDescription>
                        </CardHeader>
                        <CardContent className="h-48 sm:h-64 md:h-80 lg:h-96 p-4 sm:p-6 pt-0">
                          <CategoryChart transactions={transactions} />
                        </CardContent>
                      </Card>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.section>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Add Transaction Form Modal */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            className="fixed inset-0 bg-gray-700/90 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setShowAddForm(false)}
          >
            <motion.div
              className="bg-gradient-to-br from-gray-900/20 to-black/95 rounded-xl p-4 sm:p-6 w-full max-w-sm sm:max-w-md border border-gray-800/50 shadow-2xl shadow-red-500/20 backdrop-blur-sm max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.8, opacity: 0, y: 50, rotateX: -30 }}
              animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50, rotateX: 30 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <TransactionForm onSubmit={addTransaction} onCancel={() => setShowAddForm(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
