"use client"

import { useRef, useMemo, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Sphere, Environment, Float, Sparkles } from "@react-three/drei"
import * as THREE from "three"

function RealisticEarth() {
  const earthRef = useRef<THREE.Mesh>(null)
  const cloudsRef = useRef<THREE.Mesh>(null)
  const atmosphereRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.003
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += 0.004
      cloudsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.02
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y -= 0.001
    }
  })

  // Create realistic Earth texture
  const earthTexture = useMemo(() => {
    const canvas = document.createElement("canvas")
    canvas.width = 2048
    canvas.height = 1024
    const ctx = canvas.getContext("2d")!

    // Ocean base
    const oceanGradient = ctx.createRadialGradient(1024, 512, 0, 1024, 512, 800)
    oceanGradient.addColorStop(0, "#0ea5e9")
    oceanGradient.addColorStop(0.3, "#0284c7")
    oceanGradient.addColorStop(0.6, "#0369a1")
    oceanGradient.addColorStop(1, "#1e40af")
    
    ctx.fillStyle = oceanGradient
    ctx.fillRect(0, 0, 2048, 1024)

    // Continents
    const continents = [
      // North America
      { x: 300, y: 300, w: 200, h: 180, rotation: -0.2 },
      // South America
      { x: 350, y: 600, w: 120, h: 200, rotation: 0.1 },
      // Europe
      { x: 950, y: 250, w: 80, h: 100, rotation: 0 },
      // Africa
      { x: 950, y: 400, w: 150, h: 250, rotation: 0.1 },
      // Asia
      { x: 1200, y: 200, w: 300, h: 200, rotation: 0.05 },
      // Australia
      { x: 1400, y: 650, w: 120, h: 80, rotation: 0 },
    ]

    continents.forEach((continent) => {
      ctx.save()
      ctx.translate(continent.x + continent.w/2, continent.y + continent.h/2)
      ctx.rotate(continent.rotation)
      
      const landGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, Math.max(continent.w, continent.h)/2)
      landGradient.addColorStop(0, "#22c55e")
      landGradient.addColorStop(0.4, "#16a34a")
      landGradient.addColorStop(0.8, "#15803d")
      landGradient.addColorStop(1, "#166534")
      
      ctx.fillStyle = landGradient
      ctx.fillRect(-continent.w/2, -continent.h/2, continent.w, continent.h)
      
      // Add mountain details
      for (let i = 0; i < 15; i++) {
        const x = (Math.random() - 0.5) * continent.w * 0.8
        const y = (Math.random() - 0.5) * continent.h * 0.8
        ctx.fillStyle = "#166534"
        ctx.beginPath()
        ctx.arc(x, y, Math.random() * 8 + 3, 0, Math.PI * 2)
        ctx.fill()
      }
      
      ctx.restore()
    })

    // Add islands and details
    for (let i = 0; i < 50; i++) {
      const x = Math.random() * 2048
      const y = Math.random() * 1024
      const size = Math.random() * 15 + 5
      ctx.fillStyle = "#15803d"
      ctx.beginPath()
      ctx.arc(x, y, size, 0, Math.PI * 2)
      ctx.fill()
    }

    return new THREE.CanvasTexture(canvas)
  }, [])

  // Create cloud texture
  const cloudTexture = useMemo(() => {
    const canvas = document.createElement("canvas")
    canvas.width = 1024
    canvas.height = 512
    const ctx = canvas.getContext("2d")!

    ctx.fillStyle = "rgba(0,0,0,0)"
    ctx.fillRect(0, 0, 1024, 512)

    // Generate cloud patterns
    for (let i = 0; i < 100; i++) {
      const x = Math.random() * 1024
      const y = Math.random() * 512
      const size = Math.random() * 50 + 20
      const opacity = Math.random() * 0.8 + 0.2
      
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`
      ctx.beginPath()
      ctx.arc(x, y, size, 0, Math.PI * 2)
      ctx.fill()
      
      // Add smaller cloud details
      for (let j = 0; j < 3; j++) {
        const offsetX = (Math.random() - 0.5) * size
        const offsetY = (Math.random() - 0.5) * size
        const smallSize = size * (Math.random() * 0.5 + 0.3)
        ctx.beginPath()
        ctx.arc(x + offsetX, y + offsetY, smallSize, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    return new THREE.CanvasTexture(canvas)
  }, [])

  // Create bump map for surface details
  const bumpTexture = useMemo(() => {
    const canvas = document.createElement("canvas")
    canvas.width = 1024
    canvas.height = 512
    const ctx = canvas.getContext("2d")!

    // Base gray
    ctx.fillStyle = "#808080"
    ctx.fillRect(0, 0, 1024, 512)

    // Add noise for terrain
    const imageData = ctx.getImageData(0, 0, 1024, 512)
    const data = imageData.data

    for (let i = 0; i < data.length; i += 4) {
      const noise = Math.random() * 100 - 50
      data[i] = Math.max(0, Math.min(255, 128 + noise))
      data[i + 1] = Math.max(0, Math.min(255, 128 + noise))
      data[i + 2] = Math.max(0, Math.min(255, 128 + noise))
    }

    ctx.putImageData(imageData, 0, 0)
    return new THREE.CanvasTexture(canvas)
  }, [])

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.2}>
      <group
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        scale={hovered ? 1.05 : 1}
      >
        {/* Earth */}
        <Sphere ref={earthRef} args={[2.5, 128, 128]}>
          <meshPhongMaterial
            map={earthTexture}
            bumpMap={bumpTexture}
            bumpScale={0.05}
            specularMap={earthTexture}
            shininess={100}
          />
        </Sphere>

        {/* Clouds */}
        <Sphere ref={cloudsRef} args={[2.52, 64, 64]}>
          <meshLambertMaterial
            map={cloudTexture}
            transparent
            opacity={0.4}
            depthWrite={false}
          />
        </Sphere>

        {/* Atmosphere */}
        <Sphere ref={atmosphereRef} args={[2.7, 64, 64]}>
          <meshBasicMaterial
            color="#4ade80"
            transparent
            opacity={0.1}
            side={THREE.BackSide}
          />
        </Sphere>

        {/* Atmosphere glow */}
        <Sphere args={[2.8, 64, 64]}>
          <meshBasicMaterial
            color="#22c55e"
            transparent
            opacity={0.05}
            side={THREE.BackSide}
          />
        </Sphere>
      </group>

      {/* Sparkles around Earth */}
      <Sparkles
        count={100}
        scale={8}
        size={3}
        speed={0.3}
        color="#4ade80"
      />
      
      {/* Additional particle effects */}
      <Sparkles
        count={50}
        scale={12}
        size={2}
        speed={0.2}
        color="#22c55e"
      />
    </Float>
  )
}

function FloatingEcoElements() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  const elements = [
    { pos: [4, 2, 1], color: "#22c55e", size: 0.1 },
    { pos: [-4, 1, 2], color: "#16a34a", size: 0.12 },
    { pos: [3, -2, -1], color: "#15803d", size: 0.08 },
    { pos: [-3, -1, -2], color: "#4ade80", size: 0.1 },
    { pos: [2, 3, 2], color: "#84cc16", size: 0.09 },
    { pos: [-2, -3, 1], color: "#65a30d", size: 0.11 },
  ]

  return (
    <group ref={groupRef}>
      {elements.map((element, index) => (
        <Float
          key={index}
          speed={1 + index * 0.2}
          rotationIntensity={0.5}
          floatIntensity={0.8}
        >
          <mesh position={element.pos as [number, number, number]}>
            <sphereGeometry args={[element.size, 16, 16]} />
            <meshStandardMaterial
              color={element.color}
              emissive={element.color}
              emissiveIntensity={0.2}
            />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

export default function Earth3D() {
  return (
    <div className="w-full h-[450px] md:h-[600px] relative">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.2} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1.5}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#4ade80" />
        <pointLight position={[5, 5, 5]} intensity={0.3} color="#22c55e" />
        
        <RealisticEarth />
        <FloatingEcoElements />
        
        <Environment preset="dawn" />
      </Canvas>
    </div>
  )
}
