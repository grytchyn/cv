import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// ─── Procedural noise texture for the torus ───
function generateNoiseTexture(size: number) {
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  const ctx = canvas.getContext('2d')!
  const imageData = ctx.createImageData(size, size)
  for (let i = 0; i < imageData.data.length; i += 4) {
    const x = (i / 4) % size
    const y = Math.floor(i / 4 / size)
    const grid = ((x % 8 < 1) || (y % 8 < 1)) ? 180 : 30
    const noise = Math.random() * 40
    const v = grid + noise
    imageData.data[i] = 0
    imageData.data[i + 1] = v
    imageData.data[i + 2] = v
    imageData.data[i + 3] = 255
  }
  ctx.putImageData(imageData, 0, 0)
  const tex = new THREE.CanvasTexture(canvas)
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping
  tex.repeat.set(8, 16)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

// ─── Torus knot ───
function TorusShape() {
  const groupRef = useRef<THREE.Group>(null)
  const noiseTex = useMemo(() => generateNoiseTexture(256), [])

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.12
      groupRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.2) * 0.12
    }
  })

  return (
    <group ref={groupRef}>
      {/* ── Glowing wireframe skeleton ── */}
      <mesh>
        <torusKnotGeometry args={[1.44, 0.18, 100, 16]} />
        <meshBasicMaterial
          color="#00f0ff"
          wireframe
          transparent
          opacity={0.18}
          toneMapped={false}
        />
      </mesh>

      {/* ── Main torus knot — glass + grid texture ── */}
      <mesh>
        <torusKnotGeometry args={[1.4, 0.15, 100, 16]} />
        <meshPhysicalMaterial
          color="#00ccdd"
          emissive="#002233"
          emissiveIntensity={0.25}
          roughness={0.22}
          metalness={0.05}
          clearcoat={0.4}
          clearcoatRoughness={0.3}
          map={noiseTex}
          transparent
          opacity={0.55}
          toneMapped={false}
        />
      </mesh>

      {/* ── Orbital ring 1 — purple, glassy ── */}
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.9, 0.05, 16, 100]} />
        <meshStandardMaterial
          color="#8a2be2"
          emissive="#551188"
          emissiveIntensity={0.4}
          roughness={0.25}
          metalness={0.1}
          transparent
          opacity={0.35}
          toneMapped={false}
        />
      </mesh>

      {/* ── Orbital ring 2 — cyan, glassy ── */}
      <mesh rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
        <torusGeometry args={[1.7, 0.04, 16, 100]} />
        <meshStandardMaterial
          color="#00e0ff"
          emissive="#003344"
          emissiveIntensity={0.35}
          roughness={0.25}
          metalness={0.1}
          transparent
          opacity={0.3}
          toneMapped={false}
        />
      </mesh>
    </group>
  )
}

// ─── Nebula glow (large soft sphere) ───
function NebulaGlow() {
  const meshRef = useRef<THREE.Mesh>(null)

  const shader = useMemo(() => ({
    uniforms: {
      uTime: { value: 0 },
    },
    vertexShader: /* glsl */ `
      varying vec3 vWorldPos;
      varying vec3 vNormal;
      void main() {
        vec4 worldPos = modelMatrix * vec4(position, 1.0);
        vWorldPos = worldPos.xyz;
        vNormal = normalize(mat3(modelMatrix) * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      varying vec3 vWorldPos;
      varying vec3 vNormal;
      uniform float uTime;
      void main() {
        float dist = length(vWorldPos) / 3.5;
        float alpha = exp(-dist * dist * 1.8) * 0.18;
        float equator = 1.0 - abs(vNormal.y) * 0.7;
        alpha *= equator;
        alpha *= 0.85 + 0.15 * sin(uTime * 0.3) * cos(dist * 3.0);
        vec3 color = mix(vec3(0.0, 0.6, 0.8), vec3(0.35, 0.1, 0.55), dist * 1.5);
        gl_FragColor = vec4(color, alpha);
      }
    `,
  }), [])

  return (
    <mesh ref={meshRef} scale={[1, 1, 1]}>
      <sphereGeometry args={[3.0, 32, 32]} />
      <shaderMaterial
        uniforms={shader.uniforms}
        vertexShader={shader.vertexShader}
        fragmentShader={shader.fragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  )
}

// ─── Stars + cosmic dust ───
function Stars() {
  const { stars, dust } = useMemo(() => {
    const sc = 250
    const sp = new Float32Array(sc * 3)
    const dc = 80
    const dp = new Float32Array(dc * 3)
    for (let i = 0; i < sc; i++) {
      sp[i * 3] = (Math.random() - 0.5) * 12
      sp[i * 3 + 1] = (Math.random() - 0.5) * 9
      sp[i * 3 + 2] = (Math.random() - 0.5) * 5 - 1
    }
    for (let i = 0; i < dc; i++) {
      dp[i * 3] = (Math.random() - 0.5) * 6
      dp[i * 3 + 1] = (Math.random() - 0.5) * 5
      dp[i * 3 + 2] = (Math.random() - 0.5) * 3 - 0.5
    }
    return { stars: sp, dust: dp }
  }, [])

  return (
    <>
      {/* Bright stars */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[stars, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.022}
          color="#aaddff"
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          transparent
          opacity={0.3}
        />
      </points>
      {/* Close-in cosmic dust */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[dust, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          color="#6688aa"
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          transparent
          opacity={0.15}
        />
      </points>
    </>
  )
}

// ─── Cosmic triangulated mesh background ───
function CosmicMesh() {
  const groupRef = useRef<THREE.Group>(null)

  // Large icosahedron with displaced vertices for irregular triangles
  const { wireGeo, vertexGeo } = useMemo(() => {
    const baseGeo = new THREE.IcosahedronGeometry(7.5, 5) // detail 5: ~10k vertices
    const pos = baseGeo.attributes.position
    // Displace vertices randomly while keeping overall spherical shape
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i)
      const len = Math.sqrt(x * x + y * y + z * z)
      const nx = x / len, ny = y / len, nz = z / len
      // Random displacement: 85%-115% of base radius
      const noise = 0.85 + Math.random() * 0.3
      pos.setXYZ(i, nx * 7.5 * noise, ny * 7.5 * noise, nz * 7.5 * noise)
    }
    baseGeo.computeVertexNormals()
    return { wireGeo: baseGeo, vertexGeo: baseGeo }
  }, [])

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.03
      groupRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.1) * 0.04
    }
  })

  return (
    <group ref={groupRef}>
      {/* Wireframe — the connecting lines */}
      <mesh geometry={wireGeo} renderOrder={-2}>
        <meshBasicMaterial
          color="#8855cc"
          wireframe
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
      {/* Vertex dots — the glowing nodes */}
      <points geometry={vertexGeo} renderOrder={-2}>
        <pointsMaterial
          size={0.045}
          color="#bbddff"
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          transparent
          opacity={0.35}
        />
      </points>
    </group>
  )
}

// ─── Main export ───
export default function Background3D() {
  return (
    <div className="fixed inset-0" style={{ zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 55 }}
        gl={{
          antialias: true,
          alpha: false,
          premultipliedAlpha: false,
        }}
        dpr={[1, 2]}
        style={{ width: '100%', height: '100%' }}
      >
        {/* Deep dark background */}
        <color attach="background" args={['#050510']} />

        {/* Scene fog for depth */}
        <fog attach="fog" args={['#050510', 4, 10]} />

        {/* Dim ambient, keep directional for shape definition */}
        <ambientLight intensity={0.25} />
        <directionalLight position={[5, 5, 5]} intensity={0.5} />

        {/* Colored point lights near the knot */}
        <pointLight position={[2, 1, 2]} intensity={0.4} color="#00aacc" />
        <pointLight position={[-2, -1, 1]} intensity={0.3} color="#7722aa" />

        {/* Background: cosmic triangulated mesh */}
        <CosmicMesh />

        <NebulaGlow />
        <TorusShape />
        <Stars />
      </Canvas>
    </div>
  )
}
