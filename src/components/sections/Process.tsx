"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Reveal from "@/components/Reveal";

const STEPS = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We learn your business, your buyers and your competitors before a single pixel moves — so the work is built on strategy, not guesswork.",
  },
  {
    number: "02",
    title: "Design",
    description:
      "Concepts and direction, developed with the founder directly on every project. You review real design decisions, not vague moodboards.",
  },
  {
    number: "03",
    title: "Build",
    description:
      "Sites get engineered, catalogues get produced, campaigns get set up — all to production quality, tested before it ever reaches you.",
  },
  {
    number: "04",
    title: "Launch & Grow",
    description:
      "We ship it, then stay on it. SEO and social work continues after launch so the result compounds instead of fading.",
  },
];

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
    <section id="process" className="section-divider bg-background-alt px-6 py-32 md:py-40">
      <div className="mx-auto max-w-5xl">
        <Reveal className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">
            How We Work
          </p>
          <h2 className="font-display mt-5 text-4xl text-foreground md:text-5xl">
            A Process Built for Certainty
          </h2>
        </Reveal>

        <div ref={timelineRef} className="relative mt-20 grid grid-cols-1 gap-12 md:grid-cols-4">
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-8 hidden h-px bg-border md:block"
          />
          <motion.div
            aria-hidden="true"
            style={{ scaleX: lineScale }}
            className="absolute left-0 right-0 top-8 hidden h-px origin-left bg-gradient-to-r from-gold-dark via-gold to-gold-light md:block"
          />
          {STEPS.map((step, i) => (
            <Reveal key={step.number} delay={i * 0.1}>
              <div className="relative flex flex-col items-center text-center md:items-start md:text-left">
                <span className="font-display text-gradient-gold relative z-10 flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 bg-background text-xl">
                  {step.number}
                </span>
                <h3 className="font-display mt-6 text-xl text-foreground">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
