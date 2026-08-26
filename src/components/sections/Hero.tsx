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
        <div className="h-[520px] w-[520px]">
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

        <h1 className="font-display text-gradient-gold mx-auto mt-6 max-w-4xl text-4xl leading-tight md:text-6xl">
          The Difference Between Being Considered and Being Chosen.
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-muted md:text-base">
          MQ Media builds brand identity, websites, catalogues and growth
          systems precise enough to win the room before you walk into it.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <a
            href="#contact"
            className="rounded-full bg-gold px-8 py-3 text-sm font-medium tracking-wide text-background transition-transform hover:scale-[1.03]"
          >
            Book a Call
          </a>
          <a
            href="#work"
            className="rounded-full border border-gold/40 px-8 py-3 text-sm tracking-wide text-gold transition-colors hover:bg-gold/10"
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
