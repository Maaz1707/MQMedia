"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Logo from "./Logo";
import Magnetic from "./Magnetic";
import { NAV_SECTIONS } from "@/lib/site-config";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled((prev) => {
      const next = v > 40;
      return prev === next ? prev : next;
    });
  });

  useEffect(() => {
    const sections = NAV_SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el !== null
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md transition-shadow duration-300 ${
        scrolled ? "shadow-[0_8px_30px_-16px_rgba(0,0,0,0.6)]" : ""
      }`}
    >
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between px-6 transition-[padding] duration-300 ${
          scrolled ? "py-2.5" : "py-4"
        }`}
      >
        <a href="#hero" onClick={() => setOpen(false)}>
          <motion.div animate={{ scale: scrolled ? 0.82 : 1 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }} className="origin-left">
            <Logo size={40} />
          </motion.div>
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {NAV_SECTIONS.map((section) => (
            <li key={section.id} className="relative">
              <a
                href={`#${section.id}`}
                className={`relative inline-block py-1 text-xs uppercase tracking-[0.15em] transition-colors hover:text-gold ${
                  activeId === section.id ? "text-gold" : "text-foreground/70"
                }`}
              >
                {section.label}
                {activeId === section.id && (
                  <motion.span
                    layoutId="nav-active-underline"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className="absolute -bottom-0.5 left-0 h-px w-full bg-gold"
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        <Magnetic className="hidden lg:inline-block">
          <a
            href="#contact"
            data-cursor-hover
            className="block border border-gold/50 px-5 py-2 text-xs uppercase tracking-[0.15em] text-gold transition-colors duration-300 hover:bg-gold hover:text-background"
          >
            Book a Call
          </a>
        </Magnetic>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 lg:hidden"
        >
          <span
            className={`h-px w-6 bg-gold transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
          />
          <span
            className={`h-px w-6 bg-gold transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
          />
        </button>
      </nav>

      {open && (
        <div className="border-t border-border px-6 pb-6 lg:hidden">
          <ul className="flex flex-col gap-4 pt-4">
            {NAV_SECTIONS.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  onClick={() => setOpen(false)}
                  className={`block text-xs uppercase tracking-[0.15em] hover:text-gold ${
                    activeId === section.id ? "text-gold" : "text-foreground/70"
                  }`}
                >
                  {section.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-2 inline-block border border-gold/50 px-5 py-2 text-xs uppercase tracking-[0.15em] text-gold"
              >
                Book a Call
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
