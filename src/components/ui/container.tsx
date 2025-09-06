import { cn } from "@/lib/utils"

interface ContainerProps {
  children: React.ReactNode
  className?: string
  size?: "sm" | "md" | "lg" | "xl" | "full"
}

const sizeClasses = {
  sm: "max-w-2xl",
  md: "max-w-4xl", 
  lg: "max-w-6xl",
  xl: "max-w-7xl",
  full: "max-w-none"
}

export function Container({ 
  children, 
  className, 
  size = "xl" 
}: ContainerProps) {
  return (
    <div className={cn(
      "mx-auto",
      sizeClasses[size],
      className
    )}>
      {children}
    </div>
  )
}

interface SectionProps {
  children: React.ReactNode
  className?: string
  spacing?: "sm" | "md" | "lg" | "xl"
}

const spacingClasses = {
  sm: "py-3 sm:py-4",
  md: "py-4 sm:py-6 lg:py-8",
  lg: "py-6 sm:py-8 lg:py-12",
  xl: "py-8 sm:py-12 lg:py-16"
}

export function Section({ 
  children, 
  className, 
  spacing = "md" 
}: SectionProps) {
  return (
    <section className={cn(
      spacingClasses[spacing],
      className
    )}>
      {children}
    </section>
  )
}
