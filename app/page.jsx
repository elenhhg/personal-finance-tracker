"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { TrendingUp, TrendingDown, DollarSign, Menu, X, Home, BarChart3, CreditCard, PieChart } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TransactionForm } from "@/components/transaction-form"
import { TransactionList } from "@/components/transaction-list"
import { SpendingChart } from "@/components/spending"
import { CategoryChart } from "@/components/category"
import { Navigation } from "@/components/header"
import HeroHome from "@/components/hero/home"
import { HeroOverview } from "@/components/hero/overview"
import { HeroAnalytics } from "@/components/hero/analytics"
import { HeroTransactions } from "@/components/hero/transactions"
import { useUser } from "@clerk/nextjs" // Import useUser from Clerk

export default function FinanceTracker() {
  const { user, isLoaded } = useUser() // Get user and isLoaded from Clerk
  const userId = user?.id

  // State for transactions, initialized based on user ID
  const [transactions, setTransactions] = useState(() => {
    if (isLoaded && userId) {
      try {
        const storedTransactions = localStorage.getItem(`transactions_${userId}`)
        return storedTransactions ? JSON.parse(storedTransactions) : []
      } catch (error) {
        console.error("Failed to parse transactions from localStorage:", error)
        return []
      }
    }
    return [] // Default to empty if not loaded or no user
  })

  const [showAddForm, setShowAddForm] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const containerRef = useRef(null)
  const [scrollTarget, setScrollTarget] = useState(null)

  useEffect(() => {
    if (containerRef.current) {
      setScrollTarget(containerRef.current)
    }
  }, [])

  const { scrollYProgress } = useScroll({ target: scrollTarget })

  const parallaxY1 = useTransform(scrollYProgress, [0, 1], [0, -50])
  const parallaxY2 = useTransform(scrollYProgress, [0, 1], [0, -75])
  const parallaxY3 = useTransform(scrollYProgress, [0, 1], [0, -25])

  // Effect to load/save transactions based on userId
  useEffect(() => {
    if (isLoaded && userId) {
      try {
        const storedTransactions = localStorage.getItem(`transactions_${userId}`)
        if (storedTransactions) {
          setTransactions(JSON.parse(storedTransactions))
        } else {
          // If no stored transactions for this user, initialize to empty
          setTransactions([])
        }
      } catch (error) {
        console.error("Failed to load transactions from localStorage:", error)
        setTransactions([])
      }
    } else if (isLoaded && !userId) {
      // If user logs out, clear transactions
      setTransactions([])
    }
  }, [userId, isLoaded])

  // Effect to save transactions whenever they change
  useEffect(() => {
    if (isLoaded && userId) {
      localStorage.setItem(`transactions_${userId}`, JSON.stringify(transactions))
    }
  }, [transactions, userId, isLoaded])

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

  const handleSectionChange = (sectionId) => {
    if (sectionId === activeSection) return
    setMobileMenuOpen(false)
    setActiveSection(sectionId)
  }

  const getHeroComponent = () => {
    switch (activeSection) {
      case "home":
        return <HeroHome onAddTransaction={() => setShowAddForm(true)}
        onViewDashboard={() => setActiveSection("overview")} />
      case "overview":
        return (
          <HeroOverview
            balance={balance}
            totalIncome={totalIncome}
            totalExpenses={totalExpenses}
            transactions={transactions}
          />
        )
      case "analytics":
        return <HeroAnalytics transactions={transactions} />
      case "transactions":
        return (
          <HeroTransactions
            transactions={transactions}
            onDelete={deleteTransaction}
            onAddTransaction={() => setShowAddForm(true)}
          />
        )
      default:
        return <HeroHome onAddTransaction={() => setShowAddForm(true)}
         onViewDashboard={() => setActiveSection("overview")} />
    }
  }

  if (!isLoaded) {
    // You can render a loading spinner here while Clerk is loading
    return <div className="min-h-screen flex items-center justify-center text-gray-400">Loading...</div>
  }

  return (
    <div
      className="min-h-screen font-inter overflow-hidden"
      style={{
        // color: "#1f2937",
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
                  { id: "transactions", icon: CreditCard, label: "Transactions" },
                ].map(({ id, icon: Icon, label }) => (
                  <button
                    key={id}
                    onClick={() => handleSectionChange(id)}
                    className={`flex items-center space-x-3 p-3 sm:p-4 rounded-lg transition-all duration-200 touch-manipulation ${
                      activeSection === id
                        ? "bg-gray-700 text-white shadow-md"
                        : "text-gray-300 hover:bg-gray-700/50 active:bg-gray-700/70"
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

      {/* Centered Navigation - Hidden on mobile */}
      <div className="hidden lg:block">
        <Navigation activeSection={activeSection} onSectionChange={handleSectionChange} />
      </div>

      {/* Content Container */}
      <div className="relative z-10 min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            className="min-h-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {/* Hero Section */}
            <motion.section
              className="min-h-screen flex items-center justify-center relative px-3 sm:px-4 md:px-6"
              style={{ y: parallaxY1 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {getHeroComponent()}
            </motion.section>

            {/* Content Sections */}
            {activeSection === "overview" && (
              <motion.section
                className="min-h-screen py-8 sm:py-12 md:py-16 lg:py-20 px-3 sm:px-4 md:px-6"
                style={{ y: parallaxY2 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="container mx-auto max-w-7xl">
                  <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    {/* Add your overview cards/components here */}
                  </motion.div>
                </div>
              </motion.section>
            )}

            {activeSection === "analytics" && (
              <motion.section
                className="min-h-screen py-8 sm:py-12 md:py-16 lg:py-20 px-3 sm:px-4 md:px-6"
                style={{ y: parallaxY3 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="container mx-auto max-w-7xl">
                  <motion.div
                    className="grid grid-cols-1 gap-4 sm:gap-6 lg:gap-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <SpendingChart transactions={transactions} />
                    <CategoryChart transactions={transactions} />
                  </motion.div>
                </div>
              </motion.section>
            )}

            {activeSection === "transactions" && (
              <motion.section
                className="min-h-screen py-8 sm:py-12 md:py-16 lg:py-20 px-3 sm:px-4 md:px-6"
                style={{ y: parallaxY2 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="container mx-auto max-w-7xl">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <TransactionList transactions={transactions} onDelete={deleteTransaction} />
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
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
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
