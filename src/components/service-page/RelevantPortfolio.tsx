"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Reveal from "@/components/Reveal";
import TextReveal from "@/components/TextReveal";
import PortfolioLightbox, { type OpenMockup } from "@/components/PortfolioLightbox";
import CaseStudy from "@/components/sections/CaseStudy";
import type { Project } from "@/lib/portfolio-data";

export default function RelevantPortfolio({ projects }: { projects: Project[] }) {
  const [open, setOpen] = useState<OpenMockup | null>(null);

  return (
    <section className="section-divider relative bg-background-alt py-4">
      <Reveal className="px-6 pt-28 text-center md:pt-36">
        <p className="text-xs uppercase tracking-[0.3em] text-gold">Relevant Work</p>
        <h2 className="font-display mt-5 text-3xl text-foreground md:text-4xl">
          <TextReveal text="Proof for This Discipline" />
        </h2>
      </Reveal>

      {projects.length > 0 ? (
        projects.map((project, i) => (
          <CaseStudy
            key={project.name}
            {...project}
            reversed={i % 2 === 1}
            onOpen={(layoutId, mockup) =>
              setOpen({ layoutId, mockup, name: project.name, category: project.category })
            }
          />
        ))
      ) : (
        <Reveal className="mx-auto max-w-lg px-6 py-20 text-center">
          <p className="text-base leading-relaxed text-muted">
            Dedicated portfolio pieces for this specific service are still in progress — ask on
            a call and we can walk you through relevant examples directly.
          </p>
        </Reveal>
      )}

      <AnimatePresence>
        {open && <PortfolioLightbox item={open} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </section>
  );
}
