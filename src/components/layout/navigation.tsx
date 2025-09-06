"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { 
  LayoutDashboard, 
  Users, 
  BarChart3, 
  Settings, 
  Bell,
  User
} from "lucide-react"
import { Logo } from "@/components/ui/logo"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { MobileNav, MobileMenuButton } from "@/components/layout/mobile-nav"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Patients", href: "/patients", icon: Users },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Admin", href: "/admin", icon: Settings },
]

export function Navigation() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <>
      {/* Mobile sidebar */}
      <MobileNav isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)}>
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 shadow-sm"
                  : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
              )}
              onClick={() => setSidebarOpen(false)}
            >
              <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
              <span className="truncate">{item.name}</span>
            </Link>
          )
        })}
      </MobileNav>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
        <motion.div
          className="flex grow flex-col gap-y-5 overflow-y-auto bg-card px-6 py-4 shadow-lg border-r border-border"
          initial={{ x: -256, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Logo size="md" />
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={cn(
                        "group flex gap-x-3 rounded-lg p-3 text-sm font-semibold leading-6 transition-all duration-200",
                        isActive
                          ? "bg-primary/10 text-primary shadow-sm"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      )}
                    >
                      <item.icon
                        className={cn(
                          "h-5 w-5 shrink-0 transition-colors",
                          isActive
                            ? "text-primary"
                            : "text-muted-foreground group-hover:text-accent-foreground"
                        )}
                      />
                      {item.name}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </motion.div>
      </div>

      {/* Top bar */}
      <div className="sticky top-0 z-40 flex h-14 sm:h-16 shrink-0 items-center gap-x-2 sm:gap-x-4 border-b border-border bg-card px-3 sm:px-4 lg:px-8 shadow-sm backdrop-blur-sm bg-card/95">
        <MobileMenuButton onClick={() => setSidebarOpen(true)} />

        <div className="flex flex-1 gap-x-2 sm:gap-x-4 self-stretch lg:gap-x-6">
          <div className="flex flex-1" />
          <div className="flex items-center gap-x-1 sm:gap-x-2 lg:gap-x-4">
            <button
              type="button"
              className="p-1.5 sm:p-2 text-muted-foreground hover:text-accent-foreground hover:bg-accent rounded-lg transition-colors"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
            <ThemeToggle />
            <div className="hidden sm:block h-6 w-px bg-border" />
            <div className="flex items-center gap-x-1 sm:gap-x-2">
              <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full gradient-primary flex items-center justify-center shadow-lg">
                <User className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
              </div>
              <span className="hidden sm:block text-sm font-medium text-card-foreground truncate max-w-32">
                Dr. Smith
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
