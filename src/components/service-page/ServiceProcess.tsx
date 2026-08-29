"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import TextReveal from "@/components/TextReveal";
import type { ProcessStep } from "@/lib/service-pages-data";

const drawVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { pathLength: 1, opacity: 1 },
};

const glyphCommon = {
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function StepGlyph({ index }: { index: number }) {
  const transition = { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const };
  const shapes = [
    <motion.circle key="c" cx="12" cy="12" r="7" {...glyphCommon} variants={drawVariants} transition={transition} />,
    <motion.rect key="r" x="5" y="5" width="14" height="14" rx="2" {...glyphCommon} variants={drawVariants} transition={transition} />,
    <motion.polygon key="t" points="12,4 20,19 4,19" {...glyphCommon} variants={drawVariants} transition={transition} />,
    <motion.path key="p" d="M4 16 L9 8 L14 13 L20 5" {...glyphCommon} variants={drawVariants} transition={transition} />,
  ];
  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8">
      {shapes[index % shapes.length]}
    </svg>
  );
}

export default function ServiceProcess({ steps }: { steps: ProcessStep[] }) {
  return (
    <section className="section-divider relative bg-background-alt px-6 py-28 md:py-36">
      <div className="mx-auto max-w-5xl">
        <Reveal className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">How This Service Runs</p>
          <h2 className="font-display mt-5 text-3xl text-foreground md:text-4xl">
            <TextReveal text="A Process Specific to This Discipline" />
          </h2>
        </Reveal>

        <div className="relative mt-16 grid grid-cols-1 gap-14 md:grid-cols-4">
          <div aria-hidden="true" className="absolute left-0 right-0 top-9 hidden h-px bg-border md:block" />
          {steps.map((step, i) => {
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
                    <StepGlyph index={i} />
                  </motion.span>
                  <span className="font-display mt-4 text-xs text-gold-dark">{step.number}</span>
                  <h3 className="font-display mt-1 text-lg text-foreground">{step.title}</h3>
                  <p className="mt-2 max-w-[22ch] text-sm leading-relaxed text-muted">{step.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
