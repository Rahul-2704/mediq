"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft, UserPlus } from "lucide-react"
import type { Patient } from "@/app/page"

interface PatientRegistrationFormProps {
  onSubmit: (patient: Omit<Patient, "id" | "registeredAt">) => void
  onCancel: () => void
  isMobileRegistered: (mobile: string) => boolean
}

export function PatientRegistrationForm({ onSubmit, onCancel, isMobileRegistered }: PatientRegistrationFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required"
    }

    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = "Mobile number is required"
    } else if (!/^\d{10}$/.test(formData.mobileNumber.replace(/\s/g, ""))) {
      newErrors.mobileNumber = "Please enter a valid 10-digit mobile number"
    } else if (isMobileRegistered(formData.mobileNumber)) {
      newErrors.mobileNumber = "This mobile number is already registered"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    const res=await fetch('/api',{
        method:'POST',
        body:JSON.stringify(formData),
        headers:{
            'Content-Type':'application/json'
        }
    });

    console.log('response',res.json());

    onSubmit({
      name: formData.name.trim(),
      mobileNumber: formData.mobileNumber.trim(),
    })

    setIsSubmitting(false)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={onCancel}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">Register New Patient</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-green-600" />
            Patient Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter patient's full name"
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.fullName && <p className="text-sm text-red-600">{errors.fullName}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="mobileNumber">Mobile Number *</Label>
                <Input
                  id="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={(e) => handleInputChange("mobileNumber", e.target.value)}
                  placeholder="10-digit mobile number"
                  maxLength={10}
                  className={errors.mobileNumber ? "border-red-500" : ""}
                />
                {errors.mobileNumber && <p className="text-sm text-red-600">{errors.mobileNumber}</p>}
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={onCancel} className="flex-1 bg-transparent">
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} className="flex-1 bg-green-600 hover:bg-green-700">
                {isSubmitting ? "Registering..." : "Register Patient"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
