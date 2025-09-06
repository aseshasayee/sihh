"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Sphere, Environment, Float, Sparkles } from "@react-three/drei"
import * as THREE from "three"

function EarthSphere() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  const earthTexture = useMemo(() => {
    const canvas = document.createElement("canvas")
    canvas.width = 1024
    canvas.height = 512
    const ctx = canvas.getContext("2d")!

    // Create realistic earth gradient
    const gradient = ctx.createRadialGradient(512, 256, 0, 512, 256, 400)
    gradient.addColorStop(0, "#4ade80")
    gradient.addColorStop(0.2, "#22c55e")
    gradient.addColorStop(0.4, "#16a34a")
    gradient.addColorStop(0.6, "#15803d")
    gradient.addColorStop(0.8, "#166534")
    gradient.addColorStop(1, "#14532d")

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 1024, 512)

    // Add continent shapes with more detail
    ctx.fillStyle = "#166534"
    // North America
    ctx.beginPath()
    ctx.ellipse(200, 180, 80, 60, -0.3, 0, Math.PI * 2)
    ctx.fill()

    // Europe/Africa
    ctx.beginPath()
    ctx.ellipse(500, 200, 60, 90, 0.2, 0, Math.PI * 2)
    ctx.fill()

    // Asia
    ctx.beginPath()
    ctx.ellipse(700, 160, 100, 70, 0.1, 0, Math.PI * 2)
    ctx.fill()

    // Add ocean details
    ctx.fillStyle = "#059669"
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * 1024
      const y = Math.random() * 512
      ctx.beginPath()
      ctx.arc(x, y, Math.random() * 10 + 5, 0, Math.PI * 2)
      ctx.fill()
    }

    return new THREE.CanvasTexture(canvas)
  }, [])

  const bumpTexture = useMemo(() => {
    const canvas = document.createElement("canvas")
    canvas.width = 512
    canvas.height = 256
    const ctx = canvas.getContext("2d")!

    ctx.fillStyle = "#888888"
    ctx.fillRect(0, 0, 512, 256)

    // Add noise for surface detail
    for (let i = 0; i < 1000; i++) {
      const x = Math.random() * 512
      const y = Math.random() * 256
      const brightness = Math.random() * 100 + 100
      ctx.fillStyle = `rgb(${brightness}, ${brightness}, ${brightness})`
      ctx.fillRect(x, y, 2, 2)
    }

    return new THREE.CanvasTexture(canvas)
  }, [])

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
      <Sphere ref={meshRef} args={[2.2, 128, 128]} position={[0, 0, 0]}>
        <meshStandardMaterial
          map={earthTexture}
          bumpMap={bumpTexture}
          bumpScale={0.1}
          roughness={0.8}
          metalness={0.1}
        />
      </Sphere>
      <Sphere args={[2.4, 64, 64]} position={[0, 0, 0]}>
        <meshBasicMaterial color="#4ade80" transparent opacity={0.1} side={THREE.BackSide} />
      </Sphere>
      <Sparkles count={50} scale={5} size={2} speed={0.5} color="#4ade80" />
    </Float>
  )
}

function FloatingTree() {
  const treeRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (treeRef.current) {
      treeRef.current.position.y = 2.5 + Math.sin(state.clock.elapsedTime * 0.6) * 0.15
      treeRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
  })

  return (
    <group ref={treeRef} position={[0, 2.5, 0]}>
      <mesh position={[0, -0.6, 0]}>
        <cylinderGeometry args={[0.08, 0.12, 1.2, 12]} />
        <meshStandardMaterial color="#8b4513" roughness={0.9} />
      </mesh>

      <mesh position={[0, 0.1, 0]}>
        <sphereGeometry args={[0.9, 24, 24]} />
        <meshStandardMaterial color="#22c55e" roughness={0.7} />
      </mesh>

      <mesh position={[0, 0.5, 0]}>
        <sphereGeometry args={[0.7, 20, 20]} />
        <meshStandardMaterial color="#16a34a" roughness={0.6} />
      </mesh>

      <mesh position={[0, 0.8, 0]}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial color="#15803d" roughness={0.5} />
      </mesh>

      {[...Array(6)].map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i * Math.PI) / 3) * 0.8,
            0.2 + Math.sin(i * 0.5) * 0.3,
            Math.sin((i * Math.PI) / 3) * 0.8,
          ]}
          rotation={[0, (i * Math.PI) / 3, Math.PI / 6]}
        >
          <cylinderGeometry args={[0.02, 0.04, 0.3, 6]} />
          <meshStandardMaterial color="#8b4513" />
        </mesh>
      ))}
    </group>
  )
}

export default function Earth3D() {
  return (
    <div className="w-full h-[450px] md:h-[550px]">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} castShadow />
        <pointLight position={[-10, -10, -5]} intensity={0.8} color="#4ade80" />
        <spotLight position={[0, 10, 0]} intensity={0.5} color="#22c55e" />

        <EarthSphere />
        <FloatingTree />

        <Environment preset="forest" />
      </Canvas>
    </div>
  )
}
