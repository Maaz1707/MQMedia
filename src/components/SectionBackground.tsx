"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

type SectionBackgroundProps = {
  src: string;
};

/**
 * A subtle, low-opacity full-bleed background image with a dark gradient
 * overlay — supporting texture behind the content, never the focal point.
 * Drifts slightly on scroll for depth; scaled up so the drift never
 * reveals an edge. Purely decorative, so it's hidden from assistive tech.
 */
export default function SectionBackground({ src }: SectionBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 scale-110">
        <Image src={src} alt="" fill sizes="100vw" className="object-cover opacity-[0.18]" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/60 to-background" />
    </div>
  );
}
