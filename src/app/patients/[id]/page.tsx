"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import { 
  ArrowLeft, 
  Heart, 
  Activity, 
  Calendar,
  Phone,
  Mail,
  MapPin,
  TrendingUp,
  TrendingDown,
  Stethoscope,
  Pill,
  FileText,
  Clock
} from "lucide-react"
import Link from "next/link"
import { Patient } from "@/types/patient"
import { generateSamplePatients } from "@/lib/sample-data"
import { cn, getRiskColor, getRiskBgColor, formatDate, formatDateTime } from "@/lib/utils"

export default function PatientDetail() {
  const params = useParams()
  const [patient, setPatient] = useState<Patient | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    const patients = generateSamplePatients()
    const foundPatient = patients.find(p => p.id === params.id)
    setPatient(foundPatient || null)
    setLoading(false)
  }, [params.id])

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse" />
            <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse" />
          </div>
          <div className="space-y-6">
            <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse" />
            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse" />
          </div>
        </div>
      </div>
    )
  }

  if (!patient) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Patient Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          The requested patient could not be found.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Link>
      </div>
    )
  }

  const tabs = [
    { id: "overview", label: "Overview", icon: Activity },
    { id: "vitals", label: "Vitals & Labs", icon: Heart },
    { id: "medications", label: "Medications", icon: Pill },
    { id: "history", label: "History", icon: FileText },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center space-x-4">
          <Link
            href="/"
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {patient.name}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {patient.mrn} • {patient.age} years old • {patient.gender}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className={cn(
            "px-4 py-2 rounded-full text-sm font-medium",
            patient.status === "Critical" && "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300",
            patient.status === "Active" && "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300",
            patient.status === "Inactive" && "bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-300"
          )}>
            {patient.status}
          </div>
          <div className={cn(
            "px-4 py-2 rounded-full text-sm font-medium",
            getRiskBgColor(patient.riskScore),
            "text-white"
          )}>
            {patient.riskScore}% Risk
          </div>
        </div>
      </motion.div>

      {/* Risk Score Display */}
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Risk Assessment
          </h2>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Last updated: {formatDateTime(patient.labResults.lastUpdated)}
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Risk Score Gauge */}
          <div className="flex flex-col items-center">
            <div className="relative w-32 h-32 mb-4">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-gray-200 dark:text-gray-700"
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  className={cn(
                    "transition-colors",
                    patient.riskScore >= 70 ? "text-red-500" : 
                    patient.riskScore >= 40 ? "text-orange-500" : "text-green-500"
                  )}
                  strokeDasharray={`${2 * Math.PI * 40}`}
                  strokeDashoffset={`${2 * Math.PI * 40 * (1 - patient.riskScore / 100)}`}
                  initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 40 * (1 - patient.riskScore / 100) }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="text-2xl font-bold"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                >
                  {patient.riskScore}%
                </motion.div>
              </div>
            </div>
            <div className="text-center">
              <div className={cn(
                "text-lg font-semibold",
                getRiskColor(patient.riskScore)
              )}>
                {patient.riskLevel} Risk
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                90-day prediction
              </div>
            </div>
          </div>

          {/* Risk Factors */}
          <div className="space-y-3">
            <h3 className="font-medium text-gray-900 dark:text-white">Top Risk Factors</h3>
            {patient.riskFactors.slice(0, 3).map((factor, index) => (
              <motion.div
                key={factor.id}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.3 }}
              >
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {factor.name}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {factor.category}
                  </div>
                </div>
                <div className="text-right">
                  <div className={cn(
                    "text-sm font-medium",
                    factor.severity === "High" ? "text-red-600" :
                    factor.severity === "Medium" ? "text-orange-600" : "text-green-600"
                  )}>
                    {factor.impact}%
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {factor.severity}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="space-y-3">
            <h3 className="font-medium text-gray-900 dark:text-white">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full p-3 text-left bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm font-medium">Schedule Follow-up</span>
                </div>
              </button>
              <button className="w-full p-3 text-left bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors">
                <div className="flex items-center space-x-2">
                  <Stethoscope className="h-4 w-4" />
                  <span className="text-sm font-medium">Order Labs</span>
                </div>
              </button>
              <button className="w-full p-3 text-left bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
                <div className="flex items-center space-x-2">
                  <Pill className="h-4 w-4" />
                  <span className="text-sm font-medium">Adjust Medications</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors",
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600 dark:text-blue-400"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                )}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Demographics */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Demographics
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {patient.demographics.phone}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {patient.demographics.email}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {patient.demographics.address}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-medium">Insurance:</span> {patient.demographics.insurance}
                  </div>
                </div>
              </div>

              {/* Conditions */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Current Conditions
                </h3>
                <div className="flex flex-wrap gap-2">
                  {patient.conditions.map((condition, index) => (
                    <motion.span
                      key={condition}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                    >
                      {condition}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "vitals" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Vital Signs & Lab Results
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Vitals */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900 dark:text-white">Vital Signs</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Blood Pressure</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {patient.vitals.bloodPressure.systolic}/{patient.vitals.bloodPressure.diastolic}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Heart Rate</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {patient.vitals.heartRate} bpm
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <span className="text-sm text-gray-600 dark:text-gray-400">BMI</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {patient.vitals.bmi.toFixed(1)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Temperature</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {patient.vitals.temperature.toFixed(1)}°C
                      </span>
                    </div>
                  </div>
                </div>

                {/* Lab Results */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900 dark:text-white">Lab Results</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Glucose</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {patient.labResults.glucose} mg/dL
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <span className="text-sm text-gray-600 dark:text-gray-400">HbA1c</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {patient.labResults.hba1c.toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Total Cholesterol</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {patient.labResults.cholesterol.total} mg/dL
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <span className="text-sm text-gray-600 dark:text-gray-400">eGFR</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {patient.labResults.egfr.toFixed(1)} mL/min/1.73m²
                      </span>
                    </div>
                  </div>
                </div>

                {/* Trends */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900 dark:text-white">Recent Trends</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <span className="text-sm text-green-700 dark:text-green-300">Weight</span>
                      <div className="flex items-center space-x-1">
                        <TrendingDown className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium text-green-700 dark:text-green-300">-2.3 lbs</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <span className="text-sm text-red-700 dark:text-red-300">Blood Pressure</span>
                      <div className="flex items-center space-x-1">
                        <TrendingUp className="h-4 w-4 text-red-600" />
                        <span className="text-sm font-medium text-red-700 dark:text-red-300">+5 mmHg</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                      <span className="text-sm text-orange-700 dark:text-orange-300">HbA1c</span>
                      <div className="flex items-center space-x-1">
                        <TrendingUp className="h-4 w-4 text-orange-600" />
                        <span className="text-sm font-medium text-orange-700 dark:text-orange-300">+0.2%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "medications" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Current Medications
              </h3>
              <div className="space-y-3">
                {patient.medications.map((medication, index) => (
                  <motion.div
                    key={medication.id}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 dark:text-white">
                        {medication.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {medication.dosage} • {medication.frequency}
                      </div>
                      <div className="text-xs text-gray-400 dark:text-gray-500">
                        Started: {formatDate(medication.startDate)}
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={cn(
                        "px-2 py-1 rounded-full text-xs font-medium",
                        medication.status === "Active" && "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300",
                        medication.status === "Discontinued" && "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300",
                        medication.status === "On Hold" && "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300"
                      )}>
                        {medication.status}
                      </span>
                      <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded-full text-xs font-medium">
                        {medication.category}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "history" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Historical Data
              </h3>
              <div className="space-y-4">
                {patient.historicalData.slice(-6).reverse().map((dataPoint, index) => (
                  <motion.div
                    key={dataPoint.date}
                    className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {formatDate(dataPoint.date)}
                      </span>
                      <div className={cn(
                        "px-2 py-1 rounded-full text-xs font-medium",
                        getRiskBgColor(dataPoint.riskScore),
                        "text-white"
                      )}>
                        {dataPoint.riskScore}% Risk
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Weight:</span>
                        <span className="ml-2 font-medium text-gray-900 dark:text-white">
                          {dataPoint.vitals.weight.toFixed(1)} kg
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">BP:</span>
                        <span className="ml-2 font-medium text-gray-900 dark:text-white">
                          {dataPoint.vitals.bloodPressure.systolic}/{dataPoint.vitals.bloodPressure.diastolic}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Glucose:</span>
                        <span className="ml-2 font-medium text-gray-900 dark:text-white">
                          {dataPoint.labResults.glucose} mg/dL
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
