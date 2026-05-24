import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function TorusShape() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.15
      groupRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.25) * 0.15
    }
  })

  return (
    <group ref={groupRef}>
      {/* Main torus knot */}
      <mesh>
        <torusKnotGeometry args={[1.4, 0.15, 100, 16]} />
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#004466"
          metalness={0.4}
          roughness={0.3}
        />
      </mesh>

      {/* Orbital ring 1 — purple */}
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.9, 0.04, 16, 80]} />
        <meshStandardMaterial
          color="#8a2be2"
          emissive="#8a2be2"
          emissiveIntensity={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Orbital ring 2 — cyan */}
      <mesh rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
        <torusGeometry args={[1.7, 0.03, 16, 80]} />
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#00f0ff"
          emissiveIntensity={0.6}
          roughness={0.2}
        />
      </mesh>
    </group>
  )
}

function Stars() {
  const particles = useMemo(() => {
    const count = 200
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4 - 1
    }
    return pos
  }, [])

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#88ccff"
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        transparent
        opacity={0.7}
      />
    </points>
  )
}

export default function Background3D() {
  return (
    <div className="fixed inset-0" style={{ zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 55 }}
        gl={{ antialias: true }}
        style={{ width: '100%', height: '100%' }}
      >
        <color attach="background" args={['#080810']} />
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Suspense fallback={null}>
          <TorusShape />
          <Stars />
        </Suspense>
      </Canvas>
    </div>
  )
}
