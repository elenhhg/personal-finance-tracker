"use client"

import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { motion } from "framer-motion"

export function SpendingChart({ transactions }) {
  const dailyData = transactions.reduce((acc, transaction) => {
    const date = transaction.date
    if (!acc[date]) {
      acc[date] = { date, income: 0, expenses: 0 }
    }

    if (transaction.type === "income") {
      acc[date].income += transaction.amount
    } else {
      acc[date].expenses += transaction.amount
    }

    return acc
  }, {})

  const chartData = Object.values(dailyData)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((item) => ({
      ...item,
      date: new Date(item.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    }))

  if (chartData.length === 0) {
    return (
      <motion.div
        className="h-[300px] flex items-center justify-center text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="text-4xl mb-2"
          >
            📊
          </motion.div>
          <p>No data to display</p>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="h-[300px]"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#60A5FA" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#60A5FA" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#A78BFA" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#A78BFA" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: "#D1D5DB", fontSize: 12 }} />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#D1D5DB", fontSize: 12 }}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1F2937", // gray-800
              border: "1px solid #6B7280", // gray-500
              borderRadius: "10px",
              color: "#F9FAFB", // gray-50
              boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
            }}
            itemStyle={{ color: "#D1D5DB" }} // gray-300
            formatter={(value, name) => [`$${value.toLocaleString()}`, name === "expenses" ? "Expenses" : "Income"]}
          />
          <Area
            type="monotone"
            dataKey="expenses"
            stackId="1"
            stroke="#A78BFA"
            fill="url(#expenseGradient)"
            strokeWidth={3}
          />
          <Area
            type="monotone"
            dataKey="income"
            stackId="2"
            stroke="#60A5FA"
            fill="url(#incomeGradient)"
            strokeWidth={3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  )
}
