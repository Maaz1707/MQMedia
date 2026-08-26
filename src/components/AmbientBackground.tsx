"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";

/**
 * A fixed, very subtle gold glow that drifts slowly as the whole page
 * scrolls — keeps the background feeling alive and connected between
 * sections instead of a flat, static fill switching abruptly at each
 * section boundary. Deliberately restrained: no hue shifting, no strong
 * color changes — the palette stays near-black + gold throughout.
 */
export default function AmbientBackground() {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 20, restDelta: 0.001 });

  const y = useTransform(smooth, [0, 1], ["0%", "60%"]);
  const opacity = useTransform(smooth, [0, 0.5, 1], [0.5, 0.9, 0.5]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <motion.div
        style={{ y, opacity }}
        className="absolute left-1/2 top-0 h-[70vh] w-[70vh] -translate-x-1/2 rounded-full bg-gold/[0.05] blur-[140px]"
      />
    </div>
  );
}
