"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { 
  Users, 
  AlertTriangle, 
  TrendingUp, 
  Activity,
  Heart
} from "lucide-react"
import { KPICard } from "@/components/ui/kpi-card"
import { RiskHeatmap } from "@/components/ui/risk-heatmap"
import { PatientTable } from "@/components/ui/patient-table"
import { Container, Section } from "@/components/ui/container"
import { ResponsiveGrid, CardGrid } from "@/components/ui/responsive-grid"
import { generateSamplePatients, generateCohortStats } from "@/lib/sample-data"
import { Patient, CohortStats } from "@/types/patient"

export default function Dashboard() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [cohortStats, setCohortStats] = useState<CohortStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      const samplePatients = generateSamplePatients()
      const stats = generateCohortStats(samplePatients)
      setPatients(samplePatients)
      setCohortStats(stats)
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handlePatientClick = (patient: Patient | { id: string; name: string; riskScore: number; age: number; conditions: string[] }) => {
    // Navigate to patient detail page
    console.log("Navigate to patient:", patient.id)
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
          <CardGrid cols={{ default: 1, sm: 2, lg: 4 }}>
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
        </Section>
      </Container>
    )
  }

  return (
    <Container>
      <Section>
        {/* Header */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 mb-8 sm:mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Chronic Care Dashboard
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-2">
              AI-powered risk prediction and patient management
            </p>
          </div>
          <motion.div
            className="flex items-center space-x-3 sm:space-x-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="text-right">
              <div className="text-xs sm:text-sm text-muted-foreground">Last updated</div>
              <div className="text-xs sm:text-sm font-medium text-card-foreground">
                {new Date().toLocaleTimeString()}
              </div>
            </div>
            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full gradient-success flex items-center justify-center shadow-lg">
              <Activity className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            </div>
          </motion.div>
        </motion.div>

        {/* KPI Cards */}
        <CardGrid cols={{ default: 1, sm: 2, lg: 4 }} className="mb-8 sm:mb-12 gap-4 sm:gap-6">
          <KPICard
            title="Total Patients"
            value={cohortStats?.totalPatients || 0}
            change={5.2}
            changeLabel="vs last month"
            icon={Users}
            color="blue"
            delay={0.1}
          />
          <KPICard
            title="High Risk Patients"
            value={cohortStats?.highRisk || 0}
            change={-2.1}
            changeLabel="vs last month"
            icon={AlertTriangle}
            color="red"
            delay={0.2}
          />
          <KPICard
            title="Average Risk Score"
            value={cohortStats?.averageRiskScore || 0}
            change={1.3}
            changeLabel="vs last month"
            icon={TrendingUp}
            color="orange"
            delay={0.3}
            formatValue={(val) => `${val}%`}
          />
          <KPICard
            title="Critical Patients"
            value={cohortStats?.criticalPatients || 0}
            change={0}
            changeLabel="requires attention"
            icon={Heart}
            color="purple"
            delay={0.4}
          />
        </CardGrid>

        {/* Risk Distribution and Additional Stats */}
        <ResponsiveGrid 
          cols={{ default: 1, lg: 3 }} 
          className="mb-6 sm:mb-8"
        >
          <div className="lg:col-span-2">
            <RiskHeatmap 
              data={patients.map(p => ({
                id: p.id,
                name: p.name,
                riskScore: p.riskScore,
                age: p.age,
                conditions: p.conditions
              }))}
              onPatientClick={handlePatientClick}
            />
          </div>
          
          <div className="space-y-6">
            {/* Risk Level Breakdown */}
            <motion.div
              className="bg-card rounded-2xl p-4 sm:p-6 shadow-lg border border-border"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <h3 className="text-lg font-semibold text-card-foreground mb-4">
                Risk Level Breakdown
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <span className="text-sm font-medium text-card-foreground">
                      High Risk
                    </span>
                  </div>
                  <span className="text-lg font-bold text-red-600">
                    {cohortStats?.highRisk || 0}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-orange-500" />
                    <span className="text-sm font-medium text-card-foreground">
                      Medium Risk
                    </span>
                  </div>
                  <span className="text-lg font-bold text-orange-600">
                    {cohortStats?.mediumRisk || 0}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="text-sm font-medium text-card-foreground">
                      Low Risk
                    </span>
                  </div>
                  <span className="text-lg font-bold text-green-600">
                    {cohortStats?.lowRisk || 0}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Top Conditions */}
            <motion.div
              className="bg-card rounded-2xl p-4 sm:p-6 shadow-lg border border-border"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <h3 className="text-lg font-semibold text-card-foreground mb-4">
                Top Conditions
              </h3>
              <div className="space-y-3">
                {cohortStats?.topConditions?.slice(0, 5).map((condition) => (
                  <div key={condition.condition} className="flex items-center justify-between">
                    <span className="text-sm text-card-foreground truncate">
                      {condition.condition}
                    </span>
                    <div className="flex items-center space-x-2 ml-2">
                      <div className="w-12 sm:w-16 bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${condition.percentage}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-card-foreground w-8 text-right">
                        {condition.percentage}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </ResponsiveGrid>

        {/* Patient Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
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