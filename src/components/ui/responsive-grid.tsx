import { cn } from "@/lib/utils"

interface ResponsiveGridProps {
  children: React.ReactNode
  className?: string
  cols?: {
    default?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
  }
  gap?: "sm" | "md" | "lg" | "xl"
}

const gapClasses = {
  sm: "gap-3 sm:gap-4",
  md: "gap-4 sm:gap-6 lg:gap-8",
  lg: "gap-6 sm:gap-8 lg:gap-10",
  xl: "gap-8 sm:gap-10 lg:gap-12"
}

export function ResponsiveGrid({ 
  children, 
  className, 
  cols = { default: 1, sm: 2, lg: 3 },
  gap = "md"
}: ResponsiveGridProps) {
  const getGridCols = () => {
    const classes = []
    if (cols.default) classes.push(`grid-cols-${cols.default}`)
    if (cols.sm) classes.push(`sm:grid-cols-${cols.sm}`)
    if (cols.md) classes.push(`md:grid-cols-${cols.md}`)
    if (cols.lg) classes.push(`lg:grid-cols-${cols.lg}`)
    if (cols.xl) classes.push(`xl:grid-cols-${cols.xl}`)
    return classes.join(' ')
  }

  return (
    <div className={cn(
      "grid",
      getGridCols(),
      gapClasses[gap],
      className
    )}>
      {children}
    </div>
  )
}

interface CardGridProps {
  children: React.ReactNode
  className?: string
  cols?: {
    default?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
  }
  gap?: "sm" | "md" | "lg" | "xl"
}

export function CardGrid({ 
  children, 
  className, 
  cols = { default: 1, sm: 2, lg: 4 },
  gap = "md"
}: CardGridProps) {
  return (
    <ResponsiveGrid 
      cols={cols} 
      gap={gap} 
      className={cn("w-full", className)}
    >
      {children}
    </ResponsiveGrid>
  )
}
