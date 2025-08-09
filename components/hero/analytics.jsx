"use client"

import { motion } from "framer-motion"
import { PieChart, BarChart3, TrendingUp } from "lucide-react"
import { Pie, Cell, ResponsiveContainer } from "recharts" // Import Recharts components
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart" // Import shadcn/ui chart components

export function HeroAnalytics({ transactions }) {
  // Calculate expense categories with amounts for the pie chart
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

  // Define colors for the pie chart segments
  const COLORS = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#3b82f6", "#8b5cf6", "#ec4899", "#14b8a6"]

  const gradientAnimation = {
    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
  }

  const gradientTransition = {
    duration: 2.5,
    repeat: Number.POSITIVE_INFINITY,
    ease: "linear",
  }

  return (
    <div className="w-full max-w-[1400px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
      <div className="text-center space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12 px-2 sm:px-4 md:px-6">
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
                     ANALYTICS
                   </motion.span>
                 </motion.h1>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {/* Categories Card (now with Pie Chart) */}
          <motion.div
            className="bg-gradient-to-br from-gray-300/15 to-transparent border-2 border-gray-400/40 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 backdrop-blur-sm flex flex-col items-center justify-center"
            whileHover={{ scale: 1.02, rotateX: 5 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-300 mb-4">CATEGORIES</h3>
            {categoryData.length > 0 ? (
              <ChartContainer
                config={categoryData.reduce((acc, item, index) => {
                  acc[item.name] = {
                    label: item.name,
                    color: COLORS[index % COLORS.length],
                  }
                  return acc
                }, {})}
                className="aspect-square h-[150px] sm:h-[200px] md:h-[250px] w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <ChartTooltip cursor={false} content={<ChartTooltipContent nameKey="name" />} />
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      outerRadius="80%"
                      fill="#8884d8"
                      dataKey="value"
                      labelLine={false}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <PieChart className="w-12 h-12 text-gray-600 mb-2" />
                <p>No expense data</p>
              </div>
            )}
            <p className="text-sm sm:text-base text-gray-500 mt-4">{categoryData.length} Active Categories</p>
          </motion.div>

          {/* Top Category Card */}
          <motion.div
            className="bg-gradient-to-br from-gray-300/15 to-transparent border-2 border-gray-400/40 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 backdrop-blur-sm"
            whileHover={{ scale: 1.02, rotateX: 5 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              className="mb-3 sm:mb-4"
            >
              <BarChart3 className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-gray-600 mx-auto" />
            </motion.div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-300 mb-2">TOP CATEGORY</h3>
            <motion.p
              className="text-lg sm:text-xl md:text-2xl font-black text-gray-100 font-jetbrains truncate"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              title={topCategory ? topCategory.name : "N/A"}
            >
              {topCategory ? topCategory.name : "N/A"}
            </motion.p>
            <p className="text-sm sm:text-base text-gray-500 mt-2">
              {topCategory ? `${topCategory.value.toLocaleString()} total` : "No data"}
            </p>
          </motion.div>

          {/* Insights Card */}
          <motion.div
            className="bg-gradient-to-br from-gray-300/15 to-transparent border-2 border-gray-400/40 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 backdrop-blur-sm sm:col-span-2 lg:col-span-1"
            whileHover={{ scale: 1.02, rotateX: 5 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              className="mb-3 sm:mb-4"
            >
              <TrendingUp className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-gray-600 mx-auto" />
            </motion.div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-300 mb-2">INSIGHTS</h3>
            <motion.p
              className="text-2xl sm:text-3xl md:text-3xl font-black text-gray-100 font-jetbrains"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 1.4 }}
            >
              {transactions.length}
            </motion.p>
            <p className="text-sm sm:text-base text-gray-500 mt-2">Total Transactions</p>
          </motion.div>
        </motion.div>

        <motion.p
          className="text-base sm:text-lg md:text-xl text-gray-500 max-w-3xl mx-auto px-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          <span className="text-gray-600 font-bold">POWERFUL ANALYTICS</span> with real-time insights and{" "}
          <span className="text-gray-800 font-bold">dynamic visualizations</span>
        </motion.p>
      </div>
    </div>
  )
}
