"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  ChevronUp, 
  ChevronDown, 
  Search, 
  MoreHorizontal,
  Eye,
  Edit,
  AlertTriangle
} from "lucide-react"
import { Patient } from "@/types/patient"
import { cn, getRiskBgColor, formatDate } from "@/lib/utils"

interface PatientTableProps {
  patients: Patient[]
  onPatientClick?: (patient: Patient) => void
  onEditPatient?: (patient: Patient) => void
}

type SortField = "name" | "riskScore" | "age" | "lastVisit" | "status"
type SortDirection = "asc" | "desc"

export function PatientTable({ patients, onPatientClick, onEditPatient }: PatientTableProps) {
  const [sortField, setSortField] = useState<SortField>("riskScore")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRisk, setFilterRisk] = useState<"all" | "high" | "medium" | "low">("all")

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const filteredAndSortedPatients = patients
    .filter(patient => {
      const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           patient.mrn.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesRisk = filterRisk === "all" || 
                         (filterRisk === "high" && patient.riskLevel === "High") ||
                         (filterRisk === "medium" && patient.riskLevel === "Medium") ||
                         (filterRisk === "low" && patient.riskLevel === "Low")
      
      return matchesSearch && matchesRisk
    })
    .sort((a, b) => {
      let aValue: string | number | Date, bValue: string | number | Date
      
      switch (sortField) {
        case "name":
          aValue = a.name
          bValue = b.name
          break
        case "riskScore":
          aValue = a.riskScore
          bValue = b.riskScore
          break
        case "age":
          aValue = a.age
          bValue = b.age
          break
        case "lastVisit":
          aValue = new Date(a.lastVisit)
          bValue = new Date(b.lastVisit)
          break
        case "status":
          aValue = a.status
          bValue = b.status
          break
        default:
          return 0
      }
      
      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1
      return 0
    })

  const SortButton = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <button
      onClick={() => handleSort(field)}
      className="flex items-center space-x-1 text-left font-medium text-card-foreground hover:text-accent-foreground transition-colors"
    >
      <span>{children}</span>
      {sortField === field && (
        sortDirection === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
      )}
    </button>
  )

  return (
    <motion.div
      className="bg-card rounded-2xl shadow-lg border border-border overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="p-4 sm:p-6 border-b border-border">
        <div className="flex flex-col space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">
              Patient Cohort
            </h3>
            <p className="text-sm text-muted-foreground">
              {filteredAndSortedPatients.length} of {patients.length} patients
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search patients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-card text-card-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            
            {/* Filter */}
            <select
              value={filterRisk}
              onChange={(e) => setFilterRisk(e.target.value as "all" | "high" | "medium" | "low")}
              className="px-3 py-2 border border-border rounded-lg bg-card text-card-foreground focus:ring-2 focus:ring-primary focus:border-transparent sm:w-auto w-full"
            >
              <option value="all">All Risk Levels</option>
              <option value="high">High Risk</option>
              <option value="medium">Medium Risk</option>
              <option value="low">Low Risk</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead className="bg-muted">
            <tr>
              <th className="px-3 sm:px-6 py-3 text-left">
                <SortButton field="name">Patient</SortButton>
              </th>
              <th className="hidden sm:table-cell px-6 py-3 text-left">
                <SortButton field="age">Age</SortButton>
              </th>
              <th className="px-3 sm:px-6 py-3 text-left">
                <SortButton field="riskScore">Risk Score</SortButton>
              </th>
              <th className="hidden md:table-cell px-6 py-3 text-left">Conditions</th>
              <th className="hidden lg:table-cell px-6 py-3 text-left">
                <SortButton field="lastVisit">Last Visit</SortButton>
              </th>
              <th className="hidden sm:table-cell px-6 py-3 text-left">
                <SortButton field="status">Status</SortButton>
              </th>
              <th className="px-3 sm:px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            <AnimatePresence>
              {filteredAndSortedPatients.map((patient, index) => (
                <motion.tr
                  key={patient.id}
                  className="hover:bg-accent transition-colors cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  whileHover={{ backgroundColor: "hsl(var(--accent))" }}
                  onClick={() => onPatientClick?.(patient)}
                >
                  <td className="px-3 sm:px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full gradient-primary flex items-center justify-center text-white font-medium text-xs sm:text-sm shadow-lg">
                          {patient.name.split(' ').map(n => n[0]).join('')}
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-medium text-card-foreground truncate">
                          {patient.name}
                        </div>
                        <div className="text-xs sm:text-sm text-muted-foreground truncate">
                          {patient.mrn}
                        </div>
                        {/* Show age and status on mobile */}
                        <div className="sm:hidden flex items-center space-x-2 mt-1">
                          <span className="text-xs text-muted-foreground">
                            Age: {patient.age}
                          </span>
                          <span className={cn(
                            "px-1.5 py-0.5 rounded-full text-xs font-medium",
                            patient.status === "Critical" && "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300",
                            patient.status === "Active" && "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300",
                            patient.status === "Inactive" && "bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-300"
                          )}>
                            {patient.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="hidden sm:table-cell px-6 py-4 text-sm text-card-foreground">
                    {patient.age}
                  </td>
                  
                  <td className="px-3 sm:px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <div className={cn(
                        "px-2 py-1 rounded-full text-xs font-medium",
                        getRiskBgColor(patient.riskScore),
                        "text-white"
                      )}>
                        {patient.riskScore}%
                      </div>
                      {patient.riskLevel === "High" && (
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                  </td>
                  
                  <td className="hidden md:table-cell px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {patient.conditions.slice(0, 2).map((condition, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 text-xs rounded-full"
                        >
                          {condition}
                        </span>
                      ))}
                      {patient.conditions.length > 2 && (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 text-xs rounded-full">
                          +{patient.conditions.length - 2}
                        </span>
                      )}
                    </div>
                  </td>
                  
                  <td className="hidden lg:table-cell px-6 py-4 text-sm text-card-foreground">
                    {formatDate(patient.lastVisit)}
                  </td>
                  
                  <td className="hidden sm:table-cell px-6 py-4">
                    <span className={cn(
                      "px-2 py-1 rounded-full text-xs font-medium",
                      patient.status === "Critical" && "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300",
                      patient.status === "Active" && "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300",
                      patient.status === "Inactive" && "bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-300"
                    )}>
                      {patient.status}
                    </span>
                  </td>
                  
                  <td className="px-3 sm:px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-1 sm:space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          onPatientClick?.(patient)
                        }}
                        className="p-1 text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          onEditPatient?.(patient)
                        }}
                        className="p-1 text-muted-foreground hover:text-green-600 transition-colors"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="hidden sm:block p-1 text-muted-foreground hover:text-accent-foreground transition-colors">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}
