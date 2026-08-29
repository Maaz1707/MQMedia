import Reveal from "@/components/Reveal";
import TextReveal from "@/components/TextReveal";
import type { IncludedItem } from "@/lib/service-pages-data";

export default function IncludedBreakdown({ intro, items }: { intro: string; items: IncludedItem[] }) {
  return (
    <section id="included" className="section-divider relative px-6 py-28 md:py-36">
      <div className="mx-auto max-w-5xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">What&apos;s Included</p>
          <h2 className="font-display mt-5 text-3xl text-foreground md:text-4xl">
            <TextReveal text="Every Deliverable, Explained" />
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted">{intro}</p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <div className="group relative overflow-hidden border border-border bg-surface/40 p-8 transition-colors duration-500 hover:border-gold/40">
                <span className="font-display text-4xl text-gold-dark/40 transition-colors duration-500 group-hover:text-gold-dark/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display mt-4 text-xl text-foreground">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
