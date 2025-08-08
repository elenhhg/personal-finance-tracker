"use client"

import { motion } from "framer-motion"
import { LayoutDashboard, PieChart, Home, List } from "lucide-react"

export function Navigation({ onSectionChange, activeSection }) {
  const menuItems = [
    { id: "home", icon: Home },
    { id: "overview", icon: LayoutDashboard },
    { id: "transactions", icon: List },
    { id: "analytics", icon: PieChart },
  ]

  return (
    <motion.nav
      className="fixed top-4 left-1/2 -translate-x-1/2 z-40 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-400 border border-gray-500 rounded-full px-4 py-2 shadow-md shadow-gray-500/30"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center gap-2 relative">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = activeSection === item.id

          return (
            <motion.button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className="relative p-3 rounded-full flex items-center justify-center overflow-hidden"
              whileHover={{
                y: -3,
                boxShadow: "0px 0px 12px rgba(156,163,175,0.6)", // platinum gray shadow
              }}
              whileTap={{ scale: 0.95 }}
            >
              {isActive && (
                <motion.div
                  layoutId="highlight"
                  className="absolute inset-0 bg-gray-400 rounded-full z-0"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <Icon
                className={`w-5 h-5 relative z-10 ${
                  isActive ? "text-gray-900" : "text-gray-600"
                }`}
              />
            </motion.button>
          )
        })}
      </div>
    </motion.nav>
  )
}
