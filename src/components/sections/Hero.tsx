"use client";

import { useRef } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform, useVelocity, useSpring } from "framer-motion";
import Magnetic from "@/components/Magnetic";
import TextReveal from "@/components/TextReveal";
import { INTRO_TOTAL_S } from "@/lib/motion";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => null,
});

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: INTRO_TOTAL_S },
  },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const canvasOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0]);

  const { scrollY } = useScroll();
  const rawVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(rawVelocity, { stiffness: 260, damping: 32 });

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="bg-noise relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <Image
          src="/images/hero.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-[0.32]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
      </div>

      <motion.div
        aria-hidden="true"
        style={{ opacity: canvasOpacity }}
        className="pointer-events-none absolute inset-0"
      >
        <HeroScene scrollProgress={scrollYProgress} velocity={smoothVelocity} />
      </motion.div>

      <motion.div
        className="relative"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.p variants={item} className="text-xs uppercase tracking-[0.35em] text-gold">
          A Design &amp; Growth Studio, Worldwide
        </motion.p>

        <h1 className="font-display text-gradient-gold mx-auto mt-7 max-w-5xl text-5xl font-medium leading-[1.15] md:text-7xl">
          <TextReveal
            text="The Difference Between Being Considered and Being Chosen."
            trigger="mount"
            delay={INTRO_TOTAL_S + 0.14}
          />
        </h1>

        <motion.p
          variants={item}
          className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-muted md:text-lg"
        >
          MQ Media builds brand identity, websites, catalogues and growth
          systems precise enough to win the room before you walk into it.
        </motion.p>

        <motion.div variants={item} className="mt-12 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Magnetic>
            <a
              href="#contact"
              data-cursor-hover
              className="block border border-gold bg-gold px-9 py-4 text-xs uppercase tracking-[0.15em] text-background transition-colors duration-300 hover:bg-transparent hover:text-gold"
            >
              Book a Call
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="#work"
              data-cursor-hover
              className="block border border-border px-9 py-4 text-xs uppercase tracking-[0.15em] text-foreground/80 transition-colors duration-300 hover:border-gold hover:text-gold"
            >
              See the Work
            </a>
          </Magnetic>
        </motion.div>
      </motion.div>

      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: INTRO_TOTAL_S + 0.8 }}
        className="absolute bottom-10 flex flex-col items-center gap-2 text-muted"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <span className="h-8 w-px animate-pulse bg-gold/50" />
      </motion.div>
    </section>
  );
}
