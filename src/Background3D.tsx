import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// ─── Procedural grid texture for the torus ───
function makeTorusTex(size: number) {
  const c = document.createElement('canvas')
  c.width = c.height = size
  const ctx = c.getContext('2d')!
  const img = ctx.createImageData(size, size)
  for (let i = 0; i < img.data.length; i += 4) {
    const x = (i / 4) % size
    const y = Math.floor(i / 4 / size)
    const g = ((x % 8 < 1) || (y % 8 < 1)) ? 160 : 20
    const n = Math.random() * 35
    const v = g + n
    img.data[i] = 0
    img.data[i + 1] = v
    img.data[i + 2] = v
    img.data[i + 3] = 255
  }
  ctx.putImageData(img, 0, 0)
  const tex = new THREE.CanvasTexture(c)
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping
  tex.repeat.set(8, 16)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

// ─── Main torus knot ───
function TorusKnotGroup() {
  const g = useRef<THREE.Group>(null)
  const tex = useMemo(() => makeTorusTex(256), [])

  useFrame(({ clock }) => {
    if (g.current) {
      g.current.rotation.y = clock.getElapsedTime() * 0.14
      g.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.25) * 0.10
    }
  })

  return (
    <group ref={g}>
      {/* Wireframe ghost */}
      <mesh>
        <torusKnotGeometry args={[1.46, 0.20, 100, 16]} />
        <meshBasicMaterial wireframe color="#00f0ff" transparent opacity={0.15} toneMapped={false} />
      </mesh>
      {/* Solid glassy torus */}
      <mesh>
        <torusKnotGeometry args={[1.4, 0.15, 100, 16]} />
        <meshPhysicalMaterial
          color="#00ccdd"
          emissive="#003344"
          emissiveIntensity={0.3}
          roughness={0.18}
          metalness={0.05}
          clearcoat={0.5}
          clearcoatRoughness={0.25}
          map={tex}
          transparent
          opacity={0.55}
          toneMapped={false}
        />
      </mesh>
      {/* Orbital ring A */}
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.95, 0.06, 16, 100]} />
        <meshStandardMaterial color="#8a2be2" emissive="#551188" emissiveIntensity={0.45} roughness={0.2} metalness={0.1} transparent opacity={0.4} toneMapped={false} />
      </mesh>
      {/* Orbital ring B */}
      <mesh rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
        <torusGeometry args={[1.75, 0.04, 16, 100]} />
        <meshStandardMaterial color="#00e0ff" emissive="#003344" emissiveIntensity={0.4} roughness={0.2} metalness={0.1} transparent opacity={0.35} toneMapped={false} />
      </mesh>
    </group>
  )
}

// ─── Soft nebula glow around the knot ───
function Nebula() {
  const ref = useRef<THREE.Mesh>(null)
  const shader = useMemo(() => ({
    uniforms: { uTime: { value: 0 } },
    vertexShader: /* glsl */ `
      varying vec3 wPos; varying vec3 n;
      void main() { vec4 wp = modelMatrix * vec4(position,1.0); wPos=wp.xyz; n=normalize(mat3(modelMatrix)*normal); gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }
    `,
    fragmentShader: /* glsl */ `
      varying vec3 wPos; varying vec3 n; uniform float uTime;
      void main() {
        float d = length(wPos)/3.5;
        float a = exp(-d*d*2.0)*0.16*(1.0-abs(n.y)*0.6);
        a *= 0.85+0.15*sin(uTime*0.3)*cos(d*3.0);
        vec3 col = mix(vec3(0.0,0.55,0.75),vec3(0.3,0.08,0.5),d*1.5);
        gl_FragColor=vec4(col,a);
      }
    `,
  }), [])
  return (
    <mesh ref={ref} scale={[1,1,1]}>
      <sphereGeometry args={[3.0, 32, 32]} />
      <shaderMaterial uniforms={shader.uniforms} vertexShader={shader.vertexShader} fragmentShader={shader.fragmentShader} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
    </mesh>
  )
}

// ─── Stars ───
function Stars() {
  const { s, d } = useMemo(() => {
    const sc = 280; const sp = new Float32Array(sc*3)
    const dc = 90; const dp = new Float32Array(dc*3)
    for (let i=0;i<sc;i++) { sp[i*3]=(Math.random()-0.5)*14; sp[i*3+1]=(Math.random()-0.5)*10; sp[i*3+2]=(Math.random()-0.5)*6-2 }
    for (let i=0;i<dc;i++) { dp[i*3]=(Math.random()-0.5)*7; dp[i*3+1]=(Math.random()-0.5)*5.5; dp[i*3+2]=(Math.random()-0.5)*4-1 }
    return {s:sp,d:dp}
  }, [])
  return (
    <>
      <points>
        <bufferGeometry><bufferAttribute attach="attributes-position" args={[s,3]} /></bufferGeometry>
        <pointsMaterial size={0.025} color="#ccddff" blending={THREE.AdditiveBlending} depthWrite={false} transparent opacity={0.25} />
      </points>
      <points>
        <bufferGeometry><bufferAttribute attach="attributes-position" args={[d,3]} /></bufferGeometry>
        <pointsMaterial size={0.07} color="#7766aa" blending={THREE.AdditiveBlending} depthWrite={false} transparent opacity={0.12} />
      </points>
    </>
  )
}

// ─── Cosmic triangulated mesh background ───
function CosmicMesh() {
  const g = useRef<THREE.Group>(null)

  const { wireGeo, ptsGeo } = useMemo(() => {
    const raw = new THREE.IcosahedronGeometry(8.0, 5) // ~10k vertices
    const p = raw.attributes.position
    for (let i=0;i<p.count;i++) {
      const x=p.getX(i), y=p.getY(i), z=p.getZ(i)
      const len = Math.sqrt(x*x+y*y+z*z)
      const nx=x/len, ny=y/len, nz=z/len
      const r = 7.0 + Math.random()*1.8
      p.setXYZ(i, nx*r, ny*r, nz*r)
    }
    raw.computeVertexNormals()
    return { wireGeo: raw, ptsGeo: raw }
  }, [])

  useFrame(({ clock }) => {
    if (g.current) {
      g.current.rotation.y = clock.getElapsedTime() * 0.025
      g.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.08) * 0.03
    }
  })

  return (
    <group ref={g}>
      {/* Wireframe lines — very subtle */}
      <mesh geometry={wireGeo} renderOrder={-3}>
        <meshBasicMaterial color="#8855cc" wireframe transparent opacity={0.10} blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} />
      </mesh>
      {/* Glowing nodes */}
      <points geometry={ptsGeo} renderOrder={-3}>
        <pointsMaterial size={0.05} color="#bbddff" blending={THREE.AdditiveBlending} depthWrite={false} transparent opacity={0.25} />
      </points>
    </group>
  )
}

// ─── Main ───
export default function Background3D() {
  return (
    <div className="fixed inset-0" style={{ zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 55 }}
        gl={{ antialias: true, alpha: false, premultipliedAlpha: false }}
        dpr={[1, 2]}
        style={{ width: '100%', height: '100%' }}
      >
        <color attach="background" args={['#020212']} />
        <fog attach="fog" args={['#020212', 5, 11]} />
        <ambientLight intensity={0.3} />
        <directionalLight position={[4, 4, 5]} intensity={0.6} />
        <pointLight position={[2.5, 1.5, 2.5]} intensity={0.5} color="#00aacc" />
        <pointLight position={[-2.5, -1.5, 1]} intensity={0.35} color="#8822bb" />
        <CosmicMesh />
        <Nebula />
        <TorusKnotGroup />
        <Stars />
      </Canvas>
    </div>
  )
}
