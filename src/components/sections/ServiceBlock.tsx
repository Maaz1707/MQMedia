"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import { SERVICE_ICON_MAP, type ServiceIconKey } from "@/components/Icons";

type ServiceBlockProps = {
  index: string;
  icon: ServiceIconKey;
  title: string;
  description: string;
  includes: string[];
  outcome: string;
  reversed?: boolean;
};

export default function ServiceBlock({
  index,
  icon,
  title,
  description,
  includes,
  outcome,
  reversed = false,
}: ServiceBlockProps) {
  const Icon = SERVICE_ICON_MAP[icon];
  const blockRef = useRef<HTMLDivElement>(null);

  // Layered parallax: the visual panel drifts against the text at a
  // different rate as the block scrolls through the viewport, giving it
  // depth instead of moving as one flat unit.
  const { scrollYProgress } = useScroll({
    target: blockRef,
    offset: ["start end", "end start"],
  });
  const panelY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const textY = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <div
      ref={blockRef}
      className={`section-divider mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 overflow-hidden px-6 py-24 md:grid-cols-2 ${
        reversed ? "md:[&>*:first-child]:order-2" : ""
      }`}
    >
      <Reveal>
        <motion.div style={{ y: panelY }}>
          <TiltCard>
            <div
              aria-hidden="true"
              data-cursor-hover
              className="bg-noise group relative flex aspect-square items-center justify-center overflow-hidden border border-border transition-colors duration-500 hover:border-gold/50"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gold/[0.06] via-transparent to-transparent transition-opacity duration-500 group-hover:from-gold/[0.12]" />
              <Icon className="relative h-24 w-24 text-gold transition-transform duration-700 ease-out group-hover:scale-110 md:h-32 md:w-32" />
              <span className="font-display absolute bottom-6 right-6 text-sm text-gold-dark/60">
                {index}
              </span>
            </div>
          </TiltCard>
        </motion.div>
      </Reveal>

      <Reveal delay={0.1}>
        <motion.div style={{ y: textY }}>
          <span className="font-display text-sm text-gold-dark">{index}</span>
          <h3 className="font-display mt-3 text-3xl text-foreground md:text-4xl">
            {title}
          </h3>
          <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">
            {description}
          </p>

          <div className="mt-7 grid grid-cols-2 gap-3">
            {includes.map((item, i) => (
              <motion.span
                key={item}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className="border border-border px-3 py-2.5 text-center text-xs text-foreground/80 md:text-sm"
              >
                {item}
              </motion.span>
            ))}
          </div>

          <p className="mt-7 border-l-2 border-gold/50 pl-4 text-base italic leading-relaxed text-gold-light">
            {outcome}
          </p>
        </motion.div>
      </Reveal>
    </div>
  );
}
