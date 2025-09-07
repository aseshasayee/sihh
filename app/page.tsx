"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Leaf,
  Trophy,
  Calendar,
  Users,
  Target,
  Zap,
  Search,
  MapPin,
  Clock,
  Star,
  Award,
  TrendingUp,
  Menu,
  X,
  LogOut,
} from "lucide-react"
import Link from "next/link"
import EnhancedHero from "@/components/enhanced-hero"

export default function EcozyApp() {
  const [activeTab, setActiveTab] = useState("home")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, loading, signOut } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Check for tab parameter in URL
    const tab = searchParams.get('tab')
    if (tab) {
      setActiveTab(tab)
    }
  }, [searchParams])

  const handleSignOut = async () => {
    await signOut()
    setActiveTab("home")
    router.push("/")
  }

  const leaderboard = [
    { rank: 1, name: "Emma Johnson", school: "Green Valley High", points: 1500, badges: ["🌱", "💧", "♻️", "🌳"] },
    { rank: 2, name: "Alex Martinez", school: "Eco Academy", points: 1350, badges: ["🌊", "💧", "♻️", "🔴"] },
    { rank: 3, name: "Priya Patel", school: "Sustainability School", points: 1180, badges: ["🌱", "💧", "♻️", "⭐"] },
    { rank: 4, name: "John Doe", school: "Green Valley High", points: 980, badges: ["👤", "🌱", "🌿"] },
    { rank: 5, name: "Fatima Khan", school: "Eco Academy", points: 860, badges: ["🌳", "💧", "♻️", "🌿"] },
  ]

  const upcomingEvents = [
    {
      id: 1,
      title: "Beach Clean-up Drive",
      date: "April 10, 2025",
      time: "10:00 AM - 1:00 PM",
      location: "Galangute Beach, Goa",
      volunteers: 120,
      organization: "GreenSea NGO",
    },
    {
      id: 2,
      title: "Tree Plantation",
      date: "April 10, 2025",
      time: "8:00 AM - 11:00 PM",
      location: "Sinhagad Hills, Goa",
      volunteers: 87,
      organization: "Forest Friends",
    },
  ]

  const Navigation = () => (
    <nav className="bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Leaf className="h-8 w-8 text-primary" />
            <span className="font-playfair font-bold text-2xl text-primary">ECOZY</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => setActiveTab("home")}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "home"
                  ? "bg-green-600 text-white"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setActiveTab("events")}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "events"
                  ? "bg-green-600 text-white"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Events
            </button>
            <button
              onClick={() => setActiveTab("leaderboard")}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "leaderboard"
                  ? "bg-green-600 text-white"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Leaderboard
            </button>
            {user ? (
              <>
                <button
                  onClick={() => setActiveTab("dashboard")}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === "dashboard"
                      ? "bg-green-600 text-white"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Dashboard
                </button>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">
                    {user.user_metadata?.full_name || user.email}
                  </span>
                  <Button 
                    onClick={handleSignOut}
                    variant="outline" 
                    size="sm"
                    className="border-red-300 text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4 mr-1" />
                    Sign Out
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Link href="/auth">
                  <Button className="bg-green-600 hover:bg-green-700 text-white">Sign In</Button>
                </Link>
                <Link href="/auth?mode=signup">
                  <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">Sign Up</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-muted-foreground hover:text-foreground"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={() => {
                  setActiveTab("home")
                  setMobileMenuOpen(false)
                }}
                className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors ${
                  activeTab === "home"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Home
              </button>
              <button
                onClick={() => {
                  setActiveTab("dashboard")
                  setMobileMenuOpen(false)
                }}
                className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors ${
                  activeTab === "dashboard"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => {
                  setActiveTab("events")
                  setMobileMenuOpen(false)
                }}
                className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors ${
                  activeTab === "events"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Events
              </button>
              <button
                onClick={() => {
                  setActiveTab("leaderboard")
                  setMobileMenuOpen(false)
                }}
                className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors ${
                  activeTab === "leaderboard"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Leaderboard
              </button>
              <Link href="/auth">
                <Button className="w-full mt-2 bg-secondary text-secondary-foreground hover:bg-secondary/90">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )

  const HomePage = () => (
    <div className="min-h-screen">
      {/* Enhanced 3D Hero Component */}
      <EnhancedHero />

      {/* Enhanced Upcoming Events Section */}
      <div className="bg-white/50 backdrop-blur-sm py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900 mb-4">Join Upcoming Events</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Connect with your community and make a tangible impact through local environmental initiatives
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {upcomingEvents.map((event) => (
              <Card
                key={event.id}
                className="group hover:shadow-2xl transition-all duration-500 transform hover:scale-105 bg-white/90 backdrop-blur-sm border-green-100 hover:border-green-200 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-emerald-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardHeader className="relative z-10">
                  <div className="flex items-start justify-between">
                    <div className="space-y-3">
                      <CardTitle className="text-xl text-gray-900 group-hover:text-green-700 transition-colors">
                        {event.title}
                      </CardTitle>
                      <div className="space-y-2">
                        <CardDescription className="flex items-center text-gray-600">
                          <Calendar className="h-4 w-4 mr-2 text-green-600" />
                          {event.date} • {event.time}
                        </CardDescription>
                        <CardDescription className="flex items-center text-gray-600">
                          <MapPin className="h-4 w-4 mr-2 text-green-600" />
                          {event.location}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-800 hover:bg-green-200 transition-colors"
                    >
                      <Users className="h-3 w-3 mr-1" />
                      {event.volunteers}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                      {event.organization}
                    </div>
                    <div className="flex gap-3">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300 transition-all duration-300 bg-transparent"
                      >
                        Learn More
                      </Button>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-md hover:shadow-lg transition-all duration-300"
                      >
                        Join Event
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Call-to-Action Section */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Eco Journey?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students and teachers making a real difference. Track your impact, earn rewards, and help
            save our planet.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth">
              <Button
                size="lg"
                className="bg-white text-green-600 hover:bg-gray-50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Leaf className="mr-2 h-5 w-5" />
                Join as Student
              </Button>
            </Link>
            <Link href="/auth?mode=signup&type=teacher">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-green-600 transition-all duration-300 transform hover:scale-105 bg-transparent"
              >
                Join as Teacher
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )

  const DashboardPage = () => {
    if (!user) {
      return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <div className="mb-8">
            <h1 className="font-playfair text-3xl font-bold mb-4">Dashboard</h1>
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-8 rounded-lg border border-green-200 max-w-md mx-auto">
              <div className="text-green-600 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-green-800 mb-2">Protected Area</h3>
              <p className="text-green-700 mb-4">Please log in to access your personalized dashboard with eco-points, badges, and daily challenges.</p>
              <div className="space-y-2">
                <Link href="/auth" className="w-full">
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth?mode=signup" className="w-full">
                  <Button 
                    variant="outline" 
                    className="w-full border-green-300 text-green-700 hover:bg-green-50"
                  >
                    Create Account
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="font-playfair text-3xl font-bold mb-2">Welcome back, {user.user_metadata?.full_name || 'Eco Warrior'}! 🌱</h1>
          <p className="text-muted-foreground">Ready to make an impact today?</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Eco Points */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Eco Points</CardTitle>
              <Trophy className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">1,250</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                +50 from last week
              </p>
            </CardContent>
          </Card>

          {/* Streak */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
              <Zap className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-secondary">7 days 🔥</div>
              <p className="text-xs text-muted-foreground">Keep it going!</p>
            </CardContent>
          </Card>

          {/* Rank */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">School Rank</CardTitle>
              <Star className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">#3</div>
              <p className="text-xs text-muted-foreground">in {user.user_metadata?.school || 'Your School'}</p>
            </CardContent>
          </Card>
        </div>

        {/* Daily Tasks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="mr-2 h-5 w-5 text-primary" />
                Today's Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { id: 1, title: "Use reusable water bottle", points: 10, completed: true },
                  { id: 2, title: "Take public transport", points: 15, completed: true },
                  { id: 3, title: "Plant a seed", points: 25, completed: false },
                  { id: 4, title: "Recycle plastic waste", points: 20, completed: false },
                ].map((task) => (
                  <div
                    key={task.id}
                    className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${
                      task.completed
                        ? "bg-green-50 border-green-200 text-green-800"
                        : "hover:bg-gray-50 border-gray-200"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          task.completed
                            ? "bg-green-500 border-green-500"
                            : "border-gray-300 hover:border-green-400"
                        }`}
                      >
                        {task.completed && <span className="text-white text-xs">✓</span>}
                      </div>
                      <div>
                        <div className={`font-medium ${task.completed ? "line-through" : ""}`}>{task.title}</div>
                        <div className="text-sm text-muted-foreground">{task.points} points</div>
                      </div>
                    </div>
                    {!task.completed && (
                      <Button size="sm" variant="outline" className="border-green-200 text-green-700 hover:bg-green-50">
                        Complete
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Badges */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="mr-2 h-5 w-5 text-purple-600" />
                Recent Badges
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {["🌱", "💧", "♻️", "🌳"].map((badge, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100"
                  >
                    <div className="text-2xl">{badge}</div>
                    <div>
                      <div className="font-medium text-purple-800">Badge {index + 1}</div>
                      <div className="text-sm text-purple-600">Unlocked</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Charts */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Daily Goals</span>
                <span className="text-sm text-muted-foreground">5/7 days</span>
              </div>
              <Progress value={71} className="h-2" />
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Weekly Target</span>
                <span className="text-sm text-muted-foreground">280/400 points</span>
              </div>
              <Progress value={70} className="h-2" />
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Eco Impact</span>
                <span className="text-sm text-muted-foreground">8/10 tasks</span>
              </div>
              <Progress value={80} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const EventsPage = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="font-playfair text-3xl font-bold mb-4">Find an Event Near You</h1>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search events..." className="pl-10" />
          </div>
          <Button variant="outline">
            <MapPin className="mr-2 h-4 w-4" />
            Location
          </Button>
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Date
          </Button>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {upcomingEvents.map((event) => (
          <Card
            key={event.id}
            className="hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white/80 backdrop-blur-sm border-green-100"
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl mb-2">{event.title}</CardTitle>
                  <div className="space-y-2">
                    <div className="flex items-center text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-2" />
                      {event.date}
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="h-4 w-4 mr-2" />
                      {event.time}
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-2" />
                      {event.location}
                    </div>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  <Users className="h-3 w-3 mr-1" />
                  {event.volunteers} Joined
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-primary rounded-full mr-2" />
                  {event.organization}
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-green-200 text-green-700 hover:bg-green-50 bg-transparent"
                  >
                    Learn →
                  </Button>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                    Join
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Eco Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Leaf className="mr-2 h-5 w-5 text-primary" />
            Eco-Tips & Sustainable Living Hacks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2" />
              <span>Switch to reusable bags</span>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-secondary rounded-full mt-2" />
              <span>Save 5 liters of water daily by turning off the tap</span>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-accent rounded-full mt-2" />
              <span>Compost your food waste</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const LeaderboardPage = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="font-playfair text-3xl font-bold mb-2">Leaderboard</h1>
        <p className="text-muted-foreground">Top Contributors in the Community</p>
      </div>

      <Tabs defaultValue="students" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="schools">Schools</TabsTrigger>
        </TabsList>

        <TabsContent value="students">
          <Card>
            <CardHeader>
              <CardTitle>Top Students</CardTitle>
              <CardDescription>Ranked by eco-points earned</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leaderboard.map((user, index) => (
                  <div
                    key={user.rank}
                    className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${
                      index === 0
                        ? "bg-primary/5 border-primary/20"
                        : index === 1
                          ? "bg-secondary/5 border-secondary/20"
                          : index === 2
                            ? "bg-accent/5 border-accent/20"
                            : "hover:bg-muted/50"
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`flex items-center justify-center w-8 h-8 rounded-full font-bold ${
                          index === 0
                            ? "bg-primary text-primary-foreground"
                            : index === 1
                              ? "bg-secondary text-secondary-foreground"
                              : index === 2
                                ? "bg-accent text-accent-foreground"
                                : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {user.rank}
                      </div>
                      <Avatar>
                        <AvatarImage src={`/abstract-geometric-shapes.png?height=40&width=40&query=${user.name}`} />
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.school}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex space-x-1">
                        {user.badges.map((badge, badgeIndex) => (
                          <span key={badgeIndex} className="text-lg">
                            {badge}
                          </span>
                        ))}
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg">{user.points}</div>
                        <div className="text-sm text-muted-foreground">points</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schools">
          <Card>
            <CardHeader>
              <CardTitle>Top Schools</CardTitle>
              <CardDescription>Ranked by total eco-points</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { rank: 1, name: "Green Valley High", points: 15420, students: 234 },
                  { rank: 2, name: "Eco Academy", points: 12890, students: 189 },
                  { rank: 3, name: "Sustainability School", points: 11650, students: 156 },
                  { rank: 4, name: "Nature Institute", points: 9870, students: 145 },
                  { rank: 5, name: "Earth Sciences College", points: 8920, students: 123 },
                ].map((school, index) => (
                  <div
                    key={school.rank}
                    className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${
                      index === 0
                        ? "bg-primary/5 border-primary/20"
                        : index === 1
                          ? "bg-secondary/5 border-secondary/20"
                          : index === 2
                            ? "bg-accent/5 border-accent/20"
                            : "hover:bg-muted/50"
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`flex items-center justify-center w-8 h-8 rounded-full font-bold ${
                          index === 0
                            ? "bg-primary text-primary-foreground"
                            : index === 1
                              ? "bg-secondary text-secondary-foreground"
                              : index === 2
                                ? "bg-accent text-accent-foreground"
                                : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {school.rank}
                      </div>
                      <div>
                        <div className="font-semibold">{school.name}</div>
                        <div className="text-sm text-muted-foreground">{school.students} students</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg">{school.points}</div>
                      <div className="text-sm text-muted-foreground">points</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {loading ? (
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      ) : (
        <>
          {activeTab === "home" && <HomePage />}
          {activeTab === "events" && <EventsPage />}
          {activeTab === "leaderboard" && <LeaderboardPage />}
          {activeTab === "dashboard" && <DashboardPage />}
        </>
      )}

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border">
        <div className="flex justify-around py-2">
          <button
            onClick={() => setActiveTab("home")}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
              activeTab === "home" ? "text-green-600" : "text-muted-foreground"
            }`}
          >
            <Leaf className="h-5 w-5" />
            <span className="text-xs mt-1">Home</span>
          </button>
          <button
            onClick={() => setActiveTab("events")}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
              activeTab === "events" ? "text-green-600" : "text-muted-foreground"
            }`}
          >
            <Calendar className="h-5 w-5" />
            <span className="text-xs mt-1">Events</span>
          </button>
          <button
            onClick={() => setActiveTab("leaderboard")}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
              activeTab === "leaderboard" ? "text-green-600" : "text-muted-foreground"
            }`}
          >
            <Trophy className="h-5 w-5" />
            <span className="text-xs mt-1">Leaderboard</span>
          </button>
        </div>
      </div>
    </div>
  )
}
