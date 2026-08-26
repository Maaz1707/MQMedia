"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import PlaceholderNote from "@/components/PlaceholderNote";

type CaseStudyProps = {
  name: string;
  category: string;
  reversed?: boolean;
};

const NOTES = (name: string) => [
  `The problem: what ${name} needed before MQ. Replace with real case-study copy.`,
  "The approach: how MQ designed the solution. Replace with real case-study copy.",
  "The result: the measurable or observed outcome. Replace with real case-study copy.",
];

export default function CaseStudy({ name, category, reversed = false }: CaseStudyProps) {
  return (
    <div
      className={`section-divider mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-6 py-24 md:grid-cols-2 ${
        reversed ? "md:[&>*:first-child]:order-2" : ""
      }`}
    >
      <Reveal>
        <TiltCard>
          <div
            aria-hidden="true"
            data-cursor-hover
            className="bg-noise group relative flex aspect-[4/3] items-center justify-center overflow-hidden border border-border transition-colors duration-500 hover:border-gold/50"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gold/[0.06] via-transparent to-transparent transition-opacity duration-500 group-hover:from-gold/[0.12]" />
            <span className="font-display text-gold-dark/40 relative text-7xl transition-transform duration-700 ease-out group-hover:scale-105">
              {name
                .split(" ")
                .map((w) => w[0])
                .join("")
                .slice(0, 2)}
            </span>
          </div>
        </TiltCard>
      </Reveal>

      <Reveal delay={0.1}>
        <p className="text-xs uppercase tracking-[0.2em] text-gold">
          {category}
        </p>
        <h3 className="font-display mt-3 text-3xl text-foreground md:text-4xl">
          {name}
        </h3>

        <div className="mt-6 flex flex-col gap-4">
          {NOTES(name).map((note, i) => (
            <motion.div
              key={note}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <PlaceholderNote>{note}</PlaceholderNote>
            </motion.div>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
