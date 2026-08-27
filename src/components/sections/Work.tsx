"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Reveal from "@/components/Reveal";
import TextReveal from "@/components/TextReveal";
import PortfolioLightbox, { type OpenMockup } from "@/components/PortfolioLightbox";
import CaseStudy, { type Mockup } from "./CaseStudy";

const PROJECTS: {
  name: string;
  category: string;
  caption: string;
  mockups: Mockup[];
}[] = [
  {
    name: "Bae Laban",
    category: "Menu Design",
    caption: "A menu built to be picked up, not skimmed.",
    mockups: [{ type: "catalogue", alt: "Bae Laban Menu" }],
  },
  {
    name: "Chopdar",
    category: "Catalogue Design",
    caption: "A catalogue with the polish of the products inside it.",
    mockups: [{ type: "catalogue", alt: "Chopdar Catalogue" }],
  },
  {
    name: "Bestech",
    category: "Catalogue & Website Design",
    caption: "One identity, carried across print and web.",
    mockups: [
      { type: "catalogue", alt: "Bestech Catalogue" },
      { type: "browser", alt: "Bestech Website" },
    ],
  },
  {
    name: "AIM Hitech",
    category: "Catalogue & Website Design",
    caption: "Precision engineering, presented with equal precision.",
    mockups: [
      { type: "catalogue", alt: "AIM Hitech Catalogue" },
      { type: "browser", alt: "AIM Hitech Website" },
    ],
  },
  // Add more projects here as they're completed.
];

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
