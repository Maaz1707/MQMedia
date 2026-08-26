import Reveal from "@/components/Reveal";
import PlaceholderNote from "@/components/PlaceholderNote";

export default function About() {
  return (
    <section id="about" className="section-divider px-6 py-32 md:py-40">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <p className="text-center text-xs uppercase tracking-[0.3em] text-gold">
            About MQ Media
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="font-display mt-5 text-center text-4xl leading-tight text-foreground md:text-5xl">
            Trade Businesses Deserve Better Than a Template
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-10 max-w-2xl text-center text-base leading-relaxed text-muted md:text-lg">
            Most trade businesses get the same three
            options: a freelancer who disappears after the invoice, a
            template that looks like every competitor&apos;s, or a large
            agency too slow and too expensive to justify. MQ Media exists
            because none of those are good enough for a business whose
            catalogue, website or menu is often the only thing standing
            between a buyer and a decision. We treat that first impression
            with the seriousness it deserves &mdash; sharp design, real
            engineering, and a founder who is on every project, not just
            the pitch.
          </p>
        </Reveal>

        <Reveal delay={0.3} className="mt-12">
          <PlaceholderNote>
            Maaz&apos;s founder story goes here &mdash; background, why MQ
            Media was started, and the personal belief that shapes how the
            studio approaches trade-business design. Replace with real copy
            once provided.
          </PlaceholderNote>
        </Reveal>
      </div>
    </section>
  );
}
