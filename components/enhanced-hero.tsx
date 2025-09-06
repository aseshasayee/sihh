"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Leaf, Users, Award, TrendingUp } from "lucide-react"
import Earth3D from "./3d-earth"
import FloatingElements from "./floating-elements"
import AnimatedStats from "./animated-stats"

export default function EnhancedHero() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 overflow-hidden">
      <FloatingElements />

      <div className="container mx-auto px-4 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 z-10 relative">
            <div className="space-y-2">
              <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-200">
                <Leaf className="w-3 h-3 mr-1" />
                Join the Movement
              </Badge>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight text-balance">
                together
                <br />
                <span className="text-green-600">we can Save</span>
                <br />
                <span className="text-emerald-700">the planet</span>
              </h1>
            </div>

            <p className="text-lg md:text-xl text-gray-600 max-w-lg text-pretty leading-relaxed">
              Join thousands of students and teachers in our gamified eco-learning platform. Earn badges, complete
              challenges, and make a real impact on our environment.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg">
                Start Your Journey
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-3 text-lg bg-transparent"
              >
                Learn More
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-2 mx-auto">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <AnimatedStats value={15000} suffix="+" className="text-2xl font-bold text-gray-900" />
                <p className="text-sm text-gray-600">Active Students</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-full mb-2 mx-auto">
                  <Award className="w-6 h-6 text-emerald-600" />
                </div>
                <AnimatedStats value={50000} suffix="+" className="text-2xl font-bold text-gray-900" />
                <p className="text-sm text-gray-600">Badges Earned</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-teal-100 rounded-full mb-2 mx-auto">
                  <TrendingUp className="w-6 h-6 text-teal-600" />
                </div>
                <AnimatedStats value={1200} suffix="+" className="text-2xl font-bold text-gray-900" />
                <p className="text-sm text-gray-600">Schools</p>
              </div>
            </div>
          </div>

          {/* Right Content - 3D Earth */}
          <div className="relative">
            <Earth3D />
          </div>
        </div>
      </div>

      <div className="absolute top-20 left-10 w-20 h-20 bg-green-200 rounded-full opacity-20 blur-xl"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-emerald-200 rounded-full opacity-20 blur-xl"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-teal-200 rounded-full opacity-20 blur-xl"></div>
    </div>
  )
}
