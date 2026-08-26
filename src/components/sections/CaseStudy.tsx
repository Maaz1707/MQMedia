"use client";

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
      <Reveal>
        <div className={`grid gap-6 ${mockups.length > 1 ? "sm:grid-cols-2" : ""}`}>
          {mockups.map((mockup) => (
            <TiltCard key={mockup.alt}>
              {mockup.type === "browser" ? (
                <BrowserMockup alt={mockup.alt} src={mockup.src} label={name} />
              ) : (
                <CatalogueMockup alt={mockup.alt} src={mockup.src} />
              )}
            </TiltCard>
          ))}
        </div>
      </Reveal>

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
