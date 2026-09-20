"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import BrowserMockup from "@/components/BrowserMockup";
import CatalogueMockup from "@/components/CatalogueMockup";
import type { Testimonial } from "@/lib/portfolio-data";

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
  industry?: string;
  outcome?: string;
  testimonial?: Testimonial;
  liveUrl?: string;
  reversed?: boolean;
  onOpen: (layoutId: string, mockup: Mockup) => void;
};

export default function CaseStudy({
  name,
  category,
  caption,
  mockups,
  industry,
  outcome,
  testimonial,
  liveUrl,
  reversed = false,
  onOpen,
}: CaseStudyProps) {
  return (
    <div
      className={`section-divider mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-6 py-28 md:grid-cols-2 ${
        reversed ? "md:[&>*:first-child]:order-2" : ""
      }`}
    >
      <div className={`grid gap-6 ${mockups.length > 1 ? "sm:grid-cols-2" : ""}`}>
        {mockups.map((mockup, i) => {
          const layoutId = `portfolio-${name}-${mockup.alt}`;
          return (
            <motion.div
              key={mockup.alt}
              initial={{ opacity: 0, scale: 0.85, rotateX: 20, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformPerspective: 1200 }}
            >
              <motion.div
                layoutId={layoutId}
                onClick={() => onOpen(layoutId, mockup)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") onOpen(layoutId, mockup);
                }}
                data-cursor-hover
                data-cursor-text="View"
                className="group cursor-pointer"
              >
                <TiltCard>
                  {mockup.type === "browser" ? (
                    <BrowserMockup alt={mockup.alt} src={mockup.src} label={name} />
                  ) : (
                    <CatalogueMockup alt={mockup.alt} src={mockup.src} />
                  )}
                </TiltCard>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      <Reveal delay={0.1}>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <p className="text-xs uppercase tracking-[0.2em] text-gold">{category}</p>
          {industry && (
            <>
              <span className="text-border" aria-hidden="true">
                &middot;
              </span>
              <p className="text-xs uppercase tracking-[0.2em] text-muted">{industry}</p>
            </>
          )}
        </div>
        <h3 className="font-display mt-3 text-3xl text-foreground md:text-4xl">
          {name}
        </h3>
        <p className="mt-4 text-lg leading-relaxed text-muted">{caption}</p>

        {outcome && (
          <p className="mt-5 border-l-2 border-gold/50 pl-4 text-base leading-relaxed text-foreground/80">
            {outcome}
          </p>
        )}

        {testimonial && (
          <blockquote className="mt-6 border border-border bg-surface/40 p-6">
            <p className="text-base italic leading-relaxed text-foreground/90">
              &ldquo;{testimonial.quote}&rdquo;
            </p>
            <footer className="mt-3 text-xs uppercase tracking-[0.15em] text-muted">
              {testimonial.name}
              {testimonial.role ? `, ${testimonial.role}` : ""}
            </footer>
          </blockquote>
        )}

        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover
            className="mt-6 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-gold-dark transition-colors duration-300 hover:text-gold"
          >
            Visit Live Site
            <span aria-hidden="true">&rarr;</span>
          </a>
        )}
      </Reveal>
    </div>
  );
}
