"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => null,
});

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollProgress = useRef(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    scrollProgress.current = v;
  });

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="bg-noise relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div className="h-[420px] w-[420px] md:h-[620px] md:w-[620px]">
          <HeroScene scrollProgress={scrollProgress} />
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-[120px]"
      />

      <div className="relative">
        <p className="text-xs uppercase tracking-[0.3em] text-gold">
          Design &amp; Growth Studio for Trade Businesses &mdash; India &amp; GCC
        </p>

        <h1 className="font-display text-gradient-gold mx-auto mt-6 max-w-5xl text-5xl leading-[1.05] tracking-tight md:text-7xl">
          The Difference Between Being Considered and Being Chosen.
        </h1>

        <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-muted md:text-lg">
          MQ Media builds brand identity, websites, catalogues and growth
          systems precise enough to win the room before you walk into it.
        </p>

        <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <a
            href="#contact"
            data-cursor-hover
            className="rounded-full bg-gold px-9 py-4 text-sm font-medium tracking-wide text-background shadow-[0_0_0_rgba(212,175,55,0)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_-8px_rgba(212,175,55,0.5)]"
          >
            Book a Call
          </a>
          <a
            href="#work"
            data-cursor-hover
            className="rounded-full border border-gold/40 px-9 py-4 text-sm tracking-wide text-gold transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:bg-gold/10"
          >
            See the Work
          </a>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute bottom-10 flex flex-col items-center gap-2 text-muted"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <span className="h-8 w-px animate-pulse bg-gold/50" />
      </div>
    </section>
  );
}
