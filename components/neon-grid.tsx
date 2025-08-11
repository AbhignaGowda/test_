"use client"

import { Canvas } from "@react-three/fiber"
import { useRef } from "react"
import type * as THREE from "three"
import { useFrame } from "@react-three/fiber"

function GridPlane() {
  const mesh = useRef<THREE.Mesh>(null!)
  useFrame((state) => {
    mesh.current.position.z = (state.clock.getElapsedTime() * 0.6) % 2
  })
  return (
    <mesh ref={mesh} rotation-x={-Math.PI / 2} position={[0, -1.5, 0]}>
      <planeGeometry args={[100, 100, 80, 80]} />
      <meshBasicMaterial wireframe color={"#3B82F6"} transparent opacity={0.24} />
    </mesh>
  )
}

export default function NeonGrid() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 2, 5], fov: 60 }}>
        <color attach="background" args={["#0b0f17"]} />
        <fog attach="fog" args={["#0b0f17", 6, 16]} />
        <GridPlane />
      </Canvas>
    </div>
  )
}
