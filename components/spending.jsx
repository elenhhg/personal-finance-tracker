"use client"

import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { motion } from "framer-motion"

export function SpendingChart({ transactions }) {
  // Group transactions by date and calculate daily totals
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
        className="h-[200px] flex items-center justify-center text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="mb-2 text-4xl"
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
      className="h-[200px]"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#10B981" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#EF4444" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: "#9CA3AF", fontSize: 12 }} />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9CA3AF", fontSize: 12 }}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#111827",
              border: "1px solid #374151",
              borderRadius: "12px",
              color: "#F3F4F6",
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5)",
            }}
            formatter={(value, name) => [`$${value.toLocaleString()}`, name === "expenses" ? "Expenses" : "Income"]}
          />
          <Area
            type="monotone"
            dataKey="expenses"
            stackId="1"
            stroke="#EF4444"
            fill="url(#expenseGradient)"
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="income"
            stackId="2"
            stroke="#10B981"
            fill="url(#incomeGradient)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  )
}
