"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import {
  motion,
  useScroll,
  useTransform,
  useVelocity,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";

const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => null,
});

/**
 * Carries the hero's 3D ring across the Hero -> About boundary instead of
 * fading it out at the section edge. It's a viewport-fixed overlay (not a
 * child of either section) so it can keep travelling — shrinking into a
 * small corner accent — while the page scrolls underneath it.
 */
export default function HeroSceneHandoff() {
  const [span, setSpan] = useState<{ start: number; end: number } | null>(null);
  const [corner, setCorner] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    const measure = () => {
      const hero = document.getElementById("hero");
      const about = document.getElementById("about");
      if (!hero || !about) return;
      setSpan({ start: hero.offsetTop, end: about.offsetTop + about.offsetHeight });
      setCorner({ x: window.innerWidth / 2 - 130, y: -(window.innerHeight / 2 - 120) });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollY } = useScroll();
  const rawVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(rawVelocity, { stiffness: 260, damping: 32 });

  const progress = useTransform(scrollY, (v) => {
    if (!span) return 0;
    const total = span.end - span.start;
    if (total <= 0) return 0;
    return Math.min(1, Math.max(0, (v - span.start) / total));
  });

  // The ring plays its normal hero animation for roughly the first half of
  // the combined span (the Hero section itself), then holds while it travels.
  const heroLocalProgress = useTransform(progress, [0, 0.5], [0, 1], { clamp: true });
  const travel = useTransform(progress, [0.35, 1], [0, 1], { clamp: true });

  const scaleRaw = useTransform(travel, [0, 1], [1, 0.24]);
  const xRaw = useTransform(travel, [0, 1], [0, corner.x]);
  const yRaw = useTransform(travel, [0, 1], [0, corner.y]);
  const opacity = useTransform(progress, [0, 0.9, 1], [1, 1, 0]);

  const scale = useSpring(scaleRaw, { stiffness: 110, damping: 26 });
  const x = useSpring(xRaw, { stiffness: 110, damping: 26 });
  const y = useSpring(yRaw, { stiffness: 110, damping: 26 });

  useMotionValueEvent(progress, "change", (v) => {
    // Wait until opacity has actually reached (~)0 before unmounting —
    // otherwise the ring would pop out mid-fade instead of disappearing
    // smoothly. Below 0.05 the whole component renders nothing, which
    // drops it from the compositor entirely for the rest of the page
    // (Services and beyond no longer pay for its continuous transform/
    // opacity updates on every scroll frame).
    const shouldMount = v < 0.995;
    setMounted((prev) => (prev === shouldMount ? prev : shouldMount));
  });

  if (!span || !mounted) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{ opacity, scale, x, y }}
      className="pointer-events-none fixed inset-0 z-[5] origin-center"
    >
      <HeroScene scrollProgress={heroLocalProgress} velocity={smoothVelocity} />
    </motion.div>
  );
}
