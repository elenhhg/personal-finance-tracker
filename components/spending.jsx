"use client"

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { ChartPie } from "lucide-react"
import { Open_Sans } from "next/font/google"

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
})

const COLORS = ["#60A5FA", "#A78BFA"] // Blue = Income, Purple = Expenses

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

  // Υπολογισμός συνολικών income & expenses
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0)

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0)

  const pieData = [
    { name: "Income", value: totalIncome },
    { name: "Expenses", value: totalExpenses },
  ]

  if (chartData.length === 0) {
    return (
      <Card className="bg-gradient-to-br from-gray-900/40 to-black/80 border-gray-700 shadow-xl shadow-gray-800/30 backdrop-blur-sm h-[300px] flex items-center justify-center">
        <CardContent className="text-center text-gray-300">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="text-4xl mb-2"
          >
            📊
          </motion.div>
          <p>No data to display</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="space-y-6"
    >
      {/* Area Chart */}
      <Card className="bg-gradient-to-br from-sky-900/20 to-black/80 border-sky-800/50 shadow-xl shadow-sky-500/20 backdrop-blur-sm">
        <CardHeader className="flex flex-col items-center text-center">
          <ChartPie className="w-8 h-8 text-sky-400 mb-2" />
          <CardTitle className={`text-lg sm:text-xl font-bold text-sky-200 ${openSans.className}`}>
            Spending Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
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
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#D1D5DB", fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#D1D5DB", fontSize: 12 }}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    border: "1px solid #6B7280",
                    borderRadius: "10px",
                    color: "#F9FAFB",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                  }}
                  itemStyle={{ color: "#D1D5DB" }}
                  formatter={(value, name) => [
                    `$${value.toLocaleString()}`,
                    name === "expenses" ? "Expenses" : "Income",
                  ]}
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
          </div>
        </CardContent>
      </Card>

      {/* Pie Chart κάτω */}
      <Card className="bg-gradient-to-br from-purple-900/20 to-black/80 border-purple-800/50 shadow-xl shadow-purple-500/20 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className={`text-lg sm:text-xl font-bold text-purple-200 ${openSans.className}`}>
            Income vs Expenses
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => [`$${value.toLocaleString()}`, name]}
                contentStyle={{
                  backgroundColor: "#1F2937",
                  border: "1px solid #6B7280",
                  borderRadius: "10px",
                  color: "#F9FAFB",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-4">
            <span className="flex items-center gap-2 text-sky-300">
              <span className="w-3 h-3 rounded-full bg-sky-400" /> Income
            </span>
            <span className="flex items-center gap-2 text-purple-300">
              <span className="w-3 h-3 rounded-full bg-purple-400" /> Expenses
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
