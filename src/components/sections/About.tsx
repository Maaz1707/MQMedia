import Reveal from "@/components/Reveal";
import TextReveal from "@/components/TextReveal";
import SectionBackground from "@/components/SectionBackground";

export default function About() {
  return (
    <section id="about" className="section-divider relative overflow-hidden px-6 py-32 md:py-48">
      <SectionBackground src="/images/about.webp" />
      <div className="relative z-10 mx-auto max-w-3xl">
        <Reveal>
          <p className="text-center text-xs uppercase tracking-[0.3em] text-gold">
            About MQ Media
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="font-display mt-5 text-center text-4xl leading-tight text-foreground md:text-5xl">
            <TextReveal text="Trade Businesses Deserve Better Than a Template" />
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-8 max-w-xl text-center text-lg leading-relaxed text-muted">
            No disappearing freelancers. No agency bureaucracy. Just precise
            work, delivered by the person who designed it.
          </p>
        </Reveal>

        <Reveal delay={0.3} className="mt-14 border-t border-border pt-10 text-center">
          <p className="mx-auto max-w-xl text-base leading-relaxed text-foreground/80">
            MQ Media was founded by Maaz, a computer engineer who decided
            trade businesses deserved sharper design than they were
            getting. He&apos;s personally on every project &mdash; from
            the first sketch to the final file.
          </p>
          {/* REVIEW: confirm this accurately describes how work is
              actually delivered before launch — correct it if the real
              setup differs (e.g. if any discipline is fully outsourced
              rather than founder-coordinated). */}
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-foreground/80">
            That&apos;s not a freelancer&apos;s promise or an agency&apos;s
            org chart &mdash; it&apos;s one person leading every project
            directly, with specialised execution like paid social
            management or print production runs coordinated by him rather
            than handed off to someone you&apos;ll never talk to.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
