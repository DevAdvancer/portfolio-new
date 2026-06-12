import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

const seededValue = (seed: number) => {
  const x = Math.sin(seed * 999) * 10000;
  return x - Math.floor(x);
};

const AnimatedSphere = ({ scale = 1.8 }: { scale?: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} scale={scale}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshDistortMaterial
          color="#4a5568"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
};

const FloatingParticles = ({ count = 30 }: { count?: number }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const xSeed = seededValue(i + 1);
      const ySeed = seededValue(i + 101);
      const zSeed = seededValue(i + 201);
      const scaleSeed = seededValue(i + 301);
      temp.push({
        position: [
          (xSeed - 0.5) * 8,
          (ySeed - 0.5) * 8,
          (zSeed - 0.5) * 8,
        ],
        scale: scaleSeed * 0.05 + 0.02,
      });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      for (let i = 0; i < count; i++) {
        const matrix = new THREE.Matrix4();
        const position = new THREE.Vector3(
          particles[i].position[0] + Math.sin(time + i) * 0.2,
          particles[i].position[1] + Math.cos(time + i) * 0.2,
          particles[i].position[2]
        );
        matrix.setPosition(position);
        matrix.scale(new THREE.Vector3(particles[i].scale, particles[i].scale, particles[i].scale));
        meshRef.current.setMatrixAt(i, matrix);
      }
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#64748b" transparent opacity={0.6} />
    </instancedMesh>
  );
};

const HeroScene = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [dpr, setDpr] = useState<number>(1);

  useEffect(() => {
    const checkViewport = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // Cap the device pixel ratio to keep paint cost low on retina displays
      setDpr(Math.min(window.devicePixelRatio || 1, mobile ? 1 : 1.5));
    };
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  return (
    <div className="absolute inset-0 opacity-60">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        dpr={dpr}
        performance={{ min: 0.5 }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#6366f1" />
        <pointLight position={[0, 4, 2]} intensity={1.2} color="#38bdf8" />
        <AnimatedSphere scale={isMobile ? 1.2 : 1.8} />
        <FloatingParticles count={isMobile ? 18 : 30} />
      </Canvas>
    </div>
  );
};

export default HeroScene;
