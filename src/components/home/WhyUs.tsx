const HIGHLIGHTS = [
  {
    stat: "50+",
    label: "Projects Delivered",
  },
  {
    stat: "4",
    label: "Core Disciplines",
  },
  {
    stat: "100%",
    label: "Precision Focused",
  },
];

export default function WhyUs() {
  return (
    <section className="border-y border-border bg-background-alt">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gold">
              Why MQ Media
            </p>
            <h2 className="font-display mt-4 text-3xl text-foreground md:text-4xl">
              A Single Partner for Every Touchpoint
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-muted md:text-base">
              Instead of juggling separate designers, developers and
              marketers, MQ Media brings design, web development, social
              media growth and catalogue production together under one
              roof &mdash; so your brand stays consistent everywhere it
              appears.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {HIGHLIGHTS.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-border bg-surface p-6 text-center"
              >
                <p className="font-display text-gradient-gold text-3xl">
                  {item.stat}
                </p>
                <p className="mt-2 text-xs uppercase tracking-wide text-muted">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
