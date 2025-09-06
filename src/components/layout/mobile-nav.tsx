"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Menu } from "lucide-react"
import { Logo } from "@/components/ui/logo"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { cn } from "@/lib/utils"

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export function MobileNav({ isOpen, onClose, children }: MobileNavProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div 
            className="fixed inset-0 bg-gray-600 bg-opacity-75" 
            onClick={onClose} 
          />
          <motion.div
            className="relative flex w-80 sm:w-72 h-full flex-col bg-card shadow-xl"
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="flex h-14 sm:h-16 items-center justify-between px-4 border-b border-border">
              <Logo size="sm" />
              <div className="flex items-center space-x-2">
                <ThemeToggle />
                <button
                  onClick={onClose}
                  className="p-2 text-muted-foreground hover:text-accent-foreground hover:bg-accent rounded-lg transition-colors"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

interface MobileMenuButtonProps {
  onClick: () => void
  className?: string
}

export function MobileMenuButton({ onClick, className }: MobileMenuButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "-m-2.5 p-2.5 text-card-foreground lg:hidden hover:bg-accent rounded-lg transition-colors",
        className
      )}
      onClick={onClick}
    >
      <Menu className="h-6 w-6" />
    </button>
  )
}
