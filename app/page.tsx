"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Leaf, Trophy, Calendar, Users, Target, Award, Menu, X, LogOut } from "lucide-react"
import Link from "next/link"
import HomePage from "@/components/home-page"
import DashboardPage from "@/components/dashboard-page"
import EventsPage from "@/components/events-page"
import LeaderboardPage from "@/components/leaderboard-page"

export default function EcozyApp() {
  const [activeTab, setActiveTab] = useState("home")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, loading, signOut } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Check for tab parameter in URL
    const tab = searchParams.get("tab")
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
                <button
                  onClick={() => setActiveTab("feed")}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === "feed" ? "bg-green-600 text-white" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Feed
                </button>
                <button
                  onClick={() => setActiveTab("courses")}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === "courses" ? "bg-green-600 text-white" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Courses
                </button>
                <button
                  onClick={() => setActiveTab("games")}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === "games" ? "bg-green-600 text-white" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Games
                </button>
                <button
                  onClick={() => setActiveTab("events")}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === "events" ? "bg-green-600 text-white" : "text-muted-foreground hover:text-foreground"
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
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === "profile" ? "bg-green-600 text-white" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Profile
                </button>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">{user.user_metadata?.full_name || user.email}</span>
                  <Button
                    onClick={handleSignOut}
                    variant="outline"
                    size="sm"
                    className="border-red-300 text-red-600 hover:bg-red-50 bg-transparent"
                  >
                    <LogOut className="h-4 w-4 mr-1" />
                    Sign Out
                  </Button>
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={() => setActiveTab("home")}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === "home" ? "bg-green-600 text-white" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Home
                </button>
                <button
                  onClick={() => setActiveTab("events")}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === "events" ? "bg-green-600 text-white" : "text-muted-foreground hover:text-foreground"
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
                <Link href="/auth">
                  <Button className="bg-green-600 hover:bg-green-700 text-white">Sign In</Button>
                </Link>
                <Link href="/auth?mode=signup">
                  <Button
                    variant="outline"
                    className="border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
                  >
                    Sign Up
                  </Button>
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
              {user ? (
                <>
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
                      setActiveTab("feed")
                      setMobileMenuOpen(false)
                    }}
                    className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors ${
                      activeTab === "feed"
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Feed
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab("courses")
                      setMobileMenuOpen(false)
                    }}
                    className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors ${
                      activeTab === "courses"
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Courses
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab("games")
                      setMobileMenuOpen(false)
                    }}
                    className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors ${
                      activeTab === "games"
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Games
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
                  <button
                    onClick={() => {
                      setActiveTab("profile")
                      setMobileMenuOpen(false)
                    }}
                    className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors ${
                      activeTab === "profile"
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Profile
                  </button>
                </>
              ) : (
                <>
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
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )

  const FeedPage = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="font-playfair text-3xl font-bold mb-2">Community Feed 🌱</h1>
        <p className="text-muted-foreground">See what your eco-community is up to!</p>
      </div>

      <div className="space-y-6">
        {[
          {
            user: "Emma Johnson",
            action: "completed a Beach Clean-up Drive",
            points: 50,
            time: "2 hours ago",
            image: "/beach-cleanup-volunteers.png",
          },
          {
            user: "Alex Martinez",
            action: "planted 5 trees in the school garden",
            points: 75,
            time: "4 hours ago",
            image: "/students-planting-trees.jpg",
          },
          {
            user: "Priya Patel",
            action: "achieved a 30-day recycling streak",
            points: 100,
            time: "1 day ago",
            badge: "♻️",
          },
        ].map((post, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <Avatar>
                  <AvatarFallback>
                    {post.user
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-semibold">{post.user}</span>
                    <span className="text-muted-foreground">{post.action}</span>
                    {post.badge && <span className="text-2xl">{post.badge}</span>}
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>+{post.points} eco-points</span>
                    <span>{post.time}</span>
                  </div>
                  {post.image && (
                    <div className="mt-4 rounded-lg overflow-hidden">
                      <img src={post.image || "/placeholder.svg"} alt="Activity" className="w-full h-48 object-cover" />
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const CoursesPage = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="font-playfair text-3xl font-bold mb-2">Eco Courses 📚</h1>
        <p className="text-muted-foreground">Learn and grow your environmental knowledge</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            title: "Climate Change Basics",
            description: "Understanding the science behind climate change",
            progress: 75,
            lessons: 8,
            duration: "2 hours",
          },
          {
            title: "Sustainable Living",
            description: "Practical tips for eco-friendly daily habits",
            progress: 45,
            lessons: 12,
            duration: "3 hours",
          },
          {
            title: "Renewable Energy",
            description: "Exploring solar, wind, and other clean energy sources",
            progress: 0,
            lessons: 10,
            duration: "2.5 hours",
          },
        ].map((course, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg">{course.title}</CardTitle>
              <CardDescription>{course.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{course.lessons} lessons</span>
                  <span>{course.duration}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  {course.progress > 0 ? "Continue" : "Start Course"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const GamesPage = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="font-playfair text-3xl font-bold mb-2">Eco Games 🎮</h1>
        <p className="text-muted-foreground">Learn through fun and interactive games!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            title: "Recycle Rush",
            description: "Sort waste into the correct bins as fast as you can!",
            difficulty: "Easy",
            points: "10-50 points",
            players: 1247,
          },
          {
            title: "Carbon Footprint Challenge",
            description: "Make daily choices to reduce your carbon impact",
            difficulty: "Medium",
            points: "25-100 points",
            players: 892,
          },
          {
            title: "Ecosystem Builder",
            description: "Create and balance your own virtual ecosystem",
            difficulty: "Hard",
            points: "50-200 points",
            players: 634,
          },
          {
            title: "Water Conservation Quest",
            description: "Save water resources in this adventure game",
            difficulty: "Medium",
            points: "30-75 points",
            players: 756,
          },
        ].map((game, index) => (
          <Card key={index} className="hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{game.title}</CardTitle>
                <Badge
                  variant={
                    game.difficulty === "Easy" ? "secondary" : game.difficulty === "Medium" ? "default" : "destructive"
                  }
                >
                  {game.difficulty}
                </Badge>
              </div>
              <CardDescription>{game.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{game.points}</span>
                  <span>{game.players} players</span>
                </div>
                <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                  Play Now
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const ProfilePage = () => (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="font-playfair text-3xl font-bold mb-2">My Profile 👤</h1>
        <p className="text-muted-foreground">Track your eco journey and achievements</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Info */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6 text-center">
              <Avatar className="w-24 h-24 mx-auto mb-4">
                <AvatarFallback className="text-2xl">
                  {user?.user_metadata?.full_name
                    ?.split(" ")
                    .map((n: string) => n[0])
                    .join("") || "U"}
                </AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-semibold mb-2">{user?.user_metadata?.full_name || "Eco Warrior"}</h3>
              <p className="text-muted-foreground mb-4">{user?.user_metadata?.school || "Green Valley High"}</p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Eco Points</span>
                  <span className="font-semibold text-green-600">1,250</span>
                </div>
                <div className="flex justify-between">
                  <span>Rank</span>
                  <span className="font-semibold">#3</span>
                </div>
                <div className="flex justify-between">
                  <span>Streak</span>
                  <span className="font-semibold">7 days 🔥</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Achievements & Stats */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Badges</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4">
                {["🌱", "💧", "♻️", "🌳", "🌍", "⚡", "🚲", "🌿"].map((badge, index) => (
                  <div key={index} className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-3xl mb-2">{badge}</div>
                    <div className="text-xs text-muted-foreground">Badge {index + 1}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Activity Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">23</div>
                  <div className="text-sm text-muted-foreground">Events Joined</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">156</div>
                  <div className="text-sm text-muted-foreground">Tasks Completed</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">8</div>
                  <div className="text-sm text-muted-foreground">Courses Finished</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">42</div>
                  <div className="text-sm text-muted-foreground">Games Played</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <div className="flex-1">
        {activeTab === "home" && <HomePage />}
        {activeTab === "dashboard" && <DashboardPage />}
        {activeTab === "feed" && <FeedPage />}
        {activeTab === "courses" && <CoursesPage />}
        {activeTab === "games" && <GamesPage />}
        {activeTab === "events" && <EventsPage />}
        {activeTab === "leaderboard" && <LeaderboardPage />}
        {activeTab === "profile" && <ProfilePage />}
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border">
        <div className="flex justify-around py-2">
          {user ? (
            <>
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                  activeTab === "dashboard" ? "text-green-600" : "text-muted-foreground"
                }`}
              >
                <Trophy className="h-5 w-5" />
                <span className="text-xs mt-1">Dashboard</span>
              </button>
              <button
                onClick={() => setActiveTab("feed")}
                className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                  activeTab === "feed" ? "text-green-600" : "text-muted-foreground"
                }`}
              >
                <Users className="h-5 w-5" />
                <span className="text-xs mt-1">Feed</span>
              </button>
              <button
                onClick={() => setActiveTab("games")}
                className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                  activeTab === "games" ? "text-green-600" : "text-muted-foreground"
                }`}
              >
                <Target className="h-5 w-5" />
                <span className="text-xs mt-1">Games</span>
              </button>
              <button
                onClick={() => setActiveTab("profile")}
                className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                  activeTab === "profile" ? "text-green-600" : "text-muted-foreground"
                }`}
              >
                <Award className="h-5 w-5" />
                <span className="text-xs mt-1">Profile</span>
              </button>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </div>
  )
}
