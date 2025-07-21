"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, UserPlus, Home } from "lucide-react"
import type { Patient } from "@/app/page"

interface SuccessScreenProps {
  patient: Patient | null
  onContinue: () => void
  onRegisterAnother: () => void
}

export function SuccessScreen({ patient, onContinue, onRegisterAnother }: SuccessScreenProps) {
  if (!patient) {
    return null
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="bg-green-100 p-4 rounded-full">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Registration Successful!</h1>
        <p className="text-gray-600">Patient has been successfully registered in the system.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-center">Patient Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="font-medium text-gray-600">Full Name:</span>
              <span className="text-gray-900">{patient.fullName}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="font-medium text-gray-600">Age:</span>
              <span className="text-gray-900">{patient.age} years</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="font-medium text-gray-600">Gender:</span>
              <span className="text-gray-900">{patient.gender}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="font-medium text-gray-600">Mobile:</span>
              <span className="text-gray-900">{patient.mobileNumber}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="font-medium text-gray-600">City/Village:</span>
              <span className="text-gray-900">{patient.city}</span>
            </div>
            <div className="py-2">
              <span className="font-medium text-gray-600">Health Issue:</span>
              <p className="text-gray-900 mt-1">{patient.healthIssue}</p>
            </div>
          </div>

          <div className="text-center text-sm text-gray-500 pt-2">
            Registered on {patient.registeredAt.toLocaleDateString()} at {patient.registeredAt.toLocaleTimeString()}
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onContinue} className="flex-1 bg-transparent">
          <Home className="h-4 w-4 mr-2" />
          Back to Home
        </Button>
        <Button onClick={onRegisterAnother} className="flex-1 bg-green-600 hover:bg-green-700">
          <UserPlus className="h-4 w-4 mr-2" />
          Register Another
        </Button>
      </div>
    </div>
  )
}
