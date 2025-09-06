"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { TreePine, Recycle, Users, Award } from "lucide-react"

interface AnimatedCounterProps {
  end: number
  duration?: number
  suffix?: string
}

function AnimatedCounter({ end, duration = 2000, suffix = "" }: AnimatedCounterProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      setCount(Math.floor(progress * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration])

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

export default function AnimatedStats() {
  const stats = [
    { icon: TreePine, value: 12450, label: "Trees Planted", color: "text-primary" },
    { icon: Recycle, value: 8230, label: "Kg Waste Recycled", color: "text-secondary" },
    { icon: Users, value: 5670, label: "Active Students", color: "text-accent" },
    { icon: Award, value: 234, label: "Schools Joined", color: "text-chart-4" },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      {stats.map((stat, index) => (
        <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
          <CardContent className="pt-6">
            <div className="relative">
              <stat.icon className={`h-12 w-12 ${stat.color} mx-auto mb-4 animate-pulse`} />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-ping opacity-75" />
            </div>
            <div className={`text-3xl font-bold ${stat.color} mb-2`}>
              <AnimatedCounter end={stat.value} />
            </div>
            <div className="text-muted-foreground font-medium">{stat.label}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
