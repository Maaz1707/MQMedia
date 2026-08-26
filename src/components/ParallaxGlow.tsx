"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type ParallaxGlowProps = {
  className?: string;
};

/**
 * A soft background glow that drifts at a different rate than the
 * foreground content as the section scrolls past — cheap, GPU-friendly
 * depth without any extra libraries.
 */
export default function ParallaxGlow({ className = "" }: ParallaxGlowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        aria-hidden="true"
        style={{ y }}
        className={`absolute rounded-full bg-gold/10 blur-[100px] ${className}`}
      />
    </div>
  );
}
