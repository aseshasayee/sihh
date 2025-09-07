"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { 
  Trophy,
  Medal,
  Crown,
  Star,
  TrendingUp,
  TrendingDown,
  Users,
  Target,
  Award,
  Zap,
  ChevronUp,
  ChevronDown,
  Minus,
  School,
  Building,
  Globe,
  BarChart3
} from "lucide-react"

export default function LeaderboardPage() {
  const [activeView, setActiveView] = useState("school")

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
            <Trophy className="h-4 w-4" />
            Eco Leaderboard
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Top <span className="text-yellow-600">Eco Warriors</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how you rank among eco-warriors in your school and community. Compete, learn, and make a difference!
          </p>
        </div>

        {/* Filter Section */}
        <div className="flex flex-wrap justify-center gap-3">
          <Button
            onClick={() => setActiveView("school")}
            variant={activeView === "school" ? "default" : "outline"}
            className={`rounded-full px-8 py-3 transition-all duration-300 ${
              activeView === "school"
                ? "bg-green-600 hover:bg-green-700 text-white shadow-lg"
                : "border-gray-300 text-gray-700 hover:bg-green-50 hover:border-green-300"
            }`}
          >
            <School className="h-5 w-5 mr-2" />
            School Leaderboard
          </Button>
          <Button
            onClick={() => setActiveView("city")}
            variant={activeView === "city" ? "default" : "outline"}
            className={`rounded-full px-8 py-3 transition-all duration-300 ${
              activeView === "city"
                ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
                : "border-gray-300 text-gray-700 hover:bg-blue-50 hover:border-blue-300"
            }`}
          >
            <Building className="h-5 w-5 mr-2" />
            City Leaderboard
          </Button>
        </div>

        {/* Your Rank Card */}
        <Card className="border-0 shadow-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white overflow-hidden relative">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute top-4 right-4 opacity-20">
            <Star className="h-16 w-16" />
          </div>
          <CardContent className="relative p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative">
                <Avatar className="h-24 w-24 border-4 border-white/30 shadow-2xl">
                  <AvatarImage src="/placeholder-user.jpg" alt="Your Avatar" />
                  <AvatarFallback className="bg-white/20 text-white text-2xl font-bold backdrop-blur-sm">AJ</AvatarFallback>
                </Avatar>
                <div className="absolute -top-2 -right-2 h-10 w-10 bg-yellow-500 rounded-full flex items-center justify-center text-white text-lg font-bold shadow-lg">
                  23
                </div>
              </div>
              
              <div className="flex-1 text-center md:text-left space-y-3">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold">Alex Johnson (You)</h3>
                  <p className="text-blue-100 text-lg">Grade 10 • Greenfield High School</p>
                </div>
                
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-300" />
                    <span className="text-2xl font-bold">1,245 points</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-300">
                    <TrendingUp className="h-5 w-5" />
                    <span className="font-medium">+2 positions this week</span>
                  </div>
                </div>
              </div>
              
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <p className="text-blue-200 text-sm mb-1">Next Rank</p>
                <p className="font-bold text-lg">#22 (Amy Chen)</p>
                <p className="text-blue-200 text-sm">78 points to go</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top 3 Podium */}
        <Card className="border-0 shadow-2xl bg-white">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-3">
              <Trophy className="h-8 w-8 text-yellow-500" />
              Top Performers
              <Trophy className="h-8 w-8 text-yellow-500" />
            </CardTitle>
            <CardDescription className="text-lg">
              {activeView === "school" ? "Champions of Greenfield High School" : "Top eco-warriors in your city"}
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-8">
            <div className="flex justify-center items-end gap-8 mb-8">
              
              {/* 2nd Place */}
              <div className="text-center transform hover:scale-105 transition-all duration-300">
                <div className="relative mb-4">
                  <Avatar className="h-20 w-20 mx-auto border-4 border-gray-300 shadow-lg">
                    <AvatarImage src="/placeholder-user.jpg" alt="User" />
                    <AvatarFallback className="bg-gray-100 text-gray-700 text-xl font-bold">SC</AvatarFallback>
                  </Avatar>
                  <div className="absolute -top-3 -right-3 h-12 w-12 bg-gray-400 rounded-full flex items-center justify-center shadow-lg">
                    <Medal className="h-7 w-7 text-white" />
                  </div>
                </div>
                <div className="bg-gradient-to-t from-gray-200 to-gray-100 p-6 rounded-t-2xl h-28 flex flex-col justify-end shadow-lg">
                  <h4 className="font-bold text-lg text-gray-900">Sarah Chen</h4>
                  <p className="text-2xl font-bold text-gray-700">2,890 pts</p>
                  <p className="text-sm text-gray-600">{activeView === "school" ? "Grade 11" : "Riverside Academy"}</p>
                </div>
              </div>

              {/* 1st Place */}
              <div className="text-center transform hover:scale-105 transition-all duration-300">
                <div className="relative mb-4">
                  <Avatar className="h-28 w-28 mx-auto border-4 border-yellow-400 shadow-2xl">
                    <AvatarImage src="/placeholder-user.jpg" alt="User" />
                    <AvatarFallback className="bg-yellow-100 text-yellow-800 text-2xl font-bold">MR</AvatarFallback>
                  </Avatar>
                  <div className="absolute -top-4 -right-4 h-16 w-16 bg-yellow-500 rounded-full flex items-center justify-center shadow-xl">
                    <Crown className="h-10 w-10 text-white" />
                  </div>
                </div>
                <div className="bg-gradient-to-t from-yellow-300 to-yellow-200 p-6 rounded-t-2xl h-36 flex flex-col justify-end shadow-xl">
                  <h4 className="font-bold text-xl text-gray-900">Marcus Rodriguez</h4>
                  <p className="text-3xl font-bold text-yellow-800">3,245 pts</p>
                  <p className="text-sm text-gray-700">{activeView === "school" ? "Grade 12" : "Central High"}</p>
                </div>
              </div>

              {/* 3rd Place */}
              <div className="text-center transform hover:scale-105 transition-all duration-300">
                <div className="relative mb-4">
                  <Avatar className="h-18 w-18 mx-auto border-4 border-orange-300 shadow-lg">
                    <AvatarImage src="/placeholder-user.jpg" alt="User" />
                    <AvatarFallback className="bg-orange-100 text-orange-700 text-lg font-bold">EP</AvatarFallback>
                  </Avatar>
                  <div className="absolute -top-2 -right-2 h-10 w-10 bg-orange-500 rounded-full flex items-center justify-center shadow-lg">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="bg-gradient-to-t from-orange-200 to-orange-100 p-6 rounded-t-2xl h-24 flex flex-col justify-end shadow-lg">
                  <h4 className="font-bold text-lg text-gray-900">Emma Park</h4>
                  <p className="text-2xl font-bold text-orange-700">2,567 pts</p>
                  <p className="text-sm text-gray-600">{activeView === "school" ? "Grade 10" : "Greenfield High"}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rankings Table */}
        <Card className="border-0 shadow-2xl bg-white">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 border-b">
            <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <BarChart3 className="h-6 w-6 text-blue-600" />
              {activeView === "school" ? "School Rankings" : "City Rankings"}
            </CardTitle>
            <CardDescription className="text-gray-600">
              {activeView === "school" ? "Your classmates making a difference" : "Top eco-champions in your area"}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-0">
              {Array.from({ length: 10 }, (_, i) => {
                const rank = i + 4;
                const names = ["Alex Thompson", "Jessica Wu", "Ryan Martinez", "Sophie Brown", "David Kim", "Maya Patel", "Jordan Davis", "Lily Chang", "Nathan Cooper", "Zoe Robinson"];
                const schools = ["Riverside Academy", "Central High", "Greenfield High", "Westside Prep", "Oak Valley School", "Pine Ridge Academy", "Summit High", "Valley View", "Hilltop School", "Eastwood Academy"];
                const grades = ["Grade 9", "Grade 10", "Grade 11", "Grade 12", "Grade 9", "Grade 10", "Grade 11", "Grade 12", "Grade 9", "Grade 10"];
                const points = [2456, 2234, 2098, 1987, 1876, 1765, 1654, 1543, 1432, 1321];
                
                return (
                  <div
                    key={i}
                    className={`flex items-center justify-between p-6 border-b border-gray-100 hover:bg-gradient-to-r hover:from-blue-50 hover:to-green-50 transition-all duration-300 ${
                      rank <= 6 ? 'bg-gradient-to-r from-yellow-50 to-orange-50' : ''
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                        rank <= 6 
                          ? 'bg-gradient-to-r from-orange-400 to-yellow-400 text-white shadow-lg' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {rank}
                      </div>
                      <Avatar className="h-12 w-12 border-2 border-gray-200">
                        <AvatarImage src="/placeholder-user.jpg" alt="User" />
                        <AvatarFallback className="bg-blue-100 text-blue-700 font-semibold">
                          {names[i].split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold text-gray-900">{names[i]}</h4>
                        <p className="text-sm text-gray-600">
                          {activeView === "school" ? grades[i] : schools[i]}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg text-gray-900">{points[i].toLocaleString()} pts</div>
                      <div className="text-sm text-gray-500">
                        {rank <= 6 ? (
                          <span className="inline-flex items-center gap-1 text-green-600">
                            <TrendingUp className="h-4 w-4" />
                            +{Math.floor(Math.random() * 100) + 50} today
                          </span>
                        ) : (
                          <span className="text-gray-400">+{Math.floor(Math.random() * 50) + 10} today</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="p-6 bg-gradient-to-r from-gray-50 to-blue-50 border-t">
              <div className="text-center">
                <Button variant="outline" className="border-2 border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300">
                  <ChevronDown className="h-4 w-4 mr-2" />
                  Load More Rankings
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Achievement Stats */}
        <Card className="border-0 shadow-2xl bg-gradient-to-br from-purple-500 via-blue-500 to-green-500 text-white overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
            <Trophy className="h-full w-full" />
          </div>
          <CardHeader className="relative">
            <CardTitle className="text-3xl font-bold flex items-center gap-3">
              <Award className="h-8 w-8 text-yellow-300" />
              {activeView === "school" ? "School Achievement" : "City Progress"}
            </CardTitle>
            <CardDescription className="text-blue-100 text-lg">
              {activeView === "school" 
                ? "Greenfield High School's environmental impact" 
                : "Your city's collective environmental efforts"
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="relative pb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-4xl font-bold text-yellow-300">
                  {activeView === "school" ? "45,678" : "234,567"}
                </div>
                <div className="text-blue-100 font-medium">Total Points</div>
                <div className="text-sm text-blue-200 mt-2">
                  Rank #{activeView === "school" ? "2" : "12"} {activeView === "school" ? "in district" : "nationally"}
                </div>
              </div>
              
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-4xl font-bold text-green-300">
                  {activeView === "school" ? "127" : "1,523"}
                </div>
                <div className="text-blue-100 font-medium">Active Members</div>
                <div className="text-sm text-blue-200 mt-2">
                  +{activeView === "school" ? "12" : "89"} this month
                </div>
              </div>
              
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-4xl font-bold text-blue-300">
                  {activeView === "school" ? "89%" : "76%"}
                </div>
                <div className="text-blue-100 font-medium">Participation Rate</div>
                <div className="text-sm text-blue-200 mt-2">
                  vs {activeView === "school" ? "district avg" : "national avg"}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
