import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date))
}

export function formatDateTime(date: Date | string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date))
}

export function getRiskColor(riskScore: number) {
  if (riskScore >= 70) return "text-red-500"
  if (riskScore >= 40) return "text-orange-500"
  return "text-green-500"
}

export function getRiskBgColor(riskScore: number) {
  if (riskScore >= 70) return "bg-red-500"
  if (riskScore >= 40) return "bg-orange-500"
  return "bg-green-500"
}

export function getRiskLabel(riskScore: number) {
  if (riskScore >= 70) return "High Risk"
  if (riskScore >= 40) return "Medium Risk"
  return "Low Risk"
}

export function generateId() {
  return Math.random().toString(36).substr(2, 9)
}
