"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { 
  Users, 
  Plus,
  Grid,
  List,
  AlertTriangle,
  Heart,
  Activity
} from "lucide-react"
import { PatientTable } from "@/components/ui/patient-table"
import { generateSamplePatients, generateCohortStats } from "@/lib/sample-data"
import { Patient, CohortStats } from "@/types/patient"
import { Container, Section } from "@/components/ui/container"
import { ResponsiveGrid, CardGrid } from "@/components/ui/responsive-grid"

export default function PatientsPage() {
  const router = useRouter()
  const [patients, setPatients] = useState<Patient[]>([])
  const [cohortStats, setCohortStats] = useState<CohortStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")

  useEffect(() => {
    const timer = setTimeout(() => {
      const samplePatients = generateSamplePatients()
      const stats = generateCohortStats(samplePatients)
      setPatients(samplePatients)
      setCohortStats(stats)
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handlePatientClick = (patient: Patient) => {
    console.log("Navigate to patient:", patient.id)
    router.push(`/patients/${patient.id}`)
  }

  const handleEditPatient = (patient: Patient) => {
    // Open edit modal or navigate to edit page
    console.log("Edit patient:", patient.id)
  }

  if (loading) {
    return (
      <Container>
        <Section>
          <motion.div
            className="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
          <CardGrid cols={{ default: 1, sm: 2, lg: 4 }} className="mb-8">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="h-32 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              />
            ))}
          </CardGrid>
          <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse" />
        </Section>
      </Container>
    )
  }

  return (
    <Container>
      <Section>
        {/* Header */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
              Patient Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage your chronic care patient cohort
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              {viewMode === "grid" ? <List className="h-5 w-5" /> : <Grid className="h-5 w-5" />}
            </button>
            <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Add Patient</span>
            </button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <CardGrid cols={{ default: 1, sm: 2, lg: 4 }} className="mb-8">
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Patients</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {cohortStats?.totalPatients || 0}
              </p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">High Risk</p>
              <p className="text-3xl font-bold text-red-600">
                {cohortStats?.highRisk || 0}
              </p>
            </div>
            <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Critical</p>
              <p className="text-3xl font-bold text-orange-600">
                {cohortStats?.criticalPatients || 0}
              </p>
            </div>
            <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
              <Heart className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Risk Score</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {cohortStats?.averageRiskScore || 0}%
              </p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <Activity className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </motion.div>
        </CardGrid>

        {/* Patient Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <PatientTable
            patients={patients}
            onPatientClick={handlePatientClick}
            onEditPatient={handleEditPatient}
          />
        </motion.div>
      </Section>
    </Container>
  )
}
