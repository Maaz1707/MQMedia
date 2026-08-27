"use client";

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate, useMotionValueEvent } from "framer-motion";
import Reveal from "@/components/Reveal";
import TextReveal from "@/components/TextReveal";
import SectionBackground from "@/components/SectionBackground";

const COLUMNS = ["Freelancers", "Large Agencies", "MQ Media"] as const;

type Row = { level: [number, number, number]; note: [string, string, string] };

const CATEGORIES: { category: string; row: Row }[] = [
  {
    category: "Speed",
    row: {
      level: [0.35, 0.55, 0.95],
      note: ["Inconsistent", "Layered approvals", "Founder-driven"],
    },
  },
  {
    category: "Design Quality",
    row: {
      level: [0.45, 0.65, 0.95],
      note: ["Varies by project", "Consistent, generic", "Sharp, never templated"],
    },
  },
  {
    category: "Attention",
    row: {
      level: [0.4, 0.5, 0.95],
      note: ["Limited scope", "Account managers", "Direct founder access"],
    },
  },
  {
    category: "Pricing Clarity",
    row: {
      level: [0.35, 0.55, 0.95],
      note: ["Unpredictable", "Retainer-heavy", "Transparent & scoped"],
    },
  },
];

const LAST = COLUMNS.length - 1;

export default function WhyMQ() {
  const [active, setActive] = useState(2);
  const trackRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const fraction = useMotionValue(active / LAST);
  const handleLeft = useTransform(fraction, (v) => `${v * 100}%`);

  const settleTo = (index: number) => {
    setActive(index);
    animate(fraction, index / LAST, { type: "spring", stiffness: 320, damping: 30 });
  };

  useMotionValueEvent(fraction, "change", (v) => {
    const nearest = Math.min(LAST, Math.max(0, Math.round(v * LAST)));
    setActive((prev) => (prev === nearest ? prev : nearest));
  });

  const updateFromClientX = (clientX: number) => {
    const rect = trackRef.current?.getBoundingClientRect();
    if (!rect) return;
    const raw = (clientX - rect.left) / rect.width;
    fraction.set(Math.min(1, Math.max(0, raw)));
  };

  const handlePointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    draggingRef.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    updateFromClientX(e.clientX);
  };
  const handlePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    updateFromClientX(e.clientX);
  };
  const handlePointerUp = () => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    const nearest = Math.round(fraction.get() * LAST);
    settleTo(nearest);
  };

  // Keep the handle in sync if the window is resized while mid-drag-free.
  useEffect(() => {
    fraction.set(active / LAST);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section id="why-mq" className="section-divider relative overflow-hidden bg-background-alt px-6 py-32 md:py-40">
      <SectionBackground src="/images/whymq.webp" />
      <div className="relative mx-auto max-w-3xl">
        <Reveal className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">Why MQ</p>
          <h2 className="font-display mt-5 text-4xl text-foreground md:text-5xl">
            <TextReveal text="Not a Freelancer. Not a Slow Agency." />
          </h2>
          <p className="mx-auto mt-5 max-w-md text-sm text-muted md:text-base">
            Drag the control, or tap a column, to compare.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-16">
          <div className="flex justify-between px-1">
            {COLUMNS.map((col, i) => {
              const isActive = active === i;
              const isMQ = i === 2;
              return (
                <button
                  key={col}
                  type="button"
                  data-cursor-hover
                  onClick={() => settleTo(i)}
                  className={`relative px-2 py-2 text-xs uppercase tracking-[0.15em] transition-all duration-300 sm:text-sm ${
                    isActive
                      ? isMQ
                        ? "scale-110 text-gold"
                        : "scale-105 text-foreground"
                      : "text-muted hover:text-foreground/80"
                  }`}
                  style={
                    isActive && isMQ
                      ? { filter: "drop-shadow(0 0 14px rgba(212,175,55,0.55))" }
                      : undefined
                  }
                >
                  {col}
                </button>
              );
            })}
          </div>

          <div
            ref={trackRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className="relative mt-4 h-2 w-full cursor-pointer touch-none rounded-full bg-border/60"
          >
            <div className="absolute inset-y-0 left-0 flex w-full items-center justify-between px-0.5">
              {COLUMNS.map((col) => (
                <span key={col} className="h-1.5 w-1.5 rounded-full bg-border" />
              ))}
            </div>
            <motion.div
              data-cursor-hover
              style={{ left: handleLeft }}
              className="absolute top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-gold bg-background shadow-[0_0_16px_rgba(212,175,55,0.5)]"
            />
          </div>
        </Reveal>

        <div className="mt-16 flex flex-col gap-3">
          {CATEGORIES.map((cat, ci) => (
            <Reveal key={cat.category} delay={ci * 0.06}>
              <div
                className={`border border-border/70 px-6 py-5 transition-colors duration-500 ${
                  active === 2 ? "border-gold/30 bg-gold/[0.03]" : ""
                }`}
              >
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display text-base text-foreground md:text-lg">{cat.category}</h3>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={`${cat.category}-${active}`}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className={`text-xs ${active === 2 ? "text-gold" : "text-muted"}`}
                    >
                      {cat.row.note[active]}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-border/60">
                  <motion.div
                    key={`bar-${cat.category}-${active}`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: cat.row.level[active] }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    style={{ transformOrigin: "left" }}
                    className={`h-full rounded-full ${
                      active === 2 ? "bg-gradient-to-r from-gold-dark via-gold to-gold-light" : "bg-muted/50"
                    }`}
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
