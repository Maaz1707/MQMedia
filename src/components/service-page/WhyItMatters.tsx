import Reveal from "@/components/Reveal";
import TextReveal from "@/components/TextReveal";

export default function WhyItMatters({ headline, body }: { headline: string; body: string[] }) {
  return (
    <section className="section-divider relative overflow-hidden px-6 py-28 md:py-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[50vh] w-[50vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.04] blur-[120px]"
      />
      <div className="relative mx-auto max-w-3xl text-center">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-gold">Why It Matters</p>
          <h2 className="font-display mt-5 text-3xl leading-tight text-foreground md:text-4xl">
            <TextReveal text={headline} />
          </h2>
        </Reveal>

        <div className="mt-8 flex flex-col gap-5">
          {body.map((paragraph, i) => (
            <Reveal key={i} delay={0.1 + i * 0.1}>
              <p className="text-base leading-relaxed text-muted md:text-lg">{paragraph}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
