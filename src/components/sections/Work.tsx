"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Reveal from "@/components/Reveal";
import TextReveal from "@/components/TextReveal";
import PortfolioLightbox, { type OpenMockup } from "@/components/PortfolioLightbox";
import CaseStudy from "./CaseStudy";
import { PROJECTS } from "@/lib/portfolio-data";

export default function Work() {
  const [open, setOpen] = useState<OpenMockup | null>(null);

  return (
    <section id="work" className="section-divider py-4">
      <Reveal className="px-6 pt-32 text-center md:pt-40">
        <p className="text-xs uppercase tracking-[0.3em] text-gold">
          Selected Work
        </p>
        <h2 className="font-display mt-5 text-4xl text-foreground md:text-5xl">
          <TextReveal text="Proof, Not Promises" />
        </h2>
      </Reveal>

      {PROJECTS.map((project, i) => (
        <CaseStudy
          key={project.name}
          {...project}
          reversed={i % 2 === 1}
          onOpen={(layoutId, mockup) =>
            setOpen({ layoutId, mockup, name: project.name, category: project.category })
          }
        />
      ))}

      <AnimatePresence>
        {open && <PortfolioLightbox item={open} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </section>
  );
}
