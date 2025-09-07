"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/lib/auth-context"
import { 
  Leaf, 
  Trophy, 
  Target, 
  Calendar,
  TrendingUp,
  Users,
  Star,
  Clock,
  CheckCircle,
  Award,
  Zap,
  BookOpen,
  Plus,
  ArrowUpRight,
  Flame,
  Globe,
  TreePine,
  Recycle,
  Droplets,
  Sun,
  Wind,
  Mountain
} from "lucide-react"

export default function DashboardPage() {
  const { user } = useAuth()
  
  // Extract user info with fallbacks
  const userName = user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email?.split('@')[0] || 'Eco Warrior'
  const userEmail = user?.email || ''
  const userType = user?.user_metadata?.user_type || 'student'
  const userSchool = user?.user_metadata?.school || 'Your School'
  
  // Get user initials for avatar
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <div className="max-w-7xl mx-auto space-y-8 p-6">
        
        {/* Enhanced Welcome Header */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-3xl"></div>
          <div className="absolute inset-0 bg-black/10 rounded-3xl"></div>
          <div className="relative p-8 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <Avatar className="h-20 w-20 border-4 border-white/20 shadow-2xl">
                    <AvatarImage src="/placeholder-user.jpg" alt="User" />
                    <AvatarFallback className="bg-white/20 text-white text-2xl font-bold backdrop-blur-sm">
                      {getInitials(userName)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 h-8 w-8 bg-green-400 rounded-full flex items-center justify-center border-2 border-white">
                    <Flame className="h-4 w-4 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-4xl font-bold mb-2">
                    Welcome back, {userName}! 🌱
                  </h1>
                  <p className="text-emerald-100 text-lg">
                    {userType === 'teacher' ? 'Teacher' : 'Student'} at {userSchool}
                  </p>
                  <p className="text-emerald-200 text-sm mt-1">
                    Ready to make a positive impact today?
                  </p>
                </div>
              </div>
              
              <div className="hidden lg:flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-3xl font-bold">7</div>
                  <div className="text-emerald-200 text-sm">Day Streak</div>
                </div>
                <div className="w-px h-12 bg-white/20"></div>
                <div className="text-center">
                  <div className="text-3xl font-bold">1,245</div>
                  <div className="text-emerald-200 text-sm">Total Points</div>
                </div>
                <div className="w-px h-12 bg-white/20"></div>
                <div className="text-center">
                  <div className="text-3xl font-bold">#23</div>
                  <div className="text-emerald-200 text-sm">Global Rank</div>
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute top-4 right-4 opacity-20">
              <TreePine className="h-16 w-16" />
            </div>
            <div className="absolute bottom-4 left-1/3 opacity-10">
              <Globe className="h-12 w-12" />
            </div>
          </div>
        </div>

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-0 shadow-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100 text-sm font-medium">Total Points</p>
                  <p className="text-3xl font-bold">1,245</p>
                  <div className="flex items-center mt-2 text-emerald-200">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span className="text-sm">+12% this week</span>
                  </div>
                </div>
                <div className="h-14 w-14 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Star className="h-8 w-8" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Global Rank</p>
                  <p className="text-3xl font-bold">#23</p>
                  <div className="flex items-center mt-2 text-blue-200">
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                    <span className="text-sm">+2 positions</span>
                  </div>
                </div>
                <div className="h-14 w-14 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Trophy className="h-8 w-8" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-500 to-pink-600 text-white transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">Actions Completed</p>
                  <p className="text-3xl font-bold">47</p>
                  <div className="flex items-center mt-2 text-purple-200">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    <span className="text-sm">this month</span>
                  </div>
                </div>
                <div className="h-14 w-14 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <CheckCircle className="h-8 w-8" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-gradient-to-br from-orange-500 to-red-500 text-white transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm font-medium">Current Streak</p>
                  <p className="text-3xl font-bold">7 days</p>
                  <div className="flex items-center mt-2 text-orange-200">
                    <Flame className="h-4 w-4 mr-1" />
                    <span className="text-sm">Keep it up!</span>
                  </div>
                </div>
                <div className="h-14 w-14 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Zap className="h-8 w-8" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Active Challenges - Enhanced */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Today's Impact Summary */}
            <Card className="border-0 shadow-xl bg-gradient-to-r from-green-50 to-emerald-50">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl font-bold text-gray-900">Today's Impact</CardTitle>
                    <CardDescription className="text-gray-600">Your environmental actions for today</CardDescription>
                  </div>
                  <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
                    <Globe className="h-8 w-8 text-green-600" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                    <Droplets className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-blue-600">12L</div>
                    <div className="text-sm text-gray-600">Water Saved</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                    <Recycle className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-purple-600">3kg</div>
                    <div className="text-sm text-gray-600">Waste Recycled</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                    <Wind className="h-8 w-8 text-green-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-600">2.5kg</div>
                    <div className="text-sm text-gray-600">CO₂ Reduced</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Active Challenges */}
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <Target className="h-6 w-6 text-emerald-600" />
                      Active Challenges
                    </CardTitle>
                    <CardDescription>Complete these to earn more points and make a difference</CardDescription>
                  </div>
                  <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Join New
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* Challenge 1 - Enhanced */}
                <div className="relative overflow-hidden rounded-xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-6">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-green-200 rounded-full -mr-10 -mt-10 opacity-20"></div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                        <TreePine className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg text-gray-900">Plant a Tree Challenge</h4>
                        <p className="text-green-700 text-sm">Help restore local ecosystems</p>
                      </div>
                    </div>
                    <Badge className="bg-green-600 text-white text-sm px-3 py-1">50 points</Badge>
                  </div>
                  
                  <Progress value={60} className="mb-4 h-3" />
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        3/5 trees planted
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        5 days left
                      </span>
                    </div>
                    <Button size="sm" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                      View Details
                    </Button>
                  </div>
                </div>

                {/* Challenge 2 - Enhanced */}
                <div className="relative overflow-hidden rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50 p-6">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-blue-200 rounded-full -mr-10 -mt-10 opacity-20"></div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Droplets className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg text-gray-900">Water Conservation Week</h4>
                        <p className="text-blue-700 text-sm">Reduce daily water usage by 50%</p>
                      </div>
                    </div>
                    <Badge className="bg-blue-600 text-white text-sm px-3 py-1">30 points</Badge>
                  </div>
                  
                  <Progress value={35} className="mb-4 h-3" />
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-blue-600" />
                        Day 2/7 completed
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        5 days left
                      </span>
                    </div>
                    <Button size="sm" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                      Log Progress
                    </Button>
                  </div>
                </div>

                {/* Challenge 3 - Enhanced */}
                <div className="relative overflow-hidden rounded-xl border border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 p-6">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-purple-200 rounded-full -mr-10 -mt-10 opacity-20"></div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                        <Sun className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg text-gray-900">Energy Saver Challenge</h4>
                        <p className="text-purple-700 text-sm">Reduce electricity usage by 20%</p>
                      </div>
                    </div>
                    <Badge className="bg-purple-600 text-white text-sm px-3 py-1">25 points</Badge>
                  </div>
                  
                  <Progress value={80} className="mb-4 h-3" />
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <TrendingUp className="h-4 w-4 text-purple-600" />
                        Almost there! 80% complete
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        12 days left
                      </span>
                    </div>
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                      Complete Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Right Sidebar */}
          <div className="space-y-6">
            
            {/* Weekly Goal - Enhanced */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Target className="h-6 w-6" />
                  Weekly Goal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="relative">
                    <div className="text-4xl font-bold mb-2">150/200</div>
                    <p className="text-emerald-100 mb-4">points this week</p>
                    <div className="w-full bg-white/20 rounded-full h-4 mb-4">
                      <div className="bg-white h-4 rounded-full" style={{width: '75%'}}></div>
                    </div>
                    <p className="text-emerald-200 text-sm">50 more points to reach your weekly goal!</p>
                  </div>
                  <Button className="w-full mt-4 bg-white text-emerald-600 hover:bg-emerald-50 font-semibold">
                    View Progress
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Achievements - Enhanced */}
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Award className="h-6 w-6 text-yellow-600" />
                  Recent Achievements
                </CardTitle>
                <CardDescription>Your latest eco accomplishments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl border border-green-200">
                  <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Leaf className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-green-900">Eco Warrior</p>
                    <p className="text-sm text-green-700">Completed 10 environmental actions</p>
                    <p className="text-xs text-green-600 mt-1">+50 points • 2 days ago</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl border border-blue-200">
                  <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-blue-900">Team Player</p>
                    <p className="text-sm text-blue-700">Joined 5 group challenges</p>
                    <p className="text-xs text-blue-600 mt-1">+25 points • 5 days ago</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl border border-purple-200">
                  <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-900">Knowledge Seeker</p>
                    <p className="text-sm text-purple-700">Completed sustainability course</p>
                    <p className="text-xs text-purple-600 mt-1">+75 points • 1 week ago</p>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50">
                  View All Achievements
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions - Enhanced */}
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl">Quick Actions</CardTitle>
                <CardDescription>Take immediate action for the planet</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start bg-emerald-600 hover:bg-emerald-700 text-white h-12">
                  <CheckCircle className="h-5 w-5 mr-3" />
                  Log Environmental Action
                </Button>
                <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700 text-white h-12">
                  <Calendar className="h-5 w-5 mr-3" />
                  Schedule Eco Activity
                </Button>
                <Button className="w-full justify-start bg-purple-600 hover:bg-purple-700 text-white h-12">
                  <Users className="h-5 w-5 mr-3" />
                  Join Team Challenge
                </Button>
                <Button className="w-full justify-start bg-orange-600 hover:bg-orange-700 text-white h-12">
                  <Mountain className="h-5 w-5 mr-3" />
                  Explore Events
                </Button>
              </CardContent>
            </Card>

            {/* Environmental Tip of the Day */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Sun className="h-5 w-5 text-yellow-600" />
                  Tip of the Day
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-3">
                  💡 Did you know? Using a reusable water bottle can save up to 1,460 plastic bottles per year!
                </p>
                <Button size="sm" variant="outline" className="border-yellow-600 text-yellow-700 hover:bg-yellow-50">
                  Learn More Tips
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
