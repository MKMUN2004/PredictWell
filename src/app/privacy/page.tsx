"use client"

import { motion } from "framer-motion"
import { AlertTriangle } from "lucide-react"
import { Container, Section } from "@/components/ui/container"

export default function Privacy() {
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
              Privacy Protection
            </h1>

            {/* Warning Box */}
            <div className="mt-4 flex items-start gap-3 rounded-lg border border-yellow-400 bg-yellow-50 p-4 dark:border-yellow-600 dark:bg-yellow-900/30">
              <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                All patients and records shown here are <span className="font-semibold">dummy data</span> created for demonstration purposes only. 
                They do not represent any real individuals.
              </p>
            </div>
          </div>
        </motion.div>
      </Section>
    </Container>
  )
}
