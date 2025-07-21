"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Search, Users, Phone, MapPin } from "lucide-react"
import type { Patient } from "@/app/page"

interface AdminDashboardProps {
  patients: Patient[]
  onBack: () => void
}

export function AdminDashboard({ patients, onBack }: AdminDashboardProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredPatients = patients.filter(
    (patient) =>
      patient.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.mobileNumber.includes(searchTerm) ||
      patient.city.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">Patient Dashboard</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-600" />
            All Registered Patients ({patients.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by name, mobile number, or city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {filteredPatients.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              {patients.length === 0 ? (
                <div>
                  <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No patients registered yet.</p>
                  <p className="text-sm">Start by registering your first patient.</p>
                </div>
              ) : (
                <div>
                  <Search className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No patients found matching your search.</p>
                  <p className="text-sm">Try a different search term.</p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredPatients.map((patient) => (
                <Card key={patient.id} className="border border-gray-200">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900">{patient.fullName}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                            <span>{patient.age} years</span>
                            <Badge variant="secondary" className="text-xs">
                              {patient.gender}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right text-sm text-gray-500">
                          {patient.registeredAt.toLocaleDateString()}
                        </div>
                      </div>

                      <div className="grid gap-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <span className="font-medium">{patient.mobileNumber}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span>{patient.city}</span>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-3 rounded-md">
                        <p className="text-sm font-medium text-gray-700 mb-1">Health Issue:</p>
                        <p className="text-sm text-gray-600">{patient.healthIssue}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
