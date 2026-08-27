"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, type MotionValue } from "framer-motion";
import Reveal from "@/components/Reveal";
import TextReveal from "@/components/TextReveal";
import SectionBackground from "@/components/SectionBackground";

const STEPS = [
  {
    number: "01",
    title: "Discovery",
    description: "Understand your business, buyers and competitors.",
  },
  {
    number: "02",
    title: "Design",
    description: "Real direction from the founder, not a moodboard.",
  },
  {
    number: "03",
    title: "Build",
    description: "Engineered and produced to production quality.",
  },
  {
    number: "04",
    title: "Launch & Grow",
    description: "We stay on it so the result compounds after launch.",
  },
];

const N = STEPS.length;

// Each step's own glyph is drawn stroke-by-stroke as its "focus" value
// rises, so it reads as being constructed rather than fading in.
function StepGlyph({ index, focus }: { index: number; focus: MotionValue<number> }) {
  const draw = { pathLength: focus, opacity: focus };
  const common = {
    fill: "none" as const,
    stroke: "currentColor",
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  if (index === 0) {
    return (
      <svg viewBox="0 0 24 24" className="h-9 w-9">
        <motion.circle cx="10.5" cy="10.5" r="6.5" {...common} style={draw} />
        <motion.line x1="15.3" y1="15.3" x2="20.5" y2="20.5" {...common} style={draw} />
      </svg>
    );
  }
  if (index === 1) {
    return (
      <svg viewBox="0 0 24 24" className="h-9 w-9">
        <motion.path d="M4 20l0.8-3.6L15.5 5.7l3.8 3.8L8.6 20.2 4 20z" {...common} style={draw} />
        <motion.line x1="14.2" y1="7" x2="18" y2="10.8" {...common} style={draw} />
      </svg>
    );
  }
  if (index === 2) {
    return (
      <svg viewBox="0 0 24 24" className="h-9 w-9">
        <motion.polygon points="12,3 21,8 12,13 3,8" {...common} style={draw} />
        <motion.polyline points="3,12 12,17 21,12" {...common} style={draw} />
        <motion.polyline points="3,16 12,21 21,16" {...common} style={draw} />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="h-9 w-9">
      <motion.polygon points="3,11.5 21,3.5 13.5,20.5 11.3,12.7 3,11.5" {...common} style={draw} />
      <motion.line x1="11.3" y1="12.7" x2="21" y2="3.5" {...common} style={draw} />
    </svg>
  );
}

function StepPanel({ index, scrollYProgress }: { index: number; scrollYProgress: MotionValue<number> }) {
  const step = STEPS[index];
  const center = N > 1 ? index / (N - 1) : 0;
  const lo = N > 1 ? (index - 1) / (N - 1) : -1;
  const hi = N > 1 ? (index + 1) / (N - 1) : 1;

  const focusRaw = useTransform(scrollYProgress, [lo, center, hi], [0, 1, 0], { clamp: true });
  const focus = useSpring(focusRaw, { stiffness: 160, damping: 26 });

  const scale = useTransform(focus, [0, 1], [0.85, 1]);
  const opacity = useTransform(focus, [0, 1], [0.25, 1]);
  const y = useTransform(focus, [0, 1], [24, 0]);

  return (
    <div className="flex h-full w-screen shrink-0 items-center justify-center px-6">
      <motion.div style={{ scale, opacity, y }} className="flex max-w-sm flex-col items-center text-center">
        <motion.span
          style={{ borderColor: useTransform(focus, [0, 1], ["rgba(212,175,55,0.15)", "rgba(212,175,55,0.6)"]) }}
          className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full border bg-background text-gold"
        >
          <StepGlyph index={index} focus={focus} />
        </motion.span>
        <span className="font-display mt-6 text-xs text-gold-dark">{step.number}</span>
        <h3 className="font-display mt-2 text-2xl text-foreground md:text-3xl">{step.title}</h3>
        <p className="mt-3 max-w-[26ch] text-sm leading-relaxed text-muted md:text-base">
          {step.description}
        </p>
      </motion.div>
    </div>
  );
}

function ProgressRail({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const pathLength = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  return (
    <div className="pointer-events-none absolute left-0 right-0 top-16 mx-auto hidden max-w-3xl px-16 md:block">
      <svg viewBox="0 0 400 4" preserveAspectRatio="none" className="h-1 w-full overflow-visible">
        <line x1="0" y1="2" x2="400" y2="2" stroke="var(--border)" strokeWidth="1" />
        <motion.line
          x1="0"
          y1="2"
          x2="400"
          y2="2"
          stroke="url(#rail-gradient)"
          strokeWidth="2"
          style={{ pathLength }}
        />
        <defs>
          <linearGradient id="rail-gradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--gold-dark)" />
            <stop offset="100%" stopColor="var(--gold-light)" />
          </linearGradient>
        </defs>
      </svg>
      <div className="mt-[-4px] flex justify-between">
        {STEPS.map((step, i) => {
          const at = N > 1 ? i / (N - 1) : 0;
          return <RailTick key={step.number} at={at} scrollYProgress={scrollYProgress} />;
        })}
      </div>
    </div>
  );
}

function RailTick({ at, scrollYProgress }: { at: number; scrollYProgress: MotionValue<number> }) {
  const lo = at - 1 / (N - 1 || 1);
  const hi = at + 1 / (N - 1 || 1);
  const active = useTransform(scrollYProgress, [lo, at, hi], [0, 1, 0], { clamp: true });
  const scale = useSpring(useTransform(active, [0, 1], [1, 1.6]), { stiffness: 200, damping: 20 });
  const background = useTransform(active, [0, 1], ["var(--border)", "var(--gold)"]);

  return (
    <motion.span
      style={{ scale, background }}
      className="h-2.5 w-2.5 rounded-full ring-4 ring-background"
    />
  );
}

export default function Process() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${(N - 1) * 100}%`]);
  const xSpring = useSpring(x, { stiffness: 120, damping: 30 });

  return (
    <section id="process" className="section-divider relative overflow-hidden bg-background-alt">
      <SectionBackground src="/images/process.webp" />
      <div className="relative px-6 pt-32 md:pt-40">
        <Reveal className="mx-auto max-w-5xl text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">How We Work</p>
          <h2 className="font-display mt-5 text-4xl text-foreground md:text-5xl">
            <TextReveal text="A Process Built for Certainty" />
          </h2>
        </Reveal>
      </div>

      {/* Desktop: vertical scroll drives horizontal movement through the
          four steps, sticky-pinned in a tall track so scroll distance maps
          to horizontal travel instead of the page just passing by. */}
      <div ref={trackRef} className="relative mt-16 hidden md:block" style={{ height: `${N * 100}vh` }}>
        <div className="sticky top-0 h-screen overflow-hidden">
          <ProgressRail scrollYProgress={scrollYProgress} />
          <motion.div style={{ x: xSpring }} className="flex h-full">
            {STEPS.map((step, i) => (
              <StepPanel key={step.number} index={i} scrollYProgress={scrollYProgress} />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Mobile: a simple stacked list — horizontal scroll-jacking doesn't
          translate to touch scrolling, so it falls back to reveal-on-view. */}
      <div className="relative grid grid-cols-1 gap-14 px-6 py-20 md:hidden">
        {STEPS.map((step, i) => (
          <Reveal key={step.number} delay={i * 0.1} className="flex flex-col items-center text-center">
            <span className="flex h-20 w-20 items-center justify-center rounded-full border border-gold/40 bg-background text-gold">
              <StepGlyphStatic index={i} />
            </span>
            <span className="font-display mt-4 text-xs text-gold-dark">{step.number}</span>
            <h3 className="font-display mt-1 text-xl text-foreground">{step.title}</h3>
            <p className="mt-2 max-w-[22ch] text-sm leading-relaxed text-muted">{step.description}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function StepGlyphStatic({ index }: { index: number }) {
  const common = {
    fill: "none" as const,
    stroke: "currentColor",
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  if (index === 0) {
    return (
      <svg viewBox="0 0 24 24" className="h-8 w-8">
        <circle cx="10.5" cy="10.5" r="6.5" {...common} />
        <line x1="15.3" y1="15.3" x2="20.5" y2="20.5" {...common} />
      </svg>
    );
  }
  if (index === 1) {
    return (
      <svg viewBox="0 0 24 24" className="h-8 w-8">
        <path d="M4 20l0.8-3.6L15.5 5.7l3.8 3.8L8.6 20.2 4 20z" {...common} />
        <line x1="14.2" y1="7" x2="18" y2="10.8" {...common} />
      </svg>
    );
  }
  if (index === 2) {
    return (
      <svg viewBox="0 0 24 24" className="h-8 w-8">
        <polygon points="12,3 21,8 12,13 3,8" {...common} />
        <polyline points="3,12 12,17 21,12" {...common} />
        <polyline points="3,16 12,21 21,16" {...common} />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8">
      <polygon points="3,11.5 21,3.5 13.5,20.5 11.3,12.7 3,11.5" {...common} />
      <line x1="11.3" y1="12.7" x2="21" y2="3.5" {...common} />
    </svg>
  );
}
