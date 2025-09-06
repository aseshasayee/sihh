"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Leaf, Mail, Lock, User, School, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import FloatingElements from "@/components/floating-elements"
import SampleLogins from "@/components/sample-logins"

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showSampleLogins, setShowSampleLogins] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4 relative overflow-hidden">
      <FloatingElements />

      <div className="w-full max-w-4xl relative z-10">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="p-3 bg-primary rounded-full">
              <Leaf className="h-8 w-8 text-primary-foreground" />
            </div>
            <span className="font-playfair font-bold text-3xl text-primary">ECOZY</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome back!</h1>
          <p className="text-gray-600">Continue your eco journey</p>
        </div>

        <div className="text-center mb-6">
          <Button
            variant="outline"
            onClick={() => setShowSampleLogins(!showSampleLogins)}
            className="bg-white/80 backdrop-blur-sm border-green-200 text-green-700 hover:bg-green-50"
          >
            {showSampleLogins ? "Hide" : "Show"} Demo Credentials
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Column - Sign In Form */}
          <div className="w-full max-w-md mx-auto lg:mx-0">
            <Tabs defaultValue="student" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="student" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Student
                </TabsTrigger>
                <TabsTrigger value="teacher" className="flex items-center gap-2">
                  <School className="h-4 w-4" />
                  Teacher
                </TabsTrigger>
              </TabsList>

              <TabsContent value="student">
                <Card className="backdrop-blur-sm bg-white/90 border-0 shadow-xl">
                  <CardHeader className="space-y-1">
                    <CardTitle className="text-xl">Student Sign In</CardTitle>
                    <CardDescription>Enter your credentials to access your eco dashboard</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input id="email" type="email" placeholder="student@school.edu" className="pl-10" required />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            className="pl-10 pr-10"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Signing in...
                          </div>
                        ) : (
                          "Sign In"
                        )}
                      </Button>
                    </form>

                    <div className="mt-6 text-center">
                      <p className="text-sm text-gray-600">
                        Don't have an account?{" "}
                        <Link href="/signup" className="text-primary hover:underline font-medium">
                          Sign up here
                        </Link>
                      </p>
                      <Link href="/forgot-password" className="text-sm text-gray-500 hover:text-primary mt-2 block">
                        Forgot your password?
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="teacher">
                <Card className="backdrop-blur-sm bg-white/90 border-0 shadow-xl">
                  <CardHeader className="space-y-1">
                    <CardTitle className="text-xl">Teacher Sign In</CardTitle>
                    <CardDescription>Access your classroom management dashboard</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="teacher-email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            id="teacher-email"
                            type="email"
                            placeholder="teacher@school.edu"
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="teacher-password">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            id="teacher-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            className="pl-10 pr-10"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Signing in...
                          </div>
                        ) : (
                          "Sign In"
                        )}
                      </Button>
                    </form>

                    <div className="mt-6 text-center">
                      <p className="text-sm text-gray-600">
                        New teacher?{" "}
                        <Link href="/signup" className="text-primary hover:underline font-medium">
                          Create account
                        </Link>
                      </p>
                      <Link href="/forgot-password" className="text-sm text-gray-500 hover:text-primary mt-2 block">
                        Forgot your password?
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Sample Logins */}
          {showSampleLogins && (
            <div className="w-full">
              <Card className="backdrop-blur-sm bg-white/90 border-0 shadow-xl">
                <CardContent className="p-6">
                  <SampleLogins />
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
