"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { INTRO_TOTAL_S } from "@/lib/motion";

type HeroRingProps = {
  scrollYProgress: MotionValue<number>;
};

export default function HeroRing({ scrollYProgress }: HeroRingProps) {
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.82]);

  return (
    <motion.div
      aria-hidden="true"
      style={{ opacity, scale }}
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
        className="h-[380px] w-[380px] md:h-[560px] md:w-[560px]"
      >
        <svg viewBox="0 0 400 400" className="h-full w-full" fill="none">
          <defs>
            <linearGradient id="ring-gradient" x1="0" y1="0" x2="400" y2="400" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#f1d896" />
              <stop offset="50%" stopColor="#d4af37" />
              <stop offset="100%" stopColor="#9c7a24" />
            </linearGradient>
          </defs>
          <motion.circle
            cx="200"
            cy="200"
            r="160"
            stroke="url(#ring-gradient)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.7 }}
            transition={{ duration: 1.8, delay: INTRO_TOTAL_S, ease: [0.65, 0, 0.35, 1] }}
          />
          <motion.circle
            cx="200"
            cy="200"
            r="130"
            stroke="url(#ring-gradient)"
            strokeWidth="0.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.4 }}
            transition={{ duration: 1.8, delay: INTRO_TOTAL_S + 0.2, ease: [0.65, 0, 0.35, 1] }}
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}
