import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedSphere() {
  const meshRef = useRef();

  useFrame((state) => {
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.3;
    meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.5;
  });

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]} position={[0, 0, -5]}>
      <meshStandardMaterial
        color="#6366f1"
        metalness={0.7}
        roughness={0.2}
        emissive="#1e1b4b"
        emissiveIntensity={0.2}
      />
    </Sphere>
  );
}

function Stars() {
  const ref = useRef();
  const [sphere] = useMemo(() => {
    const positions = new Float32Array(5000 * 3);
    for (let i = 0; i < 5000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
    }
    return [positions];
  }, []);

  useFrame((state) => {
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.1;
  });

  return (
    <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
}

function FloatingCubes() {
  const cubesRef = useRef();

  useFrame((state) => {
    cubesRef.current.children.forEach((cube, i) => {
      cube.rotation.x = Math.sin(state.clock.elapsedTime + i) * 0.5;
      cube.rotation.y = Math.sin(state.clock.elapsedTime * 0.7 + i) * 0.5;
      cube.position.y = Math.sin(state.clock.elapsedTime * 0.5 + i) * 2;
    });
  });

  return (
    <group ref={cubesRef}>
      {Array.from({ length: 5 }, (_, i) => (
        <mesh key={i} position={[i * 3 - 6, Math.sin(i) * 2, -10]}>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshStandardMaterial
            color={new THREE.Color().setHSL(i * 0.2, 0.7, 0.5)}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff6b6b" />
        <Stars />
        <AnimatedSphere />
        <FloatingCubes />
      </Canvas>
    </div>
  );
}