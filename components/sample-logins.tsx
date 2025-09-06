"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Copy, User, GraduationCap } from "lucide-react"
import { useState } from "react"

interface LoginCredential {
  role: "student" | "teacher"
  email: string
  password: string
  name: string
  school: string
  points?: number
  subjects?: string[]
}

const sampleCredentials: LoginCredential[] = [
  {
    role: "student",
    email: "emma.johnson@greenvalley.edu",
    password: "EcoWarrior2025!",
    name: "Emma Johnson",
    school: "Green Valley High",
    points: 1500,
  },
  {
    role: "student",
    email: "alex.martinez@ecoacademy.edu",
    password: "SavePlanet123",
    name: "Alex Martinez",
    school: "Eco Academy",
    points: 1350,
  },
  {
    role: "teacher",
    email: "dr.sarah.green@greenvalley.edu",
    password: "TeachGreen2025",
    name: "Dr. Sarah Green",
    school: "Green Valley High",
    subjects: ["Environmental Science", "Biology"],
  },
  {
    role: "teacher",
    email: "prof.mike.earth@ecoacademy.edu",
    password: "EcoEducator456",
    name: "Prof. Mike Earth",
    school: "Eco Academy",
    subjects: ["Geography", "Sustainability Studies"],
  },
]

export default function SampleLogins() {
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Sample Login Credentials</h2>
        <p className="text-gray-600">Use these demo accounts to explore the platform</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sampleCredentials.map((credential, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  {credential.role === "student" ? (
                    <User className="h-5 w-5 text-blue-600" />
                  ) : (
                    <GraduationCap className="h-5 w-5 text-purple-600" />
                  )}
                  {credential.name}
                </CardTitle>
                <Badge
                  variant={credential.role === "student" ? "default" : "secondary"}
                  className={
                    credential.role === "student" ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"
                  }
                >
                  {credential.role}
                </Badge>
              </div>
              <CardDescription>
                {credential.school}
                {credential.points && ` • ${credential.points} eco-points`}
                {credential.subjects && ` • ${credential.subjects.join(", ")}`}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Email</p>
                    <p className="text-sm text-gray-900 font-mono">{credential.email}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(credential.email, `email-${index}`)}
                    className="h-8 w-8 p-0"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Password</p>
                    <p className="text-sm text-gray-900 font-mono">{credential.password}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(credential.password, `password-${index}`)}
                    className="h-8 w-8 p-0"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {copiedField === `email-${index}` && <p className="text-xs text-green-600 text-center">Email copied!</p>}
              {copiedField === `password-${index}` && (
                <p className="text-xs text-green-600 text-center">Password copied!</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">Demo Account Features:</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>
            • <strong>Students:</strong> View dashboard, complete tasks, earn badges, join events
          </li>
          <li>
            • <strong>Teachers:</strong> Manage classes, create assignments, track student progress
          </li>
          <li>• All accounts have pre-populated data for demonstration purposes</li>
          <li>• Changes made during demo will not be permanently saved</li>
        </ul>
      </div>
    </div>
  )
}
