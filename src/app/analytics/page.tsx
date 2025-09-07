"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { 
  BarChart3, 
  TrendingUp, 
  Target, 
  Activity,
  CheckCircle,
  Clock
} from "lucide-react"
import { generateModelPerformance } from "@/lib/sample-data"
import { ModelPerformance } from "@/types/patient"
import { Container, Section } from "@/components/ui/container"
import { ResponsiveGrid, CardGrid } from "@/components/ui/responsive-grid"

export default function Analytics() {
  const [modelPerformance, setModelPerformance] = useState<ModelPerformance | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      const performance = generateModelPerformance()
      setModelPerformance(performance)
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

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
          <ResponsiveGrid cols={{ default: 1, lg: 2 }}>
            <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse" />
            <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse" />
          </ResponsiveGrid>
        </Section>
      </Container>
    )
  }

  if (!modelPerformance) return null

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
              Model Performance Analytics
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              AI model performance metrics and feature importance analysis
            </p>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <Clock className="h-4 w-4" />
            <span>Last updated: {new Date().toLocaleTimeString()}</span>
          </div>
        </motion.div>

        {/* Performance Metrics */}
        <CardGrid cols={{ default: 1, sm: 2, lg: 4 }} className="mb-8">
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Accuracy</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {(modelPerformance.accuracy * 100).toFixed(1)}%
              </p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <Target className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <motion.div
                className="bg-green-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${modelPerformance.accuracy * 100}%` }}
                transition={{ delay: 0.5, duration: 1 }}
              />
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
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Precision</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {(modelPerformance.precision * 100).toFixed(1)}%
              </p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <CheckCircle className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <motion.div
                className="bg-blue-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${modelPerformance.precision * 100}%` }}
                transition={{ delay: 0.6, duration: 1 }}
              />
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
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Recall</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {(modelPerformance.recall * 100).toFixed(1)}%
              </p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <Activity className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <motion.div
                className="bg-purple-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${modelPerformance.recall * 100}%` }}
                transition={{ delay: 0.7, duration: 1 }}
              />
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
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">AUC Score</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {modelPerformance.auc.toFixed(3)}
              </p>
            </div>
            <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
              <TrendingUp className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <motion.div
                className="bg-orange-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${modelPerformance.auc * 100}%` }}
                transition={{ delay: 0.8, duration: 1 }}
              />
            </div>
          </div>
        </motion.div>
        </CardGrid>

        {/* Charts Section */}
        <ResponsiveGrid cols={{ default: 1, lg: 2 }} className="mb-8">
        {/* Confusion Matrix */}
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Confusion Matrix
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Predicted</div>
                <div className="text-xs text-gray-500 dark:text-gray-500">High Risk | Low Risk</div>
              </div>
              <div className="space-y-2">
                <div className="text-xs text-gray-500 dark:text-gray-500 text-center">High Risk</div>
                <div className="grid grid-cols-2 gap-2">
                  <motion.div
                    className="p-4 bg-green-100 dark:bg-green-900/20 rounded-lg text-center"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.8, duration: 0.3 }}
                  >
                    <div className="text-2xl font-bold text-green-600">
                      {modelPerformance.confusionMatrix.truePositives}
                    </div>
                    <div className="text-xs text-green-600">True Positive</div>
                  </motion.div>
                  <motion.div
                    className="p-4 bg-red-100 dark:bg-red-900/20 rounded-lg text-center"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.9, duration: 0.3 }}
                  >
                    <div className="text-2xl font-bold text-red-600">
                      {modelPerformance.confusionMatrix.falseNegatives}
                    </div>
                    <div className="text-xs text-red-600">False Negative</div>
                  </motion.div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-xs text-gray-500 dark:text-gray-500 text-center">Low Risk</div>
                <div className="grid grid-cols-2 gap-2">
                  <motion.div
                    className="p-4 bg-red-100 dark:bg-red-900/20 rounded-lg text-center"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.0, duration: 0.3 }}
                  >
                    <div className="text-2xl font-bold text-red-600">
                      {modelPerformance.confusionMatrix.falsePositives}
                    </div>
                    <div className="text-xs text-red-600">False Positive</div>
                  </motion.div>
                  <motion.div
                    className="p-4 bg-green-100 dark:bg-green-900/20 rounded-lg text-center"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.1, duration: 0.3 }}
                  >
                    <div className="text-2xl font-bold text-green-600">
                      {modelPerformance.confusionMatrix.trueNegatives}
                    </div>
                    <div className="text-xs text-green-600">True Negative</div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ROC Curve */}
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            ROC Curve
          </h3>
          <div className="relative h-64">
            <svg className="w-full h-full" viewBox="0 0 400 300">
              {/* Grid */}
              <defs>
                <pattern id="grid" width="40" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 30" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-gray-200 dark:text-gray-700"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />

              {/* Axes */}
              <line x1="40" y1="260" x2="360" y2="260" stroke="currentColor" strokeWidth="2" className="text-gray-400" />
              <line x1="40" y1="40" x2="40" y2="260" stroke="currentColor" strokeWidth="2" className="text-gray-400" />

              {/* Labels */}
              <text x="200" y="290" textAnchor="middle" className="text-sm fill-gray-600 dark:fill-gray-400">False Positive Rate</text>
              <text x="20" y="150" textAnchor="middle" className="text-sm fill-gray-600 dark:fill-gray-400" transform="rotate(-90, 20, 150)">True Positive Rate</text>

              {/* ROC Curve Path */}
              <motion.path
                d="M 40 260 L 120 200 L 200 140 L 280 80 L 360 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                className="text-blue-500"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 1, duration: 2, ease: 'easeInOut' }}
              />

              {/* Random baseline */}
              <line x1="40" y1="260" x2="360" y2="40" stroke="currentColor" strokeWidth="1" strokeDasharray="5,5" className="text-gray-400" />
            </svg>
            <div className="absolute top-4 right-4 text-sm text-gray-600 dark:text-gray-400">
              AUC: 0.87
            </div>
          </div>
        </motion.div>

        </ResponsiveGrid>

        {/* Feature Importance */}
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          Feature Importance
        </h3>
        <div className="space-y-4">
              {modelPerformance.featureImportance.map((feature, index) => (
            <motion.div
              key={feature.feature}
              className="space-y-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + index * 0.1, duration: 0.3 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {feature.feature}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {feature.category}
                  </div>
                </div>
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  {(feature.importance * 100).toFixed(1)}%
                </div>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${feature.importance * 100}%` }}
                  transition={{ delay: 1 + index * 0.1, duration: 0.8, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Model Performance Summary */}
      <motion.div
        className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <BarChart3 className="h-6 w-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Model Performance Summary
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              The AI model demonstrates excellent performance with high accuracy and precision. 
              The model is particularly effective at identifying high-risk patients while minimizing false positives.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-gray-700 dark:text-gray-300">
                  High accuracy: {(modelPerformance.accuracy * 100).toFixed(1)}%
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-gray-700 dark:text-gray-300">
                  Low false positive rate: {((modelPerformance.confusionMatrix.falsePositives / (modelPerformance.confusionMatrix.falsePositives + modelPerformance.confusionMatrix.trueNegatives)) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-gray-700 dark:text-gray-300">
                  Strong AUC score: {modelPerformance.auc.toFixed(3)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      </Section>
    </Container>
  )
}
