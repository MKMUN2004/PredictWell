"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { cn, getRiskColor, getRiskBgColor } from "@/lib/utils"

interface RiskHeatmapProps {
  data: Array<{
    id: string
    name: string
    riskScore: number
    age: number
    conditions: string[]
  }>
  onPatientClick?: (patient: { id: string; name: string; riskScore: number; age: number; conditions: string[] }) => void
}

export function RiskHeatmap({ data, onPatientClick }: RiskHeatmapProps) {
  const [hoveredPatient, setHoveredPatient] = useState<string | null>(null)
  
  // Group patients by risk ranges
  const riskRanges = [
    { min: 0, max: 20, label: "0-20", color: "bg-green-100 dark:bg-green-900/20" },
    { min: 21, max: 40, label: "21-40", color: "bg-green-200 dark:bg-green-800/30" },
    { min: 41, max: 60, label: "41-60", color: "bg-orange-200 dark:bg-orange-800/30" },
    { min: 61, max: 80, label: "61-80", color: "bg-orange-300 dark:bg-orange-700/40" },
    { min: 81, max: 100, label: "81-100", color: "bg-red-300 dark:bg-red-700/40" }
  ]
  
  const groupedData = riskRanges.map(range => ({
    ...range,
    patients: data.filter(p => p.riskScore >= range.min && p.riskScore <= range.max)
  }))
  
  return (
    <motion.div
      className="bg-card rounded-2xl p-4 sm:p-6 shadow-lg border border-border"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-4 sm:mb-6">
        <h3 className="text-base sm:text-lg font-semibold text-card-foreground mb-1 sm:mb-2">
          Risk Distribution Heatmap
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Patient risk scores grouped by ranges
        </p>
      </div>
      
      <div className="space-y-4">
        {groupedData.map((range, index) => (
          <motion.div
            key={range.label}
            className="space-y-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-card-foreground">
                {range.label}% Risk
              </span>
              <span className="text-sm text-muted-foreground">
                {range.patients.length} patients
              </span>
            </div>
            
            <div className="flex flex-wrap gap-1 sm:gap-2">
              {range.patients.map((patient, patientIndex) => (
                <motion.div
                  key={patient.id}
                  className={cn(
                    "relative px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs font-medium cursor-pointer transition-all duration-200",
                    range.color,
                    "hover:scale-105 hover:shadow-md",
                    hoveredPatient === patient.id && "ring-2 ring-blue-500 ring-opacity-50"
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onMouseEnter={() => setHoveredPatient(patient.id)}
                  onMouseLeave={() => setHoveredPatient(null)}
                  onClick={() => onPatientClick?.(patient)}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    delay: (index * 0.1) + (patientIndex * 0.02),
                    duration: 0.2 
                  }}
                >
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <div className={cn(
                      "w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full",
                      getRiskBgColor(patient.riskScore)
                    )} />
                    <span className="text-card-foreground text-xs">
                      {patient.name.split(' ')[0]}
                    </span>
                    <span className={cn(
                      "font-bold text-xs",
                      getRiskColor(patient.riskScore)
                    )}>
                      {patient.riskScore}%
                    </span>
                  </div>
                  
                  {/* Tooltip */}
                  {hoveredPatient === patient.id && (
                    <motion.div
                      className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-lg shadow-lg z-10 whitespace-nowrap"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                    >
                      <div className="font-medium">{patient.name}</div>
                      <div className="text-gray-300">
                        Age: {patient.age} • Risk: {patient.riskScore}%
                      </div>
                      <div className="text-gray-400">
                        {patient.conditions.slice(0, 2).join(", ")}
                        {patient.conditions.length > 2 && "..."}
                      </div>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-700" />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Legend */}
      <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-border">
        <div className="flex items-center justify-center space-x-2 sm:space-x-4 text-xs">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500" />
            <span className="text-muted-foreground">Low Risk</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-orange-500" />
            <span className="text-muted-foreground">Medium Risk</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500" />
            <span className="text-muted-foreground">High Risk</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
