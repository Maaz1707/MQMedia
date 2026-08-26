"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import BrowserMockup from "@/components/BrowserMockup";
import CatalogueMockup from "@/components/CatalogueMockup";

export type Mockup = {
  type: "browser" | "catalogue";
  alt: string;
  src?: string;
};

type CaseStudyProps = {
  name: string;
  category: string;
  caption: string;
  mockups: Mockup[];
  reversed?: boolean;
};

export default function CaseStudy({
  name,
  category,
  caption,
  mockups,
  reversed = false,
}: CaseStudyProps) {
  return (
    <div
      className={`section-divider mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-6 py-28 md:grid-cols-2 ${
        reversed ? "md:[&>*:first-child]:order-2" : ""
      }`}
    >
      <div className={`grid gap-6 ${mockups.length > 1 ? "sm:grid-cols-2" : ""}`}>
        {mockups.map((mockup, i) => (
          <motion.div
            key={mockup.alt}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            <TiltCard>
              {mockup.type === "browser" ? (
                <BrowserMockup alt={mockup.alt} src={mockup.src} label={name} />
              ) : (
                <CatalogueMockup alt={mockup.alt} src={mockup.src} />
              )}
            </TiltCard>
          </motion.div>
        ))}
      </div>

      <Reveal delay={0.1}>
        <p className="text-xs uppercase tracking-[0.2em] text-gold">
          {category}
        </p>
        <h3 className="font-display mt-3 text-3xl text-foreground md:text-4xl">
          {name}
        </h3>
        <p className="mt-4 text-lg leading-relaxed text-muted">{caption}</p>
      </Reveal>
    </div>
  );
}
