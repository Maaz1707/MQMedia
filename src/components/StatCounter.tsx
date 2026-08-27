"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "framer-motion";

type StatCounterProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  delay?: number;
};

export default function StatCounter({ value, prefix = "", suffix = "", label, delay = 0 }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.3,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, delay]);

  return (
    <div ref={ref} className="text-center">
      <span className="font-display text-gradient-gold text-5xl font-medium md:text-6xl">
        {prefix}
        {display}
        {suffix}
      </span>
      <p className="mt-3 text-xs uppercase tracking-[0.25em] text-muted">{label}</p>
    </div>
  );
}
