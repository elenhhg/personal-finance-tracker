"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { motion } from "framer-motion"

const COLORS = [
  "#60A5FA", // Blue-400
  "#8B5CF6", // Violet-600
  "#22D3EE", // Cyan-400
  "#34D399", // Green-400
  "#F3E8FF", // Purple-100 (light pastel)
  "#D8B4FE", // Purple-300
  "#10B981", // Green-500
]

export function CategoryChart({ transactions }) {
  const expensesByCategory = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, transaction) => {
      const category = transaction.category
      acc[category] = (acc[category] || 0) + transaction.amount
      return acc
    }, {})
  const chartData = Object.entries(expensesByCategory)
    .map(([category, amount]) => ({
      name: category,
      value: amount,
      percentage: 0,
    }))
    .sort((a, b) => b.value - a.value)
  const total = chartData.reduce((sum, item) => sum + item.value, 0)
  chartData.forEach((item) => {
    item.percentage = (item.value / total) * 100
  })

  if (chartData.length === 0) {
    return (
      <motion.div
        className="h-full flex items-center justify-center text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="text-4xl mb-2"
          >
            🥧
          </motion.div>
          <p>No expense data to display</p>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <defs>
            {COLORS.map((color, index) => (
              <linearGradient key={`gradient-${index}`} id={`gradient-${index}`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={1} />
                <stop offset="100%" stopColor={color} stopOpacity={0.5} />
              </linearGradient>
            ))}
          </defs>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={110}
            paddingAngle={2}
            dataKey="value"
            stroke="transparent"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={`url(#gradient-${index % COLORS.length})`} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "#1F2937", // gray-800
              border: "1px solid #6B7280", // gray-500
              borderRadius: "10px",
              color: "#F9FAFB", // gray-50
              boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
            }}
            itemStyle={{ color: "#D1D5DB" }} // gray-300 for text inside tooltip
            formatter={(value) => [`$${value.toLocaleString()}`, "Amount"]}
          />
          <Legend
            wrapperStyle={{ color: "#9CA3AF", fontSize: "13px", marginTop: 16 }}
            formatter={(value, entry) => (
              <span style={{ color: "#D1D5DB" /* gray-300 */ }}>
                {value} ({entry.payload?.percentage?.toFixed(1)}%)
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </motion.div>
  )
}
