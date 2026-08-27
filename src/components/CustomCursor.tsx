"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isFinePointer, setIsFinePointer] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [label, setLabel] = useState<string | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const dotX = useSpring(x, { stiffness: 600, damping: 45, mass: 0.3 });
  const dotY = useSpring(y, { stiffness: 600, damping: 45, mass: 0.3 });
  const ringX = useSpring(x, { stiffness: 180, damping: 24, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 180, damping: 24, mass: 0.6 });

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
      const labelEl = target.closest("[data-cursor-text]");
      setLabel(labelEl ? labelEl.getAttribute("data-cursor-text") : null);
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
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[100] h-1 w-1 rounded-full bg-gold"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible && !isHovering ? 1 : 0,
        }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[100] flex items-center justify-center rounded-full border border-gold bg-background/40 backdrop-blur-[1px]"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? (isHovering ? 0.95 : 0.5) : 0,
        }}
        animate={{
          width: label ? 68 : isHovering ? 52 : 28,
          height: label ? 68 : isHovering ? 52 : 28,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
      >
        <AnimatePresence>
          {label && (
            <motion.span
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.18 }}
              className="text-[10px] font-medium uppercase tracking-[0.1em] text-gold"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
