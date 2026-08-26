"use client";

import { useEffect, useRef, type RefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

type PrecisionRingProps = {
  scrollProgress: RefObject<number>;
  pointerTilt: RefObject<number>;
};

function PrecisionRing({ scrollProgress, pointerTilt }: PrecisionRingProps) {
  const group = useRef<THREE.Group>(null);
  const outer = useRef<THREE.Mesh>(null);
  const inner = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!group.current || !outer.current || !inner.current) return;
    const scroll = scrollProgress.current ?? 0;
    const tilt = pointerTilt.current ?? 0;

    group.current.rotation.x = 0.5 + scroll * Math.PI * 0.5 + tilt * 0.2;
    group.current.rotation.y += delta * 0.12;
    group.current.scale.setScalar(1 - scroll * 0.12);

    outer.current.rotation.z += delta * 0.06;
    inner.current.rotation.z -= delta * 0.1;
  });

  return (
    <group ref={group}>
      <mesh ref={outer}>
        <torusGeometry args={[1.35, 0.05, 32, 96]} />
        <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.25} />
      </mesh>
      <mesh ref={inner} rotation={[Math.PI / 2.4, 0.3, 0]}>
        <torusGeometry args={[0.92, 0.028, 32, 96]} />
        <meshStandardMaterial color="#f1d896" metalness={0.9} roughness={0.3} />
      </mesh>
    </group>
  );
}

type HeroSceneProps = {
  scrollProgress: RefObject<number>;
};

export default function HeroScene({ scrollProgress }: HeroSceneProps) {
  const pointerTilt = useRef(0);

  // Some environments miss the ResizeObserver's initial fire, leaving the
  // canvas at its default 300x150 until something triggers a resize.
  // Nudge it a few times after mount so it reliably picks up its container size.
  useEffect(() => {
    const timers = [50, 200, 500].map((delay) =>
      setTimeout(() => window.dispatchEvent(new Event("resize")), delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 5], fov: 42 }}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      onPointerMove={(e) => {
        pointerTilt.current = e.clientY / window.innerHeight - 0.5;
      }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 4, 5]} intensity={2.4} color="#fff3d6" />
      <directionalLight position={[-4, -1, 2]} intensity={0.6} color="#f1d896" />
      <pointLight position={[0, 2, -4]} intensity={0.5} color="#9c7a24" />

      <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.4}>
        <PrecisionRing scrollProgress={scrollProgress} pointerTilt={pointerTilt} />
      </Float>
    </Canvas>
  );
}
