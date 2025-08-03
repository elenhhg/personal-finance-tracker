"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { X } from "lucide-react"

const expenseCategories = [
  "Rent",
  "Groceries",
  "Utilities",
  "Transportation",
  "Entertainment",
  "Healthcare",
  "Shopping",
  "Dining",
  "Education",
  "Other",
]

const incomeCategories = ["Salary", "Freelance", "Investment", "Business", "Gift", "Other"]

const formVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

const fieldVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
}

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

    // Simulate loading
    await new Promise((resolve) => setTimeout(resolve, 500))

    onSubmit({
      type,
      amount: Number.parseFloat(amount),
      category,
      description,
      date,
    })

    setIsSubmitting(false)

    // Reset form
    setAmount("")
    setCategory("")
    setDescription("")
    setDate(new Date().toISOString().split("T")[0])
  }

  const categories = type === "expense" ? expenseCategories : incomeCategories

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6"
      variants={formVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="flex items-center justify-between" variants={fieldVariants}>
        <h2 className="text-2xl font-bold text-transparent bg-gradient-to-r from-white to-gray-300 bg-clip-text">
          Add Transaction
        </h2>
        <motion.button
          type="button"
          onClick={onCancel}
          className="p-1 text-gray-400 transition-colors hover:text-white"
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
        >
          <X className="w-5 h-5" />
        </motion.button>
      </motion.div>

      <motion.div className="space-y-2" variants={fieldVariants}>
        <Label htmlFor="type" className="font-medium text-gray-300">
          Type
        </Label>
        <Select value={type} onValueChange={(value) => setType(value)}>
          <SelectTrigger className="text-white transition-colors border-gray-700 bg-gray-800/50 backdrop-blur-sm hover:bg-gray-800">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700 backdrop-blur-sm">
            <SelectItem value="expense" className="text-white hover:bg-gray-700 focus:bg-gray-700">
              💸 Expense
            </SelectItem>
            <SelectItem value="income" className="text-white hover:bg-gray-700 focus:bg-gray-700">
              💰 Income
            </SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      <motion.div className="space-y-2" variants={fieldVariants}>
        <Label htmlFor="amount" className="font-medium text-gray-300">
          Amount
        </Label>
        <motion.div whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
          <Input
            id="amount"
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="text-white transition-colors border-gray-700 bg-gray-800/50 placeholder:text-gray-500 backdrop-blur-sm hover:bg-gray-800 focus:bg-gray-800"
            required
          />
        </motion.div>
      </motion.div>

      <motion.div className="space-y-2" variants={fieldVariants}>
        <Label htmlFor="category" className="font-medium text-gray-300">
          Category
        </Label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="text-white transition-colors border-gray-700 bg-gray-800/50 backdrop-blur-sm hover:bg-gray-800">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700 backdrop-blur-sm">
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat} className="text-white hover:bg-gray-700 focus:bg-gray-700">
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </motion.div>

      <motion.div className="space-y-2" variants={fieldVariants}>
        <Label htmlFor="description" className="font-medium text-gray-300">
          Description
        </Label>
        <motion.div whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description..."
            className="text-white transition-colors border-gray-700 resize-none bg-gray-800/50 placeholder:text-gray-500 backdrop-blur-sm hover:bg-gray-800 focus:bg-gray-800"
            required
          />
        </motion.div>
      </motion.div>

      <motion.div className="space-y-2" variants={fieldVariants}>
        <Label htmlFor="date" className="font-medium text-gray-300">
          Date
        </Label>
        <motion.div whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
          <Input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="text-white transition-colors border-gray-700 bg-gray-800/50 backdrop-blur-sm hover:bg-gray-800 focus:bg-gray-800"
            required
          />
        </motion.div>
      </motion.div>

      <motion.div className="flex gap-3 pt-4" variants={fieldVariants}>
        <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full text-white transition-all duration-300 border-0 shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-blue-500/25"
          >
            {isSubmitting ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="w-4 h-4 border-2 border-white rounded-full border-t-transparent"
              />
            ) : (
              "Add Transaction"
            )}
          </Button>
        </motion.div>
        <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="w-full text-gray-300 transition-all duration-300 bg-transparent border-gray-700 hover:bg-gray-800 hover:text-white"
          >
            Cancel
          </Button>
        </motion.div>
      </motion.div>
    </motion.form>
  )
}
