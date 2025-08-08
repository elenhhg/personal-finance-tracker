"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { X } from 'lucide-react'

const expenseCategories = [
  "Rent", "Groceries", "Utilities", "Transportation", "Entertainment",
  "Healthcare", "Shopping", "Dining", "Education", "Other",
]

const incomeCategories = ["Salary", "Freelance", "Investment", "Business", "Gift", "Other"]

export function TransactionForm({ onSubmit, onCancel }) {
  const [type, setType] = useState("expense")
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState(new Date().toISOString().split("T")[0])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!amount || !category || !description) return

    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 500))

    onSubmit({
      type,
      amount: Number.parseFloat(amount),
      category,
      description,
      date,
    })

    setIsSubmitting(false)
    setAmount("")
    setCategory("")
    setDescription("")
    setDate(new Date().toISOString().split("T")[0])
  }

  const categories = type === "expense" ? expenseCategories : incomeCategories

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6 font-inter"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-poppins text-gray-300 tracking-wide">
          ADD TRANSACTION
        </h2>
        <motion.button
          type="button"
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-200 transition-colors p-2"
          whileHover={{ scale: 1.2, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Close form"
        >
          <X className="w-6 h-6" />
        </motion.button>
      </div>

      {/* Type */}
      <div className="space-y-2">
        <Label htmlFor="type" className="text-gray-300 font-bold tracking-wide">Type</Label>
        <Select value={type} onValueChange={setType}>
          <SelectTrigger className="bg-gradient-to-r from-gray-700 via-gray-600 to-gray-800 border-2 border-gray-500 text-gray-200 backdrop-blur-sm hover:border-gray-400 transition-colors shadow-md shadow-gray-900/40 rounded-md">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-gradient-to-b from-gray-900 to-gray-800 border-2 border-gray-700 backdrop-blur-sm shadow-lg shadow-black/60 rounded-md">
            <SelectItem value="expense" className="text-gray-200 hover:bg-gray-700/70 focus:bg-gray-700/70 rounded-md">
              💸 Expense
            </SelectItem>
            <SelectItem value="income" className="text-gray-200 hover:bg-gray-700/70 focus:bg-gray-700/70 rounded-md">
              💰 Income
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Amount */}
      <div className="space-y-2">
        <Label htmlFor="amount" className="text-gray-300 font-bold tracking-wide">Amount</Label>
        <Input
          id="amount"
          type="number"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
          className="bg-gradient-to-r from-gray-700 via-gray-600 to-gray-800 border-2 border-gray-500 text-gray-200 placeholder:text-gray-400 backdrop-blur-sm hover:border-gray-400 focus:border-gray-300 transition-colors font-jetbrains text-lg rounded-md shadow-md shadow-gray-900/40"
          required
        />
      </div>

      {/* Category */}
      <div className="space-y-2">
        <Label htmlFor="category" className="text-gray-300 font-bold tracking-wide">Category</Label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="bg-gradient-to-r from-gray-700 via-gray-600 to-gray-800 border-2 border-gray-500 text-gray-200 backdrop-blur-sm hover:border-gray-400 transition-colors shadow-md shadow-gray-900/40 rounded-md">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent className="bg-gradient-to-b from-gray-900 to-gray-800 border-2 border-gray-700 backdrop-blur-sm shadow-lg shadow-black/60 rounded-md">
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat} className="text-gray-200 hover:bg-gray-700/70 focus:bg-gray-700/70 rounded-md">
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description" className="text-gray-300 font-bold tracking-wide">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description..."
          className="bg-gradient-to-r from-gray-700 via-gray-600 to-gray-800 border-2 border-gray-500 text-gray-200 placeholder:text-gray-400 backdrop-blur-sm hover:border-gray-400 focus:border-gray-300 transition-colors resize-none rounded-md shadow-md shadow-gray-900/40"
          required
        />
      </div>

      {/* Date */}
      <div className="space-y-2">
        <Label htmlFor="date" className="text-gray-300 font-bold tracking-wide">Date</Label>
        <Input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="bg-gradient-to-r from-gray-700 via-gray-600 to-gray-800 border-2 border-gray-500 text-gray-200 backdrop-blur-sm hover:border-gray-400 focus:border-gray-300 transition-colors font-jetbrains rounded-md shadow-md shadow-gray-900/40"
          required
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-4 pt-4">
        <motion.div className="flex-1" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 hover:from-gray-700 hover:via-gray-800 hover:to-gray-900 text-white border-2 border-gray-500 shadow-lg shadow-gray-900/70 transition-all duration-300 font-bold py-3 text-lg rounded-md"
          >
            {isSubmitting ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
              />
            ) : (
              "ADD TRANSACTION"
            )}
          </Button>
        </motion.div>
        <motion.div className="flex-1" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            type="button"
            onClick={onCancel}
            className="w-full border-2 border-gray-500 text-gray-400 hover:bg-gray-700 hover:text-white bg-transparent transition-all duration-300 font-bold py-3 text-lg rounded-md"
          >
            CANCEL
          </Button>
        </motion.div>
      </div>
    </motion.form>
  )
}
