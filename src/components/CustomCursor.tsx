"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isFinePointer, setIsFinePointer] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 400, damping: 35, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 400, damping: 35, mass: 0.4 });

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    // Reading a browser API's current value once on mount (not derived from
    // React state) and syncing it in — not the cascading-render pattern the
    // rule targets.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsFinePointer(mq.matches);
    const update = (e: MediaQueryListEvent) => setIsFinePointer(e.matches);
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("custom-cursor-active", isFinePointer);
    return () => document.documentElement.classList.remove("custom-cursor-active");
  }, [isFinePointer]);

  useEffect(() => {
    if (!isFinePointer) return;

    const handleMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement;
      setIsHovering(Boolean(target.closest("a, button, [data-cursor-hover]")));
    };

    const handleLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMove);
    document.documentElement.addEventListener("mouseleave", handleLeave);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
    };
  }, [isFinePointer, isVisible, x, y]);

  if (!isFinePointer) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] mix-blend-difference"
      style={{
        x: springX,
        y: springY,
        opacity: isVisible ? 1 : 0,
      }}
    >
      <motion.div
        className="rounded-full bg-gold"
        animate={{
          width: isHovering ? 44 : 10,
          height: isHovering ? 44 : 10,
          x: isHovering ? -22 : -5,
          y: isHovering ? -22 : -5,
          opacity: isHovering ? 0.35 : 1,
        }}
        transition={{ type: "spring", stiffness: 350, damping: 28 }}
      />
    </motion.div>
  );
}
