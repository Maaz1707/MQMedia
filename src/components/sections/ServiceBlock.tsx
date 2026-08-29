"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import { SERVICE_ICON_MAP, type ServiceIconKey } from "@/components/Icons";
import type { ServiceSlug } from "@/lib/services-data";

type ServiceBlockProps = {
  index: string;
  slug: ServiceSlug;
  icon: ServiceIconKey;
  title: string;
  description: string;
  includes: string[];
  outcome: string;
  reversed?: boolean;
};

export default function ServiceBlock({
  index,
  slug,
  icon,
  title,
  description,
  includes,
  outcome,
  reversed = false,
}: ServiceBlockProps) {
  const Icon = SERVICE_ICON_MAP[icon];
  const blockRef = useRef<HTMLAnchorElement>(null);

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
    <Link
      ref={blockRef}
      href={`/services/${slug}`}
      data-cursor-hover
      data-cursor-text="Explore"
      className={`group section-divider mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 overflow-hidden px-6 py-24 md:grid-cols-2 ${
        reversed ? "md:[&>*:first-child]:order-2" : ""
      }`}
    >
      <Reveal>
        <motion.div style={{ y: panelY }}>
          <TiltCard>
            <div
              aria-hidden="true"
              data-cursor-hover
              className="group relative flex aspect-square items-center justify-center overflow-hidden border border-border transition-colors duration-500 hover:border-gold/50"
            >
              <Image
                src={`/images/${icon}.webp`}
                alt=""
                fill
                sizes="(min-width: 768px) 40vw, 90vw"
                className="object-cover opacity-60 transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-background/40 via-background/70 to-background/90 transition-opacity duration-500 group-hover:from-background/30" />
              <Icon className="relative h-24 w-24 text-gold drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)] transition-transform duration-700 ease-out group-hover:scale-110 md:h-32 md:w-32" />
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

          <span className="mt-7 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gold-dark transition-colors duration-300 group-hover:text-gold">
            Explore This Service
            <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
          </span>
        </motion.div>
      </Reveal>
    </Link>
  );
}
