"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Leaf, Mail, Lock, User, School, Eye, EyeOff, GraduationCap, Sparkles, Trophy, Target, AlertCircle } from "lucide-react"
import Link from "next/link"
import FloatingElements from "@/components/floating-elements"

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    school: '',
    grade: ''
  })

  const { signUp } = useAuth()
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
    if (error) setError(null)
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (error) setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!agreedToTerms) {
      setError('Please agree to the terms and conditions')
      return
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long')
      return
    }

    setIsLoading(true)
    setError(null)
    
    try {
      const { error } = await signUp(formData.email, formData.password, {
        full_name: formData.fullName,
        school: formData.school,
        grade: formData.grade,
        role: 'student'
      })
      
      if (error) {
        setError(error.message)
      } else {
        // Redirect to dashboard on successful signup
        router.push('/?tab=dashboard')
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4 relative overflow-hidden">
      <FloatingElements />

      <div className="absolute top-10 left-10 w-32 h-32 bg-green-200 rounded-full opacity-10 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-emerald-200 rounded-full opacity-10 blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-teal-200 rounded-full opacity-10 blur-2xl animate-pulse delay-500"></div>

      <div className="w-full max-w-5xl relative z-10">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="p-3 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full shadow-lg">
              <Leaf className="h-8 w-8 text-white" />
            </div>
            <span className="font-playfair font-bold text-3xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              ECOZY
            </span>
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 text-balance">Join the movement!</h1>
          <p className="text-lg text-gray-600 mb-6">Start your eco-friendly journey today and make a real impact</p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge variant="secondary" className="bg-green-100 text-green-800 px-4 py-2">
              <Trophy className="w-4 h-4 mr-2" />
              Earn Badges
            </Badge>
            <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 px-4 py-2">
              <Target className="w-4 h-4 mr-2" />
              Complete Challenges
            </Badge>
            <Badge variant="secondary" className="bg-teal-100 text-teal-800 px-4 py-2">
              <Sparkles className="w-4 h-4 mr-2" />
              Make Impact
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Column - Benefits */}
          <div className="hidden lg:block space-y-6">
            <Card className="backdrop-blur-sm bg-white/80 border-green-100 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg text-green-700">🌱 For Students</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Track your eco-impact</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Compete with classmates</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Earn eco-badges</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Join local events</span>
                </div>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-sm bg-white/80 border-purple-100 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg text-purple-700">👩‍🏫 For Teachers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm">Manage your classroom</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm">Create eco-challenges</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm">Track student progress</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm">Access teaching resources</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Center Column - Registration Form */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="student" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 bg-white/80 backdrop-blur-sm">
                <TabsTrigger
                  value="student"
                  className="flex items-center gap-2 data-[state=active]:bg-green-100 data-[state=active]:text-green-700"
                >
                  <GraduationCap className="h-4 w-4" />
                  Student
                </TabsTrigger>
                <TabsTrigger
                  value="teacher"
                  className="flex items-center gap-2 data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700"
                >
                  <School className="h-4 w-4" />
                  Teacher
                </TabsTrigger>
              </TabsList>

              <TabsContent value="student">
                <Card className="backdrop-blur-sm bg-white/95 border-0 shadow-2xl">
                  <CardHeader className="space-y-1 bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg">
                    <CardTitle className="text-xl text-green-800">Student Registration</CardTitle>
                    <CardDescription className="text-green-600">
                      Create your account to start earning eco-points and making a difference
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    {error && (
                      <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center gap-2 text-red-700">
                        <AlertCircle className="h-4 w-4" />
                        <span className="text-sm">{error}</span>
                      </div>
                    )}
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            id="fullName"
                            name="fullName"
                            placeholder="John Doe"
                            className="pl-10 border-green-200 focus:border-green-400"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="student@school.edu"
                            className="pl-10 border-green-200 focus:border-green-400"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="school">School</Label>
                          <Select 
                            value={formData.school} 
                            onValueChange={(value) => handleSelectChange('school', value)}
                            required
                          >
                            <SelectTrigger className="border-green-200 focus:border-green-400">
                              <SelectValue placeholder="Select your school" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="green-valley">Green Valley High School</SelectItem>
                              <SelectItem value="eco-academy">Eco Academy</SelectItem>
                              <SelectItem value="sustainability-school">Sustainability School</SelectItem>
                              <SelectItem value="nature-institute">Nature Institute</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="grade">Grade Level</Label>
                          <Select 
                            value={formData.grade} 
                            onValueChange={(value) => handleSelectChange('grade', value)}
                            required
                          >
                            <SelectTrigger className="border-green-200 focus:border-green-400">
                              <SelectValue placeholder="Select your grade" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="9">9th Grade</SelectItem>
                              <SelectItem value="10">10th Grade</SelectItem>
                              <SelectItem value="11">11th Grade</SelectItem>
                              <SelectItem value="12">12th Grade</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="password">Password</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                              id="password"
                              name="password"
                              type={showPassword ? "text" : "password"}
                              placeholder="Create a strong password"
                              className="pl-10 pr-10 border-green-200 focus:border-green-400"
                              value={formData.password}
                              onChange={handleInputChange}
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

                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword">Confirm Password</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                              id="confirmPassword"
                              name="confirmPassword"
                              type={showConfirmPassword ? "text" : "password"}
                              placeholder="Confirm your password"
                              className="pl-10 pr-10 border-green-200 focus:border-green-400"
                              value={formData.confirmPassword}
                              onChange={handleInputChange}
                              required
                            />
                            <button
                              type="button"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="terms"
                          checked={agreedToTerms}
                          onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                        />
                        <Label htmlFor="terms" className="text-sm">
                          I agree to the{" "}
                          <Link href="/terms" className="text-green-600 hover:underline font-medium">
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link href="/privacy" className="text-green-600 hover:underline font-medium">
                            Privacy Policy
                          </Link>
                        </Label>
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                        disabled={isLoading || !agreedToTerms}
                      >
                        {isLoading ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Creating account...
                          </div>
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4 mr-2" />
                            Start Your Eco Journey
                          </>
                        )}
                      </Button>
                    </form>

                    <div className="mt-6 text-center">
                      <p className="text-sm text-gray-600">
                        Already have an account?{" "}
                        <Link href="/signin" className="text-green-600 hover:underline font-medium">
                          Sign in here
                        </Link>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="teacher">
                <Card className="backdrop-blur-sm bg-white/95 border-0 shadow-2xl">
                  <CardHeader className="space-y-1 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-t-lg">
                    <CardTitle className="text-xl text-purple-800">Teacher Registration</CardTitle>
                    <CardDescription className="text-purple-600">
                      Join as an educator to inspire and manage your eco-classroom
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="teacherFirstName">First Name</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                              id="teacherFirstName"
                              placeholder="Jane"
                              className="pl-10 border-purple-200 focus:border-purple-400"
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="teacherLastName">Last Name</Label>
                          <Input
                            id="teacherLastName"
                            placeholder="Smith"
                            className="border-purple-200 focus:border-purple-400"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="teacherEmail">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            id="teacherEmail"
                            type="email"
                            placeholder="teacher@school.edu"
                            className="pl-10 border-purple-200 focus:border-purple-400"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="teacherSchool">School</Label>
                          <Select required>
                            <SelectTrigger className="border-purple-200 focus:border-purple-400">
                              <SelectValue placeholder="Select your school" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="green-valley">Green Valley High School</SelectItem>
                              <SelectItem value="eco-academy">Eco Academy</SelectItem>
                              <SelectItem value="sustainability-school">Sustainability School</SelectItem>
                              <SelectItem value="nature-institute">Nature Institute</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="subject">Subject Area</Label>
                          <Select required>
                            <SelectTrigger className="border-purple-200 focus:border-purple-400">
                              <SelectValue placeholder="Select your subject" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="environmental-science">Environmental Science</SelectItem>
                              <SelectItem value="biology">Biology</SelectItem>
                              <SelectItem value="chemistry">Chemistry</SelectItem>
                              <SelectItem value="geography">Geography</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="teacherPassword">Password</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                              id="teacherPassword"
                              type={showPassword ? "text" : "password"}
                              placeholder="Create a strong password"
                              className="pl-10 pr-10 border-purple-200 focus:border-purple-400"
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

                        <div className="space-y-2">
                          <Label htmlFor="teacherConfirmPassword">Confirm Password</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                              id="teacherConfirmPassword"
                              type={showConfirmPassword ? "text" : "password"}
                              placeholder="Confirm your password"
                              className="pl-10 pr-10 border-purple-200 focus:border-purple-400"
                              required
                            />
                            <button
                              type="button"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="teacherTerms"
                          checked={agreedToTerms}
                          onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                        />
                        <Label htmlFor="teacherTerms" className="text-sm">
                          I agree to the{" "}
                          <Link href="/terms" className="text-purple-600 hover:underline font-medium">
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link href="/privacy" className="text-purple-600 hover:underline font-medium">
                            Privacy Policy
                          </Link>
                        </Label>
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                        disabled={isLoading || !agreedToTerms}
                      >
                        {isLoading ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Creating account...
                          </div>
                        ) : (
                          <>
                            <School className="w-4 h-4 mr-2" />
                            Join as Educator
                          </>
                        )}
                      </Button>
                    </form>

                    <div className="mt-6 text-center">
                      <p className="text-sm text-gray-600">
                        Already have an account?{" "}
                        <Link href="/signin" className="text-purple-600 hover:underline font-medium">
                          Sign in here
                        </Link>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
