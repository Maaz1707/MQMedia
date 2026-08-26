import Reveal from "@/components/Reveal";

const STEPS = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We learn your business, your buyers and your competitors before a single pixel moves — so the work is built on strategy, not guesswork.",
  },
  {
    number: "02",
    title: "Design",
    description:
      "Concepts and direction, developed with the founder directly on every project. You review real design decisions, not vague moodboards.",
  },
  {
    number: "03",
    title: "Build",
    description:
      "Sites get engineered, catalogues get produced, campaigns get set up — all to production quality, tested before it ever reaches you.",
  },
  {
    number: "04",
    title: "Launch & Grow",
    description:
      "We ship it, then stay on it. SEO and social work continues after launch so the result compounds instead of fading.",
  },
];

export default function Process() {
  return (
    <section id="process" className="border-t border-border bg-background-alt px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">
            How We Work
          </p>
          <h2 className="font-display mt-4 text-3xl text-foreground md:text-4xl">
            A Process Built for Certainty
          </h2>
        </Reveal>

        <div className="relative mt-16 grid grid-cols-1 gap-10 md:grid-cols-4">
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-8 hidden h-px bg-border md:block"
          />
          {STEPS.map((step, i) => (
            <Reveal key={step.number} delay={i * 0.1}>
              <div className="relative flex flex-col items-center text-center md:items-start md:text-left">
                <span className="font-display text-gradient-gold relative z-10 flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 bg-background text-xl">
                  {step.number}
                </span>
                <h3 className="font-display mt-5 text-lg text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
