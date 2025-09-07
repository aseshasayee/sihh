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
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { 
  Leaf, 
  Mail, 
  Lock, 
  User, 
  School, 
  Eye, 
  EyeOff, 
  GraduationCap, 
  Sparkles, 
  Trophy, 
  Target, 
  AlertCircle,
  ArrowRight,
  ChevronLeft,
  ChevronRight
} from "lucide-react"
import Link from "next/link"
import FloatingElements from "@/components/floating-elements"

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [userType, setUserType] = useState<'student' | 'teacher'>('student')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const [signInData, setSignInData] = useState({
    email: '',
    password: ''
  })

  const [signUpData, setSignUpData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    school: '',
    grade: '',
    subject: ''
  })

  const { signIn, signUp } = useAuth()
  const router = useRouter()

  const handleSignInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignInData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
    if (error) setError(null)
  }

  const handleSignUpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
    if (error) setError(null)
  }

  const handleSelectChange = (name: string, value: string) => {
    setSignUpData(prev => ({
      ...prev,
      [name]: value
    }))
    if (error) setError(null)
  }

  const handleSignInSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    
    try {
      const result = await signIn(signInData.email, signInData.password)
      
      if (result && typeof result === 'object' && 'error' in result && result.error) {
        setError(typeof result.error === 'string' ? result.error : 'Authentication failed')
      } else {
        router.push('/?tab=dashboard')
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!agreedToTerms) {
      setError('Please agree to the terms and conditions')
      return
    }
    if (signUpData.password !== signUpData.confirmPassword) {
      setError('Passwords do not match')
      return
    }
    if (signUpData.password.length < 6) {
      setError('Password must be at least 6 characters long')
      return
    }

    setIsLoading(true)
    setError(null)
    
    try {
      const metadata = {
        full_name: signUpData.fullName,
        school: signUpData.school,
        role: userType,
        ...(userType === 'student' ? { grade: signUpData.grade } : { subject: signUpData.subject })
      }

      const result = await signUp(signUpData.email, signUpData.password, metadata)
      
      if (result && typeof result === 'object' && 'error' in result && result.error) {
        setError(typeof result.error === 'string' ? result.error : 'Registration failed')
      } else {
        router.push('/?tab=dashboard')
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const switchMode = () => {
    setIsSignUp(!isSignUp)
    setError(null)
    setSignInData({ email: '', password: '' })
    setSignUpData({
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      school: '',
      grade: '',
      subject: ''
    })
    setAgreedToTerms(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative overflow-hidden">
      <FloatingElements />
      
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-200 to-emerald-200 rounded-full opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-teal-200 to-cyan-200 rounded-full opacity-20 blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-emerald-200 to-green-200 rounded-full opacity-10 blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 min-h-screen flex">
        {/* Left Panel - Info/Welcome */}
        <div className={`
          absolute inset-y-0 left-0 w-full lg:w-1/2 
          transform transition-all duration-700 ease-in-out will-change-transform
          ${isSignUp ? 'lg:translate-x-full' : 'lg:translate-x-0'}
          flex items-center justify-center p-6 lg:p-12
        `}>
          <div className="max-w-lg text-center lg:text-left relative">
            <Link href="/" className="inline-flex items-center space-x-3 mb-12 lg:mb-16">
              <div className="p-3 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl shadow-xl">
                <Leaf className="h-10 w-10 text-white" />
              </div>
              <span className="font-playfair font-bold text-4xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                ECOZY
              </span>
            </Link>

            {/* Sign In Content */}
            <div className={`
              transform transition-all duration-500 ease-out
              ${isSignUp ? 'opacity-0 translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'}
            `}>
              <h1 className="text-3xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-8 leading-tight">
                Welcome back to your
                <span className="block bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  eco journey
                </span>
              </h1>
              <p className="text-lg lg:text-xl text-gray-600 mb-10 lg:mb-12 leading-relaxed max-w-md">
                Continue making a positive impact on our planet. Track your progress, earn badges, and inspire others.
              </p>
              <div className="flex flex-wrap gap-3 lg:gap-4 justify-center lg:justify-start">
                <Badge variant="secondary" className="bg-green-100 text-green-800 px-5 py-3 text-sm font-medium rounded-full">
                  <Trophy className="w-4 h-4 mr-2" />
                  Achievements
                </Badge>
                <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 px-5 py-3 text-sm font-medium rounded-full">
                  <Target className="w-4 h-4 mr-2" />
                  Challenges
                </Badge>
                <Badge variant="secondary" className="bg-teal-100 text-teal-800 px-5 py-3 text-sm font-medium rounded-full">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Impact
                </Badge>
              </div>
            </div>

            {/* Sign Up Content */}
            <div className={`
              transform transition-all duration-500 ease-out
              ${!isSignUp ? 'opacity-0 translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'}
            `}>
              <h1 className="text-3xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-8 leading-tight">
                Start your
                <span className="block bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  eco adventure
                </span>
              </h1>
              <p className="text-lg lg:text-xl text-gray-600 mb-12 leading-relaxed max-w-lg">
                Join thousands of students and teachers making a real difference. Every small action creates lasting change.
              </p>
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex-shrink-0"></div>
                  <span className="text-gray-700 text-lg">Track your environmental impact</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex-shrink-0"></div>
                  <span className="text-gray-700 text-lg">Compete with friends and classmates</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex-shrink-0"></div>
                  <span className="text-gray-700 text-lg">Earn badges and rewards</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex-shrink-0"></div>
                  <span className="text-gray-700 text-lg">Join local sustainability events</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Auth Forms */}
        <div className={`
          absolute inset-y-0 right-0 w-full lg:w-1/2
          transform transition-all duration-700 ease-in-out will-change-transform
          ${isSignUp ? 'lg:-translate-x-full' : 'lg:translate-x-0'}
          flex items-center justify-center p-6 lg:p-12
        `}>
          <div className="w-full max-w-lg">
            {/* Mobile header */}
            <div className="lg:hidden mb-8 text-center">
              <Link href="/" className="inline-flex items-center space-x-2 mb-6">
                <div className="p-2 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl">
                  <Leaf className="h-6 w-6 text-white" />
                </div>
                <span className="font-playfair font-bold text-2xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  ECOZY
                </span>
              </Link>
            </div>

            <Card className="backdrop-blur-sm bg-white/95 border-0 shadow-2xl overflow-hidden rounded-3xl">
              {/* Sign In Form */}
              <div className={`
                transform transition-all duration-500 ease-out
                ${isSignUp ? 'opacity-0 translate-x-8 pointer-events-none' : 'opacity-100 translate-x-0'}
              `}>
                <CardHeader className="space-y-2 bg-gradient-to-r from-green-50 to-emerald-50 px-8 py-8">
                  <CardTitle className="text-2xl lg:text-3xl text-green-800 font-bold">Welcome back</CardTitle>
                  <CardDescription className="text-green-600 text-base">
                    Sign in to continue your eco journey
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  {/* User Type Selector */}
                  <div className="flex gap-3 mb-8">
                    <Button
                      type="button"
                      variant={userType === 'student' ? 'default' : 'outline'}
                      size="default"
                      onClick={() => setUserType('student')}
                      className={`flex-1 py-3 rounded-xl font-medium ${userType === 'student' ? 'bg-green-600 hover:bg-green-700 text-white' : 'border-green-200 text-green-700 hover:bg-green-50'}`}
                    >
                      <GraduationCap className="w-5 h-5 mr-2" />
                      Student
                    </Button>
                    <Button
                      type="button"
                      variant={userType === 'teacher' ? 'default' : 'outline'}
                      size="default"
                      onClick={() => setUserType('teacher')}
                      className={`flex-1 py-3 rounded-xl font-medium ${userType === 'teacher' ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'border-purple-200 text-purple-700 hover:bg-purple-50'}`}
                    >
                      <School className="w-5 h-5 mr-2" />
                      Teacher
                    </Button>
                  </div>

                  {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700">
                      <AlertCircle className="h-5 w-5 flex-shrink-0" />
                      <span className="text-sm font-medium">{error}</span>
                    </div>
                  )}

                  <form onSubmit={handleSignInSubmit} className="space-y-6">
                    <div className="space-y-3">
                      <Label htmlFor="signin-email" className="text-base font-medium text-gray-700">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          id="signin-email"
                          name="email"
                          type="email"
                          placeholder={userType === 'student' ? 'student@school.edu' : 'teacher@school.edu'}
                          className="pl-12 h-12 text-base border-gray-200 focus:border-green-400 focus:ring-green-400 rounded-xl"
                          value={signInData.email}
                          onChange={handleSignInChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="signin-password" className="text-base font-medium text-gray-700">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          id="signin-password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          className="pl-12 pr-12 h-12 text-base border-gray-200 focus:border-green-400 focus:ring-green-400 rounded-xl"
                          value={signInData.password}
                          onChange={handleSignInChange}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-12 text-base font-semibold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] rounded-xl"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Signing in...
                        </div>
                      ) : (
                        <>
                          Sign In
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </>
                      )}
                    </Button>
                  </form>

                  <div className="mt-8 text-center space-y-3">
                    <p className="text-base text-gray-600">
                      Don't have an account?{" "}
                      <button
                        onClick={switchMode}
                        className="text-green-600 hover:text-green-700 font-semibold hover:underline transition-colors"
                      >
                        Sign up here
                      </button>
                    </p>
                    <Link href="/forgot-password" className="text-sm text-gray-500 hover:text-green-600 block transition-colors">
                      Forgot your password?
                    </Link>
                  </div>
                </CardContent>
              </div>

              {/* Sign Up Form */}
              <div className={`
                absolute inset-0 transform transition-all duration-500 ease-out
                ${!isSignUp ? 'opacity-0 -translate-x-8 pointer-events-none' : 'opacity-100 translate-x-0'}
              `}>
                <CardHeader className="space-y-1 bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4">
                  <CardTitle className="text-xl text-green-800 font-bold">Join the movement</CardTitle>
                  <CardDescription className="text-green-600 text-sm">
                    Create your account to start making an impact
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 h-[calc(100vh-280px)] overflow-hidden">
                  {/* User Type Selector */}
                  <div className="flex gap-2 mb-4">
                    <Button
                      type="button"
                      variant={userType === 'student' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setUserType('student')}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium ${userType === 'student' ? 'bg-green-600 hover:bg-green-700 text-white' : 'border-green-200 text-green-700 hover:bg-green-50'}`}
                    >
                      <GraduationCap className="w-4 h-4 mr-1" />
                      Student
                    </Button>
                    <Button
                      type="button"
                      variant={userType === 'teacher' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setUserType('teacher')}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium ${userType === 'teacher' ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'border-purple-200 text-purple-700 hover:bg-purple-50'}`}
                    >
                      <School className="w-4 h-4 mr-1" />
                      Teacher
                    </Button>
                  </div>

                  {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
                      <AlertCircle className="h-4 w-4 flex-shrink-0" />
                      <span className="text-xs font-medium">{error}</span>
                    </div>
                  )}

                  <form onSubmit={handleSignUpSubmit} className="space-y-3">
                    <div className="space-y-1">
                      <Label htmlFor="signup-name" className="text-sm font-medium text-gray-700">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="signup-name"
                          name="fullName"
                          placeholder="John Doe"
                          className="pl-10 h-10 text-sm border-gray-200 focus:border-green-400 focus:ring-green-400 rounded-lg"
                          value={signUpData.fullName}
                          onChange={handleSignUpChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="signup-email" className="text-sm font-medium text-gray-700">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="signup-email"
                          name="email"
                          type="email"
                          placeholder={userType === 'student' ? 'student@school.edu' : 'teacher@school.edu'}
                          className="pl-10 h-10 text-sm border-gray-200 focus:border-green-400 focus:ring-green-400 rounded-lg"
                          value={signUpData.email}
                          onChange={handleSignUpChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label htmlFor="school" className="text-sm font-medium text-gray-700">School</Label>
                        <Select 
                          value={signUpData.school} 
                          onValueChange={(value) => handleSelectChange('school', value)}
                          required
                        >
                          <SelectTrigger className="h-10 text-sm border-gray-200 focus:border-green-400 rounded-lg">
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

                      <div className="space-y-1">
                        <Label htmlFor="grade-subject" className="text-sm font-medium text-gray-700">
                          {userType === 'student' ? 'Grade Level' : 'Subject Area'}
                        </Label>
                        <Select 
                          value={userType === 'student' ? signUpData.grade : signUpData.subject} 
                          onValueChange={(value) => handleSelectChange(userType === 'student' ? 'grade' : 'subject', value)}
                          required
                        >
                          <SelectTrigger className="h-10 text-sm border-gray-200 focus:border-green-400 rounded-lg">
                            <SelectValue placeholder={userType === 'student' ? 'Select your grade' : 'Select your subject'} />
                          </SelectTrigger>
                          <SelectContent>
                            {userType === 'student' ? (
                              <>
                                <SelectItem value="9">9th Grade</SelectItem>
                                <SelectItem value="10">10th Grade</SelectItem>
                                <SelectItem value="11">11th Grade</SelectItem>
                                <SelectItem value="12">12th Grade</SelectItem>
                              </>
                            ) : (
                              <>
                                <SelectItem value="environmental-science">Environmental Science</SelectItem>
                                <SelectItem value="biology">Biology</SelectItem>
                                <SelectItem value="chemistry">Chemistry</SelectItem>
                                <SelectItem value="geography">Geography</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </>
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label htmlFor="signup-password" className="text-sm font-medium text-gray-700">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            id="signup-password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a password"
                            className="pl-10 pr-10 h-10 text-sm border-gray-200 focus:border-green-400 focus:ring-green-400 rounded-lg"
                            value={signUpData.password}
                            onChange={handleSignUpChange}
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <Label htmlFor="signup-confirm-password" className="text-sm font-medium text-gray-700">Confirm Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            id="signup-confirm-password"
                            name="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm password"
                            className="pl-10 pr-10 h-10 text-sm border-gray-200 focus:border-green-400 focus:ring-green-400 rounded-lg"
                            value={signUpData.confirmPassword}
                            onChange={handleSignUpChange}
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2 pt-1">
                      <Checkbox
                        id="terms"
                        checked={agreedToTerms}
                        onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                        className="mt-0.5"
                      />
                      <Label htmlFor="terms" className="text-xs leading-4 text-gray-600">
                        I agree to the{" "}
                        <Link href="/terms" className="text-green-600 hover:text-green-700 font-medium hover:underline">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy" className="text-green-600 hover:text-green-700 font-medium hover:underline">
                          Privacy Policy
                        </Link>
                      </Label>
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-10 text-sm font-semibold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] rounded-lg"
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
                          Start Your Journey
                        </>
                      )}
                    </Button>
                  </form>

                  <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                      Already have an account?{" "}
                      <button
                        onClick={switchMode}
                        className="text-green-600 hover:text-green-700 font-medium hover:underline transition-colors"
                      >
                        Sign in here
                      </button>
                    </p>
                  </div>
                </CardContent>
              </div>
            </Card>

            {/* Mode Switch Button for Mobile */}
            <div className="lg:hidden mt-8 text-center">
              <Button
                variant="ghost"
                onClick={switchMode}
                className="text-gray-600 hover:text-green-600 transition-colors rounded-xl px-6 py-3"
              >
                {isSignUp ? (
                  <>
                    <ChevronLeft className="w-5 h-5 mr-2" />
                    Back to Sign In
                  </>
                ) : (
                  <>
                    Create Account
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Desktop Mode Switch Indicator */}
        <div className="hidden lg:block absolute top-8 right-8 z-20">
          <Button
            variant="ghost"
            size="default"
            onClick={switchMode}
            className="bg-white/90 backdrop-blur-sm border border-green-200 text-green-700 hover:bg-green-50 transition-all duration-300 rounded-xl px-6 py-3 shadow-lg hover:shadow-xl"
          >
            {isSignUp ? (
              <>
                <ChevronLeft className="w-5 h-5 mr-2" />
                Sign In
              </>
            ) : (
              <>
                Sign Up
                <ChevronRight className="w-5 h-5 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}