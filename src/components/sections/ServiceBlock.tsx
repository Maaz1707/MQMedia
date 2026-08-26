"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";

type ServiceBlockProps = {
  index: string;
  title: string;
  description: string;
  includes: string[];
  outcome: string;
  reversed?: boolean;
};

export default function ServiceBlock({
  index,
  title,
  description,
  includes,
  outcome,
  reversed = false,
}: ServiceBlockProps) {
  return (
    <div
      className={`section-divider mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-6 py-24 md:grid-cols-2 ${
        reversed ? "md:[&>*:first-child]:order-2" : ""
      }`}
    >
      <Reveal>
        <div
          aria-hidden="true"
          data-cursor-hover
          className="bg-noise group relative flex aspect-square items-center justify-center overflow-hidden border border-border transition-colors duration-500 hover:border-gold/50"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-gold/[0.06] via-transparent to-transparent transition-opacity duration-500 group-hover:from-gold/[0.12]" />
          <span className="font-display text-gold-dark/40 relative text-9xl transition-transform duration-700 ease-out group-hover:scale-105">
            {index}
          </span>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <span className="font-display text-sm text-gold-dark">{index}</span>
        <h3 className="font-display mt-3 text-3xl text-foreground md:text-4xl">
          {title}
        </h3>
        <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">
          {description}
        </p>

        <ul className="mt-7 flex flex-col gap-3">
          {includes.map((item, i) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-start gap-3 text-sm text-foreground/90 md:text-base"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
              {item}
            </motion.li>
          ))}
        </ul>

        <p className="mt-7 border-l-2 border-gold/50 pl-4 text-base italic leading-relaxed text-gold-light">
          {outcome}
        </p>
      </Reveal>
    </div>
  );
}
