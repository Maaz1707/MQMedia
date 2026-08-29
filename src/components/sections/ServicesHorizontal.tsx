"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import TiltCard from "@/components/TiltCard";
import TextReveal from "@/components/TextReveal";
import { SERVICE_ICON_MAP } from "@/components/Icons";
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
          {SERVICES.map((service) => {
            const Icon = SERVICE_ICON_MAP[service.icon];
            return (
              <Link
                key={service.index}
                href={`/services/${service.slug}`}
                data-cursor-hover
                data-cursor-text="Explore"
                className="group flex h-full w-screen shrink-0 items-center px-24"
              >
                <div className="mx-auto grid w-full max-w-6xl grid-cols-2 items-center gap-16">
                  <TiltCard>
                    <div
                      aria-hidden="true"
                      data-cursor-hover
                      className="group relative flex aspect-square items-center justify-center overflow-hidden border border-border transition-colors duration-500 hover:border-gold/50"
                    >
                      <Image
                        src={`/images/${service.icon}.webp`}
                        alt=""
                        fill
                        sizes="40vw"
                        className="object-cover opacity-60 transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-background/40 via-background/70 to-background/90 transition-opacity duration-500 group-hover:from-background/30" />
                      <Icon className="relative h-32 w-32 text-gold drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)] transition-transform duration-700 ease-out group-hover:scale-110" />
                      <span className="font-display absolute bottom-6 right-6 text-sm text-gold-dark/60">
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

                    <div className="mt-7 grid grid-cols-2 gap-3">
                      {service.includes.map((item) => (
                        <span
                          key={item}
                          className="border border-border px-3 py-2.5 text-center text-sm text-foreground/80"
                        >
                          {item}
                        </span>
                      ))}
                    </div>

                    <p className="mt-7 border-l-2 border-gold/50 pl-4 text-base italic leading-relaxed text-gold-light">
                      {service.outcome}
                    </p>

                    <span className="mt-7 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gold-dark transition-colors duration-300 group-hover:text-gold">
                      Explore This Service
                      <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
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
