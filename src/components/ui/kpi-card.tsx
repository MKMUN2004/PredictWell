"use client"

import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface KPICardProps {
  title: string
  value: number | string
  change?: number
  changeLabel?: string
  icon: LucideIcon
  color?: "blue" | "green" | "orange" | "red" | "purple"
  delay?: number
  formatValue?: (value: number) => string
}

const colorClasses = {
  blue: "gradient-primary",
  green: "gradient-success", 
  orange: "gradient-warning",
  red: "gradient-danger",
  purple: "gradient-secondary"
}

export function KPICard({ 
  title, 
  value, 
  change, 
  changeLabel, 
  icon: Icon, 
  color = "blue",
  delay = 0,
  formatValue = (val) => val.toString()
}: KPICardProps) {
  const isPositiveChange = change !== undefined ? change >= 0 : true
  
  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl bg-card border border-border shadow-lg hover:shadow-xl transition-all duration-300 group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -4, scale: 1.02 }}
    >
      {/* Background gradient */}
      <div className={`absolute inset-0 ${colorClasses[color]} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
      
      {/* Content */}
      <div className="relative p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground mb-2">
              {title}
            </p>
            <motion.div
              className="text-3xl sm:text-4xl font-bold text-card-foreground"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: delay + 0.2, duration: 0.3 }}
            >
              {typeof value === 'number' ? formatValue(value) : value}
            </motion.div>
            
            {change !== undefined && (
              <motion.div
                className={cn(
                  "flex items-center mt-3 text-sm font-medium",
                  isPositiveChange ? "text-green-600" : "text-red-600"
                )}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: delay + 0.4, duration: 0.3 }}
              >
                <span className="flex items-center">
                  {isPositiveChange ? "↗" : "↘"} {Math.abs(change)}%
                </span>
                {changeLabel && (
                  <span className="ml-1 text-muted-foreground">
                    {changeLabel}
                  </span>
                )}
              </motion.div>
            )}
          </div>
          
          <motion.div
            className={`p-3 rounded-xl ${colorClasses[color]} text-white shadow-lg`}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: delay + 0.3, duration: 0.5, type: "spring" }}
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <Icon className="h-6 w-6" />
          </motion.div>
        </div>
      </div>
      
      {/* Animated progress bar */}
      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-30"
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ delay: delay + 0.6, duration: 1, ease: "easeOut" }}
      />
    </motion.div>
  )
}
