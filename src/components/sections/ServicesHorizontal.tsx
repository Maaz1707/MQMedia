"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import TiltCard from "@/components/TiltCard";
import TextReveal from "@/components/TextReveal";
import { SERVICES } from "@/lib/services-data";

export default function ServicesHorizontal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${(SERVICES.length - 1) * 100}%`]
  );

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActiveIndex(Math.min(SERVICES.length - 1, Math.round(v * (SERVICES.length - 1))));
  });

  return (
    <div
      ref={containerRef}
      style={{ height: `${SERVICES.length * 100}vh` }}
      className="relative hidden lg:block"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div style={{ x }} className="flex h-full">
          {SERVICES.map((service) => (
            <div key={service.index} className="flex h-full w-screen shrink-0 items-center px-24">
              <div className="mx-auto grid w-full max-w-6xl grid-cols-2 items-center gap-16">
                <TiltCard>
                  <div
                    aria-hidden="true"
                    data-cursor-hover
                    className="bg-noise group relative flex aspect-square items-center justify-center overflow-hidden border border-border transition-colors duration-500 hover:border-gold/50"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-gold/[0.06] via-transparent to-transparent transition-opacity duration-500 group-hover:from-gold/[0.12]" />
                    <span className="font-display text-gold-dark/40 relative text-9xl transition-transform duration-700 ease-out group-hover:scale-105">
                      {service.index}
                    </span>
                  </div>
                </TiltCard>

                <div>
                  <span className="font-display text-sm text-gold-dark">{service.index}</span>
                  <h3 className="font-display mt-3 text-4xl text-foreground">
                    <TextReveal text={service.title} trigger="inView" />
                  </h3>
                  <p className="mt-5 text-lg leading-relaxed text-muted">
                    {service.description}
                  </p>

                  <ul className="mt-7 flex flex-col gap-3">
                    {service.includes.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-base text-foreground/90">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <p className="mt-7 border-l-2 border-gold/50 pl-4 text-base italic leading-relaxed text-gold-light">
                    {service.outcome}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 items-center gap-3">
          {SERVICES.map((service, i) => (
            <span
              key={service.index}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === activeIndex ? "w-8 bg-gold" : "w-1.5 bg-border"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
