"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom, ChromaticAberration } from "@react-three/postprocessing";
import type { BloomEffect, ChromaticAberrationEffect } from "postprocessing";
import type { MotionValue } from "framer-motion";
import * as THREE from "three";

type SceneProps = {
  scrollProgress: MotionValue<number>;
  velocity: MotionValue<number>;
};

function PrecisionRing({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const group = useRef<THREE.Group>(null);
  const outer = useRef<THREE.Mesh>(null);
  const inner = useRef<THREE.Mesh>(null);
  const pointerTarget = useRef({ x: 0, y: 0 });
  const pointerSmooth = useRef({ x: 0, y: 0 });
  const baseSpin = useRef(0);

  useEffect(() => {
    const handle = (e: PointerEvent) => {
      pointerTarget.current.x = e.clientX / window.innerWidth - 0.5;
      pointerTarget.current.y = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("pointermove", handle);
    return () => window.removeEventListener("pointermove", handle);
  }, []);

  useFrame((_, delta) => {
    if (!group.current || !outer.current || !inner.current) return;
    const scroll = scrollProgress.get();

    // Lerp toward the latest pointer reading each frame instead of snapping
    // straight to it, so the ring visibly "follows" the cursor rather than
    // jumping — the tactile, responsive feel the hero interaction is for.
    pointerSmooth.current.x = THREE.MathUtils.lerp(pointerSmooth.current.x, pointerTarget.current.x, 0.06);
    pointerSmooth.current.y = THREE.MathUtils.lerp(pointerSmooth.current.y, pointerTarget.current.y, 0.06);
    baseSpin.current += delta * 0.12;

    group.current.rotation.x = 0.5 + scroll * Math.PI * 0.6 + pointerSmooth.current.y * 0.45;
    group.current.rotation.y = baseSpin.current + pointerSmooth.current.x * 0.55;
    group.current.scale.setScalar(1 - scroll * 0.1);

    outer.current.rotation.z += delta * 0.06;
    inner.current.rotation.z -= delta * 0.1;
  });

  return (
    <group ref={group}>
      <mesh ref={outer}>
        <torusGeometry args={[1.35, 0.05, 32, 96]} />
        <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.22} />
      </mesh>
      <mesh ref={inner} rotation={[Math.PI / 2.4, 0.3, 0]}>
        <torusGeometry args={[0.92, 0.028, 32, 96]} />
        <meshStandardMaterial color="#f1d896" metalness={0.9} roughness={0.28} />
      </mesh>
    </group>
  );
}

function CameraRig({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const { camera } = useThree();

  useFrame(() => {
    const scroll = scrollProgress.get();
    // react-three-fiber's whole render model is mutating Three.js objects
    // directly inside useFrame — recreating them via React state every
    // frame would be a performance regression, not a correctness fix.
    /* eslint-disable react-hooks/immutability */
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, THREE.MathUtils.lerp(5, 3.5, scroll), 0.08);
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, Math.sin(scroll * Math.PI * 0.5) * 0.5, 0.08);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, -scroll * 0.3, 0.08);
    camera.lookAt(0, 0, 0);
    /* eslint-enable react-hooks/immutability */
  });

  return null;
}

function ScrollEffects({ velocity }: { velocity: MotionValue<number> }) {
  const bloomRef = useRef<BloomEffect>(null);
  const chromaRef = useRef<ChromaticAberrationEffect>(null);

  useFrame(() => {
    const v = Math.min(Math.abs(velocity.get()) / 2200, 1);
    if (bloomRef.current) {
      bloomRef.current.intensity = 0.35 + v * 0.55;
    }
    if (chromaRef.current) {
      const amount = 0.0012 + v * 0.0045;
      chromaRef.current.offset.set(amount, amount);
    }
  });

  return (
    <EffectComposer>
      <Bloom
        ref={bloomRef}
        luminanceThreshold={0.4}
        luminanceSmoothing={0.9}
        intensity={0.35}
        mipmapBlur
      />
      <ChromaticAberration ref={chromaRef} offset={[0.0012, 0.0012]} radialModulation={false} modulationOffset={0} />
    </EffectComposer>
  );
}

export default function HeroScene({ scrollProgress, velocity }: SceneProps) {
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
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 4, 5]} intensity={2.2} color="#fff3d6" />
      <directionalLight position={[-4, -1, 2]} intensity={0.6} color="#f1d896" />
      <pointLight position={[0, 2, -4]} intensity={0.5} color="#9c7a24" />

      <CameraRig scrollProgress={scrollProgress} />
      <PrecisionRing scrollProgress={scrollProgress} />
      <ScrollEffects velocity={velocity} />
    </Canvas>
  );
}
