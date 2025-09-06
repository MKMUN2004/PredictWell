"use client"

import { motion } from "framer-motion"
import { Heart } from "lucide-react"
import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  size?: "sm" | "md" | "lg" | "xl"
  animated?: boolean
}

const sizeClasses = {
  sm: "h-6 w-6",
  md: "h-8 w-8", 
  lg: "h-12 w-12",
  xl: "h-16 w-16"
}

export function Logo({ className, size = "md", animated = true }: LogoProps) {
  const iconSize = size === "sm" ? 16 : size === "md" ? 20 : size === "lg" ? 28 : 36

  return (
    <motion.div
      className={cn("flex items-center space-x-2", className)}
      initial={animated ? { opacity: 0, scale: 0.8 } : false}
      animate={animated ? { opacity: 1, scale: 1 } : false}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.div
        className={cn(
          "relative flex items-center justify-center rounded-xl gradient-primary",
          sizeClasses[size]
        )}
        whileHover={animated ? { scale: 1.05 } : undefined}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <motion.div
          className="absolute inset-0 rounded-xl bg-white/20"
          animate={animated ? {
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3]
          } : false}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <Heart 
          size={iconSize} 
          className="text-white relative z-10" 
          fill="currentColor"
        />
      </motion.div>
      
      <motion.div
        className="flex flex-col"
        initial={animated ? { opacity: 0, x: -10 } : false}
        animate={animated ? { opacity: 1, x: 0 } : false}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <span className="font-bold text-lg sm:text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          PredictWell
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400 -mt-1 hidden sm:block">
          AI Health Analytics
        </span>
      </motion.div>
    </motion.div>
  )
}

export function LogoIcon({ className, size = "md", animated = true }: LogoProps) {
  const iconSize = size === "sm" ? 16 : size === "md" ? 20 : size === "lg" ? 28 : 36

  return (
    <motion.div
      className={cn(
        "relative flex items-center justify-center rounded-xl gradient-primary",
        sizeClasses[size],
        className
      )}
      initial={animated ? { opacity: 0, scale: 0.8 } : undefined}
      animate={animated ? { opacity: 1, scale: 1 } : undefined}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={animated ? { scale: 1.05 } : undefined}
    >
      <motion.div
        className="absolute inset-0 rounded-xl bg-white/20"
        animate={animated ? {
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.6, 0.3]
        } : false}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <Heart 
        size={iconSize} 
        className="text-white relative z-10" 
        fill="currentColor"
      />
    </motion.div>
  )
}
