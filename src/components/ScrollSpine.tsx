"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * A thin vertical rail down the left edge that fills as the page scrolls —
 * same proven technique as ScrollProgress (just vertical), so it carries
 * the same low perf risk. Desktop only: on narrow viewports it would sit
 * under one thumb's reach and just add clutter.
 */
export default function ScrollSpine() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 40,
    restDelta: 0.001,
  });

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed left-6 top-0 z-[60] hidden h-full w-px lg:block"
    >
      <div className="absolute inset-0 bg-border/40" />
      <motion.div
        style={{ scaleY }}
        className="absolute inset-0 origin-top bg-gradient-to-b from-gold-dark via-gold to-gold-light"
      />
    </div>
  );
}
