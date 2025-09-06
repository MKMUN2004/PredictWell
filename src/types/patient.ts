export interface Patient {
  id: string
  name: string
  age: number
  gender: 'Male' | 'Female' | 'Other'
  dateOfBirth: string
  mrn: string
  riskScore: number
  riskLevel: 'Low' | 'Medium' | 'High'
  conditions: string[]
  lastVisit: string
  nextAppointment?: string
  provider: string
  status: 'Active' | 'Inactive' | 'Critical'
  demographics: {
    ethnicity: string
    insurance: string
    address: string
    phone: string
    email: string
  }
  vitals: {
    height: number // cm
    weight: number // kg
    bmi: number
    bloodPressure: {
      systolic: number
      diastolic: number
    }
    heartRate: number
    temperature: number
    oxygenSaturation: number
  }
  labResults: {
    glucose: number
    hba1c: number
    cholesterol: {
      total: number
      ldl: number
      hdl: number
    }
    creatinine: number
    egfr: number
    lastUpdated: string
  }
  medications: Medication[]
  riskFactors: RiskFactor[]
  historicalData: HistoricalDataPoint[]
}

export interface Medication {
  id: string
  name: string
  dosage: string
  frequency: string
  startDate: string
  status: 'Active' | 'Discontinued' | 'On Hold'
  category: string
}

export interface RiskFactor {
  id: string
  name: string
  category: 'Lifestyle' | 'Medical' | 'Genetic' | 'Environmental'
  severity: 'Low' | 'Medium' | 'High'
  impact: number // 0-100
  lastAssessed: string
  description: string
}

export interface HistoricalDataPoint {
  date: string
  riskScore: number
  vitals: {
    weight: number
    bloodPressure: {
      systolic: number
      diastolic: number
    }
    heartRate: number
  }
  labResults: {
    glucose: number
    hba1c: number
    cholesterol: {
      total: number
      ldl: number
      hdl: number
    }
  }
  medications: string[]
  conditions: string[]
}

export interface CohortStats {
  totalPatients: number
  highRisk: number
  mediumRisk: number
  lowRisk: number
  averageRiskScore: number
  newPatientsThisMonth: number
  criticalPatients: number
  averageAge: number
  topConditions: Array<{
    condition: string
    count: number
    percentage: number
  }>
}

export interface ModelPerformance {
  accuracy: number
  precision: number
  recall: number
  f1Score: number
  auc: number
  confusionMatrix: {
    truePositives: number
    falsePositives: number
    trueNegatives: number
    falseNegatives: number
  }
  featureImportance: Array<{
    feature: string
    importance: number
    category: string
  }>
  rocCurve: Array<{
    threshold: number
    sensitivity: number
    specificity: number
  }>
}
