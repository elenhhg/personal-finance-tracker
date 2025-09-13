"use client"

import { motion } from "framer-motion"
import { PieChart, BarChart3, TrendingUp } from "lucide-react"
import { Pie, Cell, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Bruno_Ace_SC, Open_Sans } from "next/font/google"

// Fonts
const brunoAceSC = Bruno_Ace_SC({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
})

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
})

export function HeroAnalytics({ transactions }) {
  // Υπολογισμός κατηγοριών εξόδων
  const expenseCategories = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount
      return acc
    }, {})

  const categoryData = Object.entries(expenseCategories).map(([category, amount]) => ({
    name: category,
    value: amount,
  }))

  const topCategory = categoryData.sort((a, b) => b.value - a.value)[0]

  const COLORS = [
    "#ef4444", // red
    "#f97316", // orange
    "#eab308", // yellow
    "#22c55e", // green
    "#3b82f6", // blue
    "#8b5cf6", // purple
    "#ec4899", // pink
    "#14b8a6", // teal
  ]

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
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            style={{ backgroundSize: "200% 200%" }}
          >
            ANALYTICS
          </motion.span>
        </motion.h1>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {/* Categories Card */}
          <motion.div whileHover={{ scale: 1.02, rotateY: 2 }} transition={{ duration: 0.3 }}>
            <Card className="bg-gradient-to-br from-indigo-900/20 to-black/80 border-indigo-800/50 shadow-xl shadow-indigo-500/20 h-full backdrop-blur-sm">
              <CardHeader>
                <CardTitle className={`text-lg sm:text-xl font-bold text-indigo-200 ${openSans.className}`}>
                  Categories
                </CardTitle>
              </CardHeader>
              <CardContent>
                {categoryData.length > 0 ? (
                  <ChartContainer
                    config={categoryData.reduce((acc, item, index) => {
                      acc[item.name] = { label: item.name, color: COLORS[index % COLORS.length] }
                      return acc
                    }, {})}
                    className="w-full h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <ChartTooltip cursor={false} content={<ChartTooltipContent nameKey="name" />} />
                        <Pie data={categoryData} outerRadius="80%" dataKey="value" labelLine={false}>
                          {categoryData.map((entry, index) => (
                            <Cell key={index} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                ) : (
                  <div className="flex flex-col items-center justify-center h-[200px] text-indigo-300">
                    <PieChart className="w-10 h-10 text-indigo-500 mb-2" />
                    <p>No expense data</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Top Category Card */}
          <motion.div whileHover={{ scale: 1.02, rotateY: 2 }} transition={{ duration: 0.3 }}>
            <Card className="bg-gradient-to-br from-green-900/20 to-black/80 border-green-800/50 shadow-xl shadow-green-500/20 h-full backdrop-blur-sm">
              <CardHeader className="text-center">
                <BarChart3 className="w-10 h-10 text-green-400 mx-auto mb-2" />
                <CardTitle className={`text-lg sm:text-xl font-bold text-green-200 ${openSans.className}`}>
                  Top Category
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <motion.p
                  className={`text-2xl sm:text-3xl font-black text-green-400 ${openSans.className}`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  {topCategory ? topCategory.name : "N/A"}
                </motion.p>
                <p className="text-sm text-green-300 mt-2">
                  {topCategory ? `${topCategory.value.toLocaleString()} total` : "No data"}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Insights Card */}
          <motion.div whileHover={{ scale: 1.02, rotateY: 2 }} transition={{ duration: 0.3 }}>
            <Card className="bg-gradient-to-br from-purple-900/20 to-black/80 border-purple-800/50 shadow-xl shadow-purple-500/20 h-full backdrop-blur-sm">
              <CardHeader className="text-center">
                <TrendingUp className="w-10 h-10 text-purple-400 mx-auto mb-2" />
                <CardTitle className={`text-lg sm:text-xl font-bold text-purple-200 ${openSans.className}`}>
                  Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <motion.p
                  className={`text-2xl sm:text-3xl font-black text-purple-400 ${openSans.className}`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 1 }}
                >
                  {transactions.length}
                </motion.p>
                <p className="text-sm text-purple-300 mt-2">Total Transactions</p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
