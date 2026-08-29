"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "@/components/Reveal";
import TextReveal from "@/components/TextReveal";
import type { FaqItem } from "@/lib/service-pages-data";

function FaqRow({ item, index }: { item: FaqItem; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Reveal delay={index * 0.06}>
      <div className="border-b border-border">
        <button
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          data-cursor-hover
          aria-expanded={isOpen}
          className="flex w-full items-center justify-between gap-6 py-6 text-left"
        >
          <span className="font-display text-base text-foreground md:text-lg">{item.question}</span>
          <motion.span
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold"
          >
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </motion.span>
        </button>
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <p className="pb-6 pr-12 text-sm leading-relaxed text-muted md:text-base">{item.answer}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  );
}

export default function ServiceFAQ({ items }: { items: FaqItem[] }) {
  return (
    <section className="section-divider relative px-6 py-28 md:py-36">
      <div className="mx-auto max-w-3xl">
        <Reveal className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">FAQ</p>
          <h2 className="font-display mt-5 text-3xl text-foreground md:text-4xl">
            <TextReveal text="Questions Worth Answering Upfront" />
          </h2>
        </Reveal>

        <div className="mt-14">
          {items.map((item, i) => (
            <FaqRow key={item.question} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
