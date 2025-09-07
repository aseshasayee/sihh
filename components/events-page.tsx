"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Calendar,
  MapPin,
  Clock,
  Users,
  Leaf,
  Recycle,
  TreePine,
  Droplets,
  Heart,
  ChevronRight,
  Star,
  Globe,
  Award,
  Filter,
  Search
} from "lucide-react"

export default function EventsPage() {
  const [activeFilter, setActiveFilter] = useState("all")

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
            <Calendar className="h-4 w-4" />
            Environmental Events
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Join the <span className="text-green-600">Green Movement</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover exciting eco-friendly events and challenges in your community. Make a difference while having fun!
          </p>
        </div>

        {/* Filter Section */}
        <div className="flex flex-wrap justify-center gap-3">
          {[
            { key: "all", label: "All Events", icon: Globe },
            { key: "upcoming", label: "Upcoming", icon: Clock },
            { key: "my", label: "My Events", icon: Star },
            { key: "school", label: "School Events", icon: Award },
            { key: "community", label: "Community Events", icon: Users }
          ].map((filter) => (
            <Button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              variant={activeFilter === filter.key ? "default" : "outline"}
              className={`rounded-full px-6 py-2 transition-all duration-300 ${
                activeFilter === filter.key
                  ? "bg-green-600 hover:bg-green-700 text-white shadow-lg"
                  : "border-gray-300 text-gray-700 hover:bg-green-50 hover:border-green-300"
              }`}
            >
              <filter.icon className="h-4 w-4 mr-2" />
              {filter.label}
            </Button>
          ))}
        </div>

        {/* Featured Event */}
        <Card className="border-0 shadow-2xl bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white overflow-hidden relative">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute top-4 right-4 opacity-20">
            <Globe className="h-20 w-20" />
          </div>
          <CardContent className="relative p-8">
            <div className="flex items-start justify-between">
              <div className="flex-1 space-y-6">
                <div className="space-y-2">
                  <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                    Featured Event
                  </Badge>
                  <h2 className="text-3xl md:text-4xl font-bold">Earth Day Cleanup Marathon</h2>
                  <p className="text-emerald-100 text-lg leading-relaxed max-w-2xl">
                    Join 500+ students from across the city in the biggest environmental cleanup event of the year. 
                    Make a real difference in your community while earning points and prizes!
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-center gap-3 text-emerald-100">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-emerald-200">Date</p>
                      <p className="font-semibold">April 22, 2024</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-emerald-100">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-emerald-200">Time</p>
                      <p className="font-semibold">9:00 AM - 4:00 PM</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-emerald-100">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-emerald-200">Location</p>
                      <p className="font-semibold">Central Park</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <Button className="bg-white text-green-600 hover:bg-emerald-50 font-semibold px-8 py-3 rounded-xl shadow-lg">
                    Join Event
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                  <div className="flex items-center gap-2 text-emerald-200">
                    <Users className="h-5 w-5" />
                    <span className="font-medium">432 participants joined</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-gray-900">Upcoming Events</h2>
            <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            
            {/* Event Card 1 */}
            <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-white overflow-hidden group">
              <div className="h-2 bg-gradient-to-r from-blue-500 to-cyan-500"></div>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <Badge className="bg-blue-100 text-blue-800">School Event</Badge>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm text-gray-600 font-medium">50 pts</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto group-hover:bg-blue-200 transition-colors">
                    <Recycle className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-gray-900">Recycling Workshop</h3>
                    <p className="text-gray-600 text-sm mt-2">Learn creative ways to upcycle everyday items</p>
                  </div>
                </div>
                
                <div className="space-y-3 bg-gray-50 p-4 rounded-xl">
                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    <span className="font-medium">March 15, 2024</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <span className="font-medium">2:00 PM - 4:00 PM</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <MapPin className="h-4 w-4 text-blue-600" />
                    <span className="font-medium">Art Classroom</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600 font-medium">23/30 joined</span>
                  </div>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 rounded-full px-6">
                    Join Now
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Event Card 2 */}
            <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-white overflow-hidden group">
              <div className="h-2 bg-gradient-to-r from-green-500 to-emerald-500"></div>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <Badge className="bg-green-100 text-green-800">Community</Badge>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm text-gray-600 font-medium">75 pts</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto group-hover:bg-green-200 transition-colors">
                    <TreePine className="h-8 w-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-gray-900">Tree Planting Drive</h3>
                    <p className="text-gray-600 text-sm mt-2">Help restore the local forest ecosystem</p>
                  </div>
                </div>
                
                <div className="space-y-3 bg-gray-50 p-4 rounded-xl">
                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <Calendar className="h-4 w-4 text-green-600" />
                    <span className="font-medium">March 18, 2024</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <Clock className="h-4 w-4 text-green-600" />
                    <span className="font-medium">8:00 AM - 12:00 PM</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <MapPin className="h-4 w-4 text-green-600" />
                    <span className="font-medium">Riverside Park</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600 font-medium">89/100 joined</span>
                  </div>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700 rounded-full px-6">
                    Join Now
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Event Card 3 */}
            <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-white overflow-hidden group">
              <div className="h-2 bg-gradient-to-r from-purple-500 to-pink-500"></div>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <Badge className="bg-purple-100 text-purple-800">Challenge</Badge>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm text-gray-600 font-medium">100 pts</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto group-hover:bg-purple-200 transition-colors">
                    <Droplets className="h-8 w-8 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-gray-900">Water Conservation Week</h3>
                    <p className="text-gray-600 text-sm mt-2">7-day challenge to reduce water usage</p>
                  </div>
                </div>
                
                <div className="space-y-3 bg-gray-50 p-4 rounded-xl">
                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <Calendar className="h-4 w-4 text-purple-600" />
                    <span className="font-medium">March 20-27, 2024</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <Clock className="h-4 w-4 text-purple-600" />
                    <span className="font-medium">All Day</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <MapPin className="h-4 w-4 text-purple-600" />
                    <span className="font-medium">At Home</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600 font-medium">156/200 joined</span>
                  </div>
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700 rounded-full px-6">
                    Join Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Load More */}
        <div className="text-center pt-8">
          <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-3 rounded-full">
            Load More Events
          </Button>
        </div>
      </div>
    </div>
  )
}
