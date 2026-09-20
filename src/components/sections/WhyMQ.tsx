"use client";

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { motion, useMotionValue, useTransform, animate, useMotionValueEvent } from "framer-motion";
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
            Every column is compared below — drag or tap to spotlight one.
          </p>
        </Reveal>

        {/* The three buttons are the real, fully keyboard-operable control —
            spotlighting a column is entirely achievable without the drag
            track below, which exists purely as a mouse/touch convenience. */}
        <Reveal delay={0.15} className="mt-16">
          <div className="flex justify-between px-1" role="group" aria-label="Spotlight a column">
            {COLUMNS.map((col, i) => {
              const isActive = active === i;
              const isMQ = i === 2;
              return (
                <button
                  key={col}
                  type="button"
                  data-cursor-hover
                  onClick={() => settleTo(i)}
                  aria-pressed={isActive}
                  className={`relative px-3 py-3 text-xs uppercase tracking-[0.15em] transition-all duration-300 sm:text-sm ${
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
            aria-hidden="true"
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
              style={{ left: handleLeft }}
              className="absolute top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-gold bg-background shadow-[0_0_16px_rgba(212,175,55,0.5)]"
            />
          </div>
        </Reveal>

        {/* All three columns' values are always in the markup for every
            category — the spotlight only adds visual emphasis, it never
            hides the other two, so nothing here is drag-only information. */}
        <div className="mt-16 flex flex-col gap-8">
          {CATEGORIES.map((cat, ci) => (
            <Reveal key={cat.category} delay={ci * 0.06}>
              <h3 className="font-display text-base text-foreground md:text-lg">{cat.category}</h3>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {COLUMNS.map((col, i) => {
                  const isSelected = active === i;
                  const isMQ = i === 2;
                  return (
                    <div
                      key={col}
                      className={`border px-4 py-4 transition-colors duration-500 ${
                        isSelected
                          ? isMQ
                            ? "border-gold/40 bg-gold/[0.05]"
                            : "border-foreground/25 bg-surface/60"
                          : "border-border/60"
                      }`}
                    >
                      <div className="flex items-baseline justify-between gap-2 text-xs">
                        <span
                          className={
                            isMQ ? "font-medium uppercase tracking-[0.1em] text-gold" : "uppercase tracking-[0.1em] text-muted"
                          }
                        >
                          {col}
                        </span>
                        <span className={isSelected ? "text-foreground/90" : "text-muted"}>
                          {cat.row.note[i]}
                        </span>
                      </div>
                      <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-border/60">
                        <motion.div
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: cat.row.level[i] }}
                          viewport={{ once: true, margin: "-60px" }}
                          transition={{ duration: 0.7, delay: ci * 0.05 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                          style={{ transformOrigin: "left" }}
                          className={`h-full rounded-full ${
                            isMQ ? "bg-gradient-to-r from-gold-dark via-gold to-gold-light" : "bg-muted/50"
                          }`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
