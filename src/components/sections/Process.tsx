"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
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

const glyphCommon = {
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

// Each glyph's strokes animate in on scroll-into-view (whileInView, once)
// rather than being tied to a continuous scroll position, so the "being
// constructed" feel doesn't depend on any scroll-jacking machinery.
const drawVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { pathLength: 1, opacity: 1 },
};

function StepGlyph({ index }: { index: number }) {
  const transition = { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const };

  if (index === 0) {
    return (
      <svg viewBox="0 0 24 24" className="h-9 w-9">
        <motion.circle cx="10.5" cy="10.5" r="6.5" {...glyphCommon} variants={drawVariants} transition={transition} />
        <motion.line
          x1="15.3"
          y1="15.3"
          x2="20.5"
          y2="20.5"
          {...glyphCommon}
          variants={drawVariants}
          transition={{ ...transition, delay: 0.15 }}
        />
      </svg>
    );
  }
  if (index === 1) {
    return (
      <svg viewBox="0 0 24 24" className="h-9 w-9">
        <motion.path
          d="M4 20l0.8-3.6L15.5 5.7l3.8 3.8L8.6 20.2 4 20z"
          {...glyphCommon}
          variants={drawVariants}
          transition={transition}
        />
        <motion.line
          x1="14.2"
          y1="7"
          x2="18"
          y2="10.8"
          {...glyphCommon}
          variants={drawVariants}
          transition={{ ...transition, delay: 0.15 }}
        />
      </svg>
    );
  }
  if (index === 2) {
    return (
      <svg viewBox="0 0 24 24" className="h-9 w-9">
        <motion.polygon points="12,3 21,8 12,13 3,8" {...glyphCommon} variants={drawVariants} transition={transition} />
        <motion.polyline
          points="3,12 12,17 21,12"
          {...glyphCommon}
          variants={drawVariants}
          transition={{ ...transition, delay: 0.12 }}
        />
        <motion.polyline
          points="3,16 12,21 21,16"
          {...glyphCommon}
          variants={drawVariants}
          transition={{ ...transition, delay: 0.24 }}
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="h-9 w-9">
      <motion.polygon
        points="3,11.5 21,3.5 13.5,20.5 11.3,12.7 3,11.5"
        {...glyphCommon}
        variants={drawVariants}
        transition={transition}
      />
      <motion.line
        x1="11.3"
        y1="12.7"
        x2="21"
        y2="3.5"
        {...glyphCommon}
        variants={drawVariants}
        transition={{ ...transition, delay: 0.15 }}
      />
    </svg>
  );
}

export default function Process() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 70%", "end 60%"],
  });
  const lineScale = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section id="process" className="section-divider relative overflow-hidden bg-background-alt px-6 py-32 md:py-40">
      <SectionBackground src="/images/process.webp" />
      <div className="relative mx-auto max-w-5xl">
        <Reveal className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">How We Work</p>
          <h2 className="font-display mt-5 text-4xl text-foreground md:text-5xl">
            <TextReveal text="A Process Built for Certainty" />
          </h2>
        </Reveal>

        <div ref={timelineRef} className="relative mt-20 grid grid-cols-1 gap-14 md:grid-cols-4">
          <div aria-hidden="true" className="absolute left-0 right-0 top-10 hidden h-px bg-border md:block" />
          <motion.div
            aria-hidden="true"
            style={{ scaleX: lineScale }}
            className="absolute left-0 right-0 top-10 hidden h-px origin-left bg-gradient-to-r from-gold-dark via-gold to-gold-light md:block"
          />
          {STEPS.map((step, i) => {
            const badgeVariants = {
              hidden: { scale: 0.5, opacity: 0, rotate: -8 },
              visible: {
                scale: 1,
                opacity: 1,
                rotate: 0,
                transition: { type: "spring" as const, stiffness: 240, damping: 18, delay: i * 0.1 },
              },
            };
            return (
              <Reveal key={step.number} delay={i * 0.1}>
                <div className="relative flex flex-col items-center text-center">
                  <motion.span
                    variants={badgeVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full border border-gold/40 bg-background text-gold"
                  >
                    {/* StepGlyph's strokes use variants={drawVariants} with no
                        own trigger, so they inherit the "hidden"/"visible"
                        state from this span automatically. */}
                    <StepGlyph index={i} />
                  </motion.span>
                  <span className="font-display mt-4 text-xs text-gold-dark">{step.number}</span>
                  <h3 className="font-display mt-1 text-xl text-foreground">{step.title}</h3>
                  <p className="mt-2 max-w-[16ch] text-sm leading-relaxed text-muted">{step.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
