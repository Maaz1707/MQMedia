"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import TextReveal from "@/components/TextReveal";
import SectionBackground from "@/components/SectionBackground";

type Bar = { label: string; level: number; note: string };

const CATEGORIES: { category: string; bars: Bar[] }[] = [
  {
    category: "Speed",
    bars: [
      { label: "Freelancers", level: 0.35, note: "Inconsistent" },
      { label: "Large Agencies", level: 0.55, note: "Layered approvals" },
      { label: "MQ Media", level: 0.95, note: "Founder-driven" },
    ],
  },
  {
    category: "Design Quality",
    bars: [
      { label: "Freelancers", level: 0.45, note: "Varies by project" },
      { label: "Large Agencies", level: 0.65, note: "Consistent, generic" },
      { label: "MQ Media", level: 0.95, note: "Sharp, never templated" },
    ],
  },
  {
    category: "Attention",
    bars: [
      { label: "Freelancers", level: 0.4, note: "Limited scope" },
      { label: "Large Agencies", level: 0.5, note: "Account managers" },
      { label: "MQ Media", level: 0.95, note: "Direct founder access" },
    ],
  },
  {
    category: "Pricing Clarity",
    bars: [
      { label: "Freelancers", level: 0.35, note: "Unpredictable" },
      { label: "Large Agencies", level: 0.55, note: "Retainer-heavy" },
      { label: "MQ Media", level: 0.95, note: "Transparent & scoped" },
    ],
  },
];

export default function WhyMQ() {
  return (
    <section id="why-mq" className="section-divider relative overflow-hidden bg-background-alt px-6 py-32 md:py-40">
      <SectionBackground src="/images/whymq.webp" />
      <div className="relative mx-auto max-w-4xl">
        <Reveal className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">
            Why MQ
          </p>
          <h2 className="font-display mt-5 text-4xl text-foreground md:text-5xl">
            <TextReveal text="Not a Freelancer. Not a Slow Agency." />
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-2">
          {CATEGORIES.map((cat, ci) => (
            <Reveal key={cat.category} delay={ci * 0.1}>
              <h3 className="font-display text-lg text-foreground">{cat.category}</h3>
              <div className="mt-5 flex flex-col gap-4">
                {cat.bars.map((bar, i) => (
                  <div key={bar.label}>
                    <div className="flex items-baseline justify-between text-xs">
                      <span
                        className={
                          bar.label === "MQ Media"
                            ? "font-medium uppercase tracking-[0.1em] text-gold"
                            : "uppercase tracking-[0.1em] text-muted"
                        }
                      >
                        {bar.label}
                      </span>
                      <span className="text-muted">{bar.note}</span>
                    </div>
                    <div className="mt-1.5 h-1.5 w-full overflow-hidden bg-border/60">
                      <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: bar.level }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{
                          duration: 0.9,
                          delay: ci * 0.1 + i * 0.12,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        style={{ transformOrigin: "left" }}
                        className={`h-full ${
                          bar.label === "MQ Media"
                            ? "bg-gradient-to-r from-gold-dark via-gold to-gold-light"
                            : "bg-muted/50"
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
