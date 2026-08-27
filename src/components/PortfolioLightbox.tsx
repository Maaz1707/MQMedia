"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import BrowserMockup from "@/components/BrowserMockup";
import CatalogueMockup from "@/components/CatalogueMockup";
import type { Mockup } from "@/components/sections/CaseStudy";

export type OpenMockup = {
  layoutId: string;
  name: string;
  category: string;
  mockup: Mockup;
};

export default function PortfolioLightbox({
  item,
  onClose,
}: {
  item: OpenMockup;
  onClose: () => void;
}) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <>
      <motion.div
        aria-hidden="true"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        className="fixed inset-0 z-[90] bg-background/92 backdrop-blur-md"
      />
      <div className="fixed inset-0 z-[91] flex items-center justify-center p-6 md:p-14">
        <motion.div
          layoutId={item.layoutId}
          transition={{ type: "spring", stiffness: 260, damping: 30 }}
          className="w-full max-w-3xl"
        >
          {item.mockup.type === "browser" ? (
            <BrowserMockup alt={item.mockup.alt} src={item.mockup.src} label={item.name} />
          ) : (
            <CatalogueMockup alt={item.mockup.alt} src={item.mockup.src} />
          )}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-gold">{item.category}</p>
          <p className="font-display mt-1 text-lg text-foreground">{item.name}</p>
        </motion.div>
        <button
          type="button"
          onClick={onClose}
          data-cursor-hover
          aria-label="Close preview"
          className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center border border-border text-foreground/80 transition-colors hover:border-gold hover:text-gold md:right-10 md:top-10"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="5" y1="5" x2="19" y2="19" />
            <line x1="19" y1="5" x2="5" y2="19" />
          </svg>
        </button>
      </div>
    </>
  );
}
