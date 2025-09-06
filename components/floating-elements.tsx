"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float } from "@react-three/drei"
import * as THREE from "three"

function RealisticLeaf({
  position,
  color,
  scale = 1,
  rotationSpeed = 0.5,
}: {
  position: [number, number, number]
  color: string
  scale?: number
  rotationSpeed?: number
}) {
  const leafRef = useRef<THREE.Mesh>(null)

  const leafGeometry = useMemo(() => {
    const geometry = new THREE.PlaneGeometry(0.6, 1.2, 8, 16)
    const positions = geometry.attributes.position.array as Float32Array

    // Create leaf-like curvature
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i]
      const y = positions[i + 1]

      // Create natural leaf curve
      positions[i + 2] = Math.sin(y * 2) * 0.1 + Math.sin(x * 3) * 0.05
    }

    geometry.attributes.position.needsUpdate = true
    geometry.computeVertexNormals()
    return geometry
  }, [])

  const leafMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: color,
      transparent: true,
      opacity: 0.85,
      side: THREE.DoubleSide,
      roughness: 0.8,
      metalness: 0.1,
      // Add subtle subsurface scattering effect
      emissive: color,
      emissiveIntensity: 0.05,
    })
  }, [color])

  useFrame((state) => {
    if (leafRef.current) {
      leafRef.current.rotation.z = Math.sin(state.clock.elapsedTime * rotationSpeed) * 0.4
      leafRef.current.rotation.x = Math.cos(state.clock.elapsedTime * rotationSpeed * 0.7) * 0.2
      leafRef.current.rotation.y = Math.sin(state.clock.elapsedTime * rotationSpeed * 0.3) * 0.3
    }
  })

  return (
    <Float speed={1.5 + Math.random()} rotationIntensity={0.8} floatIntensity={1.2}>
      <mesh ref={leafRef} position={position} scale={scale} geometry={leafGeometry} material={leafMaterial} />
    </Float>
  )
}

function FloatingParticle({
  position,
  color,
  size = 0.05,
}: {
  position: [number, number, number]
  color: string
  size?: number
}) {
  const particleRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (particleRef.current) {
      particleRef.current.position.y += Math.sin(state.clock.elapsedTime * 2) * 0.001
      particleRef.current.material.opacity = 0.6 + Math.sin(state.clock.elapsedTime * 3) * 0.3
    }
  })

  return (
    <Float speed={0.8} rotationIntensity={0.3} floatIntensity={2}>
      <mesh ref={particleRef} position={position}>
        <sphereGeometry args={[size, 8, 8]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} transparent opacity={0.7} />
      </mesh>
    </Float>
  )
}

export default function FloatingElements() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.6} />

        <RealisticLeaf position={[-4, 3, -1]} color="#22c55e" scale={0.9} rotationSpeed={0.4} />
        <RealisticLeaf position={[4.5, -2, 0]} color="#16a34a" scale={0.7} rotationSpeed={0.6} />
        <RealisticLeaf position={[-3.5, -3, 1]} color="#4ade80" scale={0.8} rotationSpeed={0.3} />
        <RealisticLeaf position={[3, 3.5, -0.5]} color="#15803d" scale={0.6} rotationSpeed={0.5} />
        <RealisticLeaf position={[-2, 1, 1.5]} color="#10b981" scale={0.75} rotationSpeed={0.7} />
        <RealisticLeaf position={[2.5, -0.5, -1.5]} color="#059669" scale={0.65} rotationSpeed={0.4} />

        <FloatingParticle position={[-5, 2, 0]} color="#4ade80" size={0.03} />
        <FloatingParticle position={[5, -1, 0]} color="#22c55e" size={0.04} />
        <FloatingParticle position={[-2, 4, 0]} color="#16a34a" size={0.02} />
        <FloatingParticle position={[1, -4, 0]} color="#10b981" size={0.05} />
        <FloatingParticle position={[-4, -1, 0]} color="#059669" size={0.03} />
        <FloatingParticle position={[4, 2, 0]} color="#15803d" size={0.04} />
      </Canvas>
    </div>
  )
}
