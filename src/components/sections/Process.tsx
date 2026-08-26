"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Reveal from "@/components/Reveal";
import TextReveal from "@/components/TextReveal";
import { DiscoveryIcon, DesignIcon, BuildIcon, LaunchIcon } from "@/components/Icons";

const STEPS = [
  {
    number: "01",
    icon: DiscoveryIcon,
    title: "Discovery",
    description: "Understand your business, buyers and competitors.",
  },
  {
    number: "02",
    icon: DesignIcon,
    title: "Design",
    description: "Real direction from the founder, not a moodboard.",
  },
  {
    number: "03",
    icon: BuildIcon,
    title: "Build",
    description: "Engineered and produced to production quality.",
  },
  {
    number: "04",
    icon: LaunchIcon,
    title: "Launch & Grow",
    description: "We stay on it so the result compounds after launch.",
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
            <TextReveal text="A Process Built for Certainty" />
          </h2>
        </Reveal>

        <div ref={timelineRef} className="relative mt-20 grid grid-cols-1 gap-14 md:grid-cols-4">
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-10 hidden h-px bg-border md:block"
          />
          <motion.div
            aria-hidden="true"
            style={{ scaleX: lineScale }}
            className="absolute left-0 right-0 top-10 hidden h-px origin-left bg-gradient-to-r from-gold-dark via-gold to-gold-light md:block"
          />
          {STEPS.map((step, i) => (
            <Reveal key={step.number} delay={i * 0.1}>
              <div className="relative flex flex-col items-center text-center">
                <motion.span
                  initial={{ scale: 0.5, opacity: 0, rotate: -8 }}
                  whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ type: "spring", stiffness: 240, damping: 18, delay: i * 0.1 }}
                  className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full border border-gold/40 bg-background"
                >
                  <step.icon className="h-8 w-8 text-gold" />
                </motion.span>
                <span className="font-display mt-4 text-xs text-gold-dark">
                  {step.number}
                </span>
                <h3 className="font-display mt-1 text-xl text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-[16ch] text-sm leading-relaxed text-muted">
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
