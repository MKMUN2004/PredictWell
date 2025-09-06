import { Patient, CohortStats, ModelPerformance, HistoricalDataPoint } from "@/types/patient"

const firstNames = [
  "James", "Mary", "John", "Patricia", "Robert", "Jennifer", "Michael", "Linda",
  "William", "Elizabeth", "David", "Barbara", "Richard", "Susan", "Joseph", "Jessica",
  "Thomas", "Sarah", "Christopher", "Karen", "Charles", "Nancy", "Daniel", "Lisa",
  "Matthew", "Betty", "Anthony", "Helen", "Mark", "Sandra", "Donald", "Donna",
  "Steven", "Carol", "Paul", "Ruth", "Andrew", "Sharon", "Joshua", "Michelle",
  "Kenneth", "Laura", "Kevin", "Sarah", "Brian", "Kimberly", "George", "Deborah"
]

const lastNames = [
  "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis",
  "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas",
  "Taylor", "Moore", "Jackson", "Martin", "Lee", "Perez", "Thompson", "White",
  "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson", "Walker", "Young",
  "Allen", "King", "Wright", "Scott", "Torres", "Nguyen", "Hill", "Flores"
]

const conditions = [
  "Type 2 Diabetes", "Hypertension", "Heart Failure", "Obesity", "Chronic Kidney Disease",
  "COPD", "Atrial Fibrillation", "Coronary Artery Disease", "Stroke", "Peripheral Artery Disease",
  "Depression", "Anxiety", "Sleep Apnea", "Hyperlipidemia", "Osteoarthritis"
]

const medications = [
  { name: "Metformin", category: "Diabetes" },
  { name: "Lisinopril", category: "Hypertension" },
  { name: "Atorvastatin", category: "Cholesterol" },
  { name: "Furosemide", category: "Heart Failure" },
  { name: "Insulin Glargine", category: "Diabetes" },
  { name: "Amlodipine", category: "Hypertension" },
  { name: "Simvastatin", category: "Cholesterol" },
  { name: "Carvedilol", category: "Heart Failure" },
  { name: "Sitagliptin", category: "Diabetes" },
  { name: "Losartan", category: "Hypertension" }
]

const riskFactors = [
  { name: "Smoking", category: "Lifestyle" as const },
  { name: "Physical Inactivity", category: "Lifestyle" as const },
  { name: "Poor Diet", category: "Lifestyle" as const },
  { name: "Family History", category: "Genetic" as const },
  { name: "Age", category: "Medical" as const },
  { name: "Obesity", category: "Medical" as const },
  { name: "High Blood Pressure", category: "Medical" as const },
  { name: "High Cholesterol", category: "Medical" as const },
  { name: "Stress", category: "Lifestyle" as const },
  { name: "Sleep Disorders", category: "Medical" as const }
]

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]
}

function getRandomElements<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

function generateRandomDate(start: Date, end: Date): string {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
  return date.toISOString().split('T')[0]
}

function generateHistoricalData(_patientId: string, _startDate: Date): HistoricalDataPoint[] {
  const data = []
  const months = 6
  const currentDate = new Date()
  
  for (let i = months; i >= 0; i--) {
    const date = new Date(currentDate)
    date.setMonth(date.getMonth() - i)
    
    // Generate realistic progression
    const baseRisk = Math.random() * 100
    const trend = (Math.random() - 0.5) * 20 // -10 to +10 change
    const riskScore = Math.max(0, Math.min(100, baseRisk + trend))
    
    data.push({
      date: date.toISOString().split('T')[0],
      riskScore: Math.round(riskScore),
      vitals: {
        weight: 70 + Math.random() * 30,
        bloodPressure: {
          systolic: 120 + Math.random() * 40,
          diastolic: 80 + Math.random() * 20
        },
        heartRate: 60 + Math.random() * 40
      },
      labResults: {
        glucose: 80 + Math.random() * 100,
        hba1c: 5.0 + Math.random() * 3,
        cholesterol: {
          total: 150 + Math.random() * 100,
          ldl: 100 + Math.random() * 80,
          hdl: 40 + Math.random() * 30
        }
      },
      medications: getRandomElements(medications, Math.floor(Math.random() * 5) + 1).map(m => m.name),
      conditions: getRandomElements(conditions, Math.floor(Math.random() * 3) + 1)
    })
  }
  
  return data
}

export function generateSamplePatients(): Patient[] {
  const patients: Patient[] = []
  
  for (let i = 0; i < 50; i++) {
    const firstName = getRandomElement(firstNames)
    const lastName = getRandomElement(lastNames)
    const age = 30 + Math.floor(Math.random() * 50)
    const gender = getRandomElement(['Male', 'Female', 'Other']) as 'Male' | 'Female' | 'Other'
    const riskScore = Math.floor(Math.random() * 100)
    const riskLevel = riskScore >= 70 ? 'High' : riskScore >= 40 ? 'Medium' : 'Low'
    
    const patientConditions = getRandomElements(conditions, Math.floor(Math.random() * 4) + 1)
    const patientMedications = getRandomElements(medications, Math.floor(Math.random() * 6) + 1)
    const patientRiskFactors = getRandomElements(riskFactors, Math.floor(Math.random() * 5) + 1)
    
    const birthDate = new Date()
    birthDate.setFullYear(birthDate.getFullYear() - age)
    
    const lastVisit = generateRandomDate(
      new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), // 90 days ago
      new Date()
    )
    
    const patient: Patient = {
      id: `patient-${i + 1}`,
      name: `${firstName} ${lastName}`,
      age,
      gender,
      dateOfBirth: birthDate.toISOString().split('T')[0],
      mrn: `MRN${String(i + 1).padStart(6, '0')}`,
      riskScore,
      riskLevel,
      conditions: patientConditions,
      lastVisit,
      nextAppointment: Math.random() > 0.3 ? generateRandomDate(new Date(), new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)) : undefined,
      provider: getRandomElement(['Dr. Smith', 'Dr. Johnson', 'Dr. Williams', 'Dr. Brown']),
      status: riskScore > 80 ? 'Critical' : riskScore > 50 ? 'Active' : 'Active',
      demographics: {
        ethnicity: getRandomElement(['Caucasian', 'African American', 'Hispanic', 'Asian', 'Other']),
        insurance: getRandomElement(['Medicare', 'Medicaid', 'Private', 'Self-Pay']),
        address: `${Math.floor(Math.random() * 9999) + 1} Main St, City, State 12345`,
        phone: `(${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@email.com`
      },
      vitals: {
        height: 150 + Math.random() * 50,
        weight: 60 + Math.random() * 40,
        bmi: 20 + Math.random() * 20,
        bloodPressure: {
          systolic: 110 + Math.random() * 40,
          diastolic: 70 + Math.random() * 20
        },
        heartRate: 60 + Math.random() * 40,
        temperature: 36.5 + Math.random() * 1.5,
        oxygenSaturation: 95 + Math.random() * 5
      },
      labResults: {
        glucose: 80 + Math.random() * 120,
        hba1c: 5.0 + Math.random() * 4,
        cholesterol: {
          total: 150 + Math.random() * 100,
          ldl: 100 + Math.random() * 80,
          hdl: 40 + Math.random() * 30
        },
        creatinine: 0.7 + Math.random() * 1.0,
        egfr: 60 + Math.random() * 40,
        lastUpdated: lastVisit
      },
      medications: patientMedications.map((med, index) => ({
        id: `med-${i}-${index}`,
        name: med.name,
        dosage: `${Math.floor(Math.random() * 500) + 50}mg`,
        frequency: getRandomElement(['Once daily', 'Twice daily', 'Three times daily', 'As needed']),
        startDate: generateRandomDate(new Date(Date.now() - 365 * 24 * 60 * 60 * 1000), new Date()),
        status: getRandomElement(['Active', 'Discontinued', 'On Hold']),
        category: med.category
      })),
      riskFactors: patientRiskFactors.map((factor, index) => ({
        id: `risk-${i}-${index}`,
        name: factor.name,
        category: factor.category,
        severity: getRandomElement(['Low', 'Medium', 'High']),
        impact: Math.floor(Math.random() * 100),
        lastAssessed: lastVisit,
        description: `Risk factor: ${factor.name}`
      })),
      historicalData: generateHistoricalData(`patient-${i + 1}`, new Date(Date.now() - 180 * 24 * 60 * 60 * 1000))
    }
    
    patients.push(patient)
  }
  
  return patients
}

export function generateCohortStats(patients: Patient[]): CohortStats {
  const totalPatients = patients.length
  const highRisk = patients.filter(p => p.riskLevel === 'High').length
  const mediumRisk = patients.filter(p => p.riskLevel === 'Medium').length
  const lowRisk = patients.filter(p => p.riskLevel === 'Low').length
  const averageRiskScore = patients.reduce((sum, p) => sum + p.riskScore, 0) / totalPatients
  const criticalPatients = patients.filter(p => p.status === 'Critical').length
  const averageAge = patients.reduce((sum, p) => sum + p.age, 0) / totalPatients
  
  // Count conditions
  const conditionCounts: Record<string, number> = {}
  patients.forEach(patient => {
    patient.conditions.forEach(condition => {
      conditionCounts[condition] = (conditionCounts[condition] || 0) + 1
    })
  })
  
  const topConditions = Object.entries(conditionCounts)
    .map(([condition, count]) => ({
      condition,
      count,
      percentage: Math.round((count / totalPatients) * 100)
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)
  
  const newPatientsThisMonth = patients.filter(p => {
    const lastVisit = new Date(p.lastVisit)
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    return lastVisit >= thirtyDaysAgo
  }).length
  
  return {
    totalPatients,
    highRisk,
    mediumRisk,
    lowRisk,
    averageRiskScore: Math.round(averageRiskScore),
    newPatientsThisMonth,
    criticalPatients,
    averageAge: Math.round(averageAge),
    topConditions
  }
}

export function generateModelPerformance(): ModelPerformance {
  return {
    accuracy: 0.89,
    precision: 0.87,
    recall: 0.91,
    f1Score: 0.89,
    auc: 0.92,
    confusionMatrix: {
      truePositives: 45,
      falsePositives: 8,
      trueNegatives: 32,
      falseNegatives: 5
    },
    featureImportance: [
      { feature: "HbA1c Level", importance: 0.23, category: "Lab Values" },
      { feature: "Blood Pressure", importance: 0.19, category: "Vitals" },
      { feature: "BMI", importance: 0.16, category: "Vitals" },
      { feature: "Age", importance: 0.14, category: "Demographics" },
      { feature: "Cholesterol", importance: 0.12, category: "Lab Values" },
      { feature: "Medication Adherence", importance: 0.08, category: "Behavioral" },
      { feature: "Exercise Frequency", importance: 0.05, category: "Lifestyle" },
      { feature: "Sleep Quality", importance: 0.03, category: "Lifestyle" }
    ],
    rocCurve: Array.from({ length: 20 }, (_, i) => ({
      threshold: i / 19,
      sensitivity: 1 - (i / 19),
      specificity: i / 19
    }))
  }
}
