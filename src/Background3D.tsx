import { Canvas } from '@react-three/fiber'

function Box() {
  return (
    <mesh>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#ff0000" emissive="#ff4444" emissiveIntensity={2} />
    </mesh>
  )
}

export default function Background3D() {
  return (
    <div className="fixed inset-0" style={{ zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        style={{ width: '100%', height: '100%' }}
      >
        <color attach="background" args={['#111']} />
        <ambientLight intensity={2} />
        <Box />
      </Canvas>
    </div>
  )
}
