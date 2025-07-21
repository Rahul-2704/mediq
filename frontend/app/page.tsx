"use client"

import { useState } from "react"
import { PatientRegistrationForm } from "@/components/patient-registration-form"
import { SuccessScreen } from "@/components/success"
import { AdminDashboard } from "@/components/admin-dashboard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, UserPlus, Activity } from "lucide-react"

export interface Patient {
  name:string,
  mobileNumber:string
}

export default function HealthCampaignApp() {
  const [currentView, setCurrentView] = useState<"home" | "register" | "success" | "admin">("home")
  const [patients, setPatients] = useState<Patient[]>([])
  const [lastRegisteredPatient, setLastRegisteredPatient] = useState<Patient | null>(null)

  const handlePatientRegistration = (patientData:Patient) => {
    const newPatient: Patient = {
      ...patientData
    }

    setPatients((prev) => [...prev, newPatient])
    setLastRegisteredPatient(newPatient)
    setCurrentView("success")
  }

  const isMobileRegistered = (mobile: string) => {
    return patients.some((patient) => patient.mobileNumber === mobile)
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case "register":
        return (
          <PatientRegistrationForm
            onSubmit={handlePatientRegistration}
            onCancel={() => setCurrentView("home")}
            isMobileRegistered={isMobileRegistered}
          />
        )
      case "success":
        return (
          <SuccessScreen
            patient={lastRegisteredPatient}
            onContinue={() => setCurrentView("home")}
            onRegisterAnother={() => setCurrentView("register")}
          />
        )
      case "admin":
        return <AdminDashboard patients={patients} onBack={() => setCurrentView("home")} />
      default:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="bg-blue-100 p-4 rounded-full">
                  <Activity className="h-12 w-12 text-blue-600" />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Health Campaign</h1>
              <p className="text-gray-600 max-w-md mx-auto">
                Register patients quickly and efficiently during health check-up camps
              </p>
            </div>

            <div className="grid gap-4">
              <Card
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setCurrentView("register")}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-3 text-lg">
                    <UserPlus className="h-5 w-5 text-green-600" />
                    Register New Patient
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">Add a new patient to the health campaign database</p>
                </CardContent>
              </Card>

              <Card
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setCurrentView("admin")}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-3 text-lg">
                    <Users className="h-5 w-5 text-blue-600" />
                    View All Patients
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    View and search through registered patients ({patients.length} total)
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6 max-w-2xl">{renderCurrentView()}</div>
    </div>
  )
}
