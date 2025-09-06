"use client"

import * as React from "react"
import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const handleToggle = () => {
    if (theme === "system") {
      setTheme("light")
    } else if (theme === "light") {
      setTheme("dark")
    } else {
      setTheme("system")
    }
  }

  if (!mounted) {
    return (
      <div className={cn("h-9 w-9 rounded-md border border-border bg-card", className)} />
    )
  }

  const getIcon = () => {
    const currentTheme = resolvedTheme || theme
    switch (currentTheme) {
      case "dark":
        return <Sun className="h-4 w-4 text-yellow-500" />
      case "light":
        return <Moon className="h-4 w-4 text-blue-600" />
      default:
        return <Monitor className="h-4 w-4 text-gray-600 dark:text-gray-400" />
    }
  }

  const getTooltip = () => {
    switch (theme) {
      case "system":
        return "Switch to light mode"
      case "light":
        return "Switch to dark mode"
      default:
        return "Switch to system mode"
    }
  }

  return (
    <motion.button
      className={cn(
        "relative h-9 w-9 rounded-md border border-border",
        "bg-card hover:bg-accent",
        "flex items-center justify-center transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        "focus:ring-offset-background",
        className
      )}
      onClick={handleToggle}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      title={getTooltip()}
      aria-label={getTooltip()}
    >
      <motion.div
        key={theme}
        initial={{ opacity: 0, rotate: -90 }}
        animate={{ opacity: 1, rotate: 0 }}
        exit={{ opacity: 0, rotate: 90 }}
        transition={{ duration: 0.2 }}
      >
        {getIcon()}
      </motion.div>
    </motion.button>
  )
}
