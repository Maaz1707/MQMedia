"use client";

import { motion } from "framer-motion";
import Magnetic from "@/components/Magnetic";
import TextReveal from "@/components/TextReveal";
import ServiceHeroVisual from "./ServiceHeroVisual";
import type { HeroVariant } from "@/lib/service-pages-data";

type ServiceHeroProps = {
  eyebrow: string;
  headline: string;
  subline: string;
  variant: HeroVariant;
};

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function ServiceHero({ eyebrow, headline, subline, variant }: ServiceHeroProps) {
  return (
    <section className="bg-noise relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-24 text-center">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-40 md:opacity-60"
      >
        <ServiceHeroVisual variant={variant} />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/60 to-background" />

      <motion.div className="relative z-10" variants={container} initial="hidden" animate="visible">
        <motion.p variants={item} className="text-xs uppercase tracking-[0.35em] text-gold">
          {eyebrow}
        </motion.p>

        <h1 className="font-display text-gradient-gold mx-auto mt-7 max-w-4xl text-4xl font-medium leading-[1.15] md:text-6xl">
          <TextReveal text={headline} trigger="mount" delay={0.2} />
        </h1>

        <motion.p variants={item} className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-muted md:text-lg">
          {subline}
        </motion.p>

        <motion.div variants={item} className="mt-12 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Magnetic>
            <a
              href="#contact-cta"
              data-cursor-hover
              className="block border border-gold bg-gold px-9 py-4 text-xs uppercase tracking-[0.15em] text-background transition-colors duration-300 hover:bg-transparent hover:text-gold"
            >
              Book a Call
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="#included"
              data-cursor-hover
              className="block border border-border px-9 py-4 text-xs uppercase tracking-[0.15em] text-foreground/80 transition-colors duration-300 hover:border-gold hover:text-gold"
            >
              See What&apos;s Included
            </a>
          </Magnetic>
        </motion.div>
      </motion.div>
    </section>
  );
}
