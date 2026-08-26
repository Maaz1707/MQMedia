import Link from "next/link";

const SERVICES = [
  {
    title: "Design",
    description:
      "Brand identity, UI/UX and visual systems crafted to make your brand instantly recognizable.",
  },
  {
    title: "Web Development",
    description:
      "Fast, modern, responsive websites built to convert visitors into customers.",
  },
  {
    title: "SMMA",
    description:
      "Social media management and growth strategy that builds real audiences, not vanity metrics.",
  },
  {
    title: "Catalogue Making",
    description:
      "Polished product catalogues and lookbooks that present your offering with precision.",
  },
];

export default function ServicesOverview() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-gold">
          What We Do
        </p>
        <h2 className="font-display mt-4 text-3xl text-foreground md:text-4xl">
          Services Built Around Your Brand
        </h2>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {SERVICES.map((service) => (
          <div
            key={service.title}
            className="group rounded-2xl border border-border bg-surface p-8 transition-colors hover:border-gold/50"
          >
            <h3 className="font-display text-lg text-gold">
              {service.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {service.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/services"
          className="text-sm tracking-wide text-gold underline underline-offset-4 hover:text-gold-light"
        >
          Explore All Services &rarr;
        </Link>
      </div>
    </section>
  );
}
