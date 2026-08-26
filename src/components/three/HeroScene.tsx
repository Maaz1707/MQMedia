"use client";

import { useEffect, useRef, type RefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import * as THREE from "three";

type PrecisionMarkProps = {
  scrollProgress: RefObject<number>;
  pointerTilt: RefObject<number>;
};

function PrecisionMark({ scrollProgress, pointerTilt }: PrecisionMarkProps) {
  const group = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!group.current || !inner.current) return;
    const scroll = scrollProgress.current ?? 0;
    const tilt = pointerTilt.current ?? 0;

    group.current.rotation.y += delta * 0.18;
    group.current.rotation.x = 0.25 + scroll * Math.PI * 0.6 + tilt * 0.25;
    group.current.rotation.z = scroll * 0.4;
    group.current.scale.setScalar(1 - scroll * 0.15);

    inner.current.rotation.y -= delta * 0.32;
    inner.current.rotation.z += delta * 0.12 + scroll * 0.5;
  });

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[1.6, 0]} />
        <meshBasicMaterial color="#d4af37" wireframe transparent opacity={0.55} />
      </mesh>
      <mesh ref={inner}>
        <octahedronGeometry args={[0.85, 0]} />
        <meshBasicMaterial color="#f1d896" wireframe transparent opacity={0.8} />
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
      camera={{ position: [0, 0, 5], fov: 45 }}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      onPointerMove={(e) => {
        pointerTilt.current = e.clientY / window.innerHeight - 0.5;
      }}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[4, 4, 4]} intensity={1.2} color="#d4af37" />
      <PrecisionMark scrollProgress={scrollProgress} pointerTilt={pointerTilt} />
      <Sparkles count={60} scale={4.5} size={2} speed={0.25} color="#d4af37" opacity={0.5} />
    </Canvas>
  );
}
