import Link from "next/link";
import Reveal from "@/components/Reveal";
import TextReveal from "@/components/TextReveal";
import { SERVICE_ICON_MAP } from "@/components/Icons";
import { SERVICES, type ServiceSlug } from "@/lib/services-data";

export default function CrossSell({ currentSlug }: { currentSlug: ServiceSlug }) {
  const others = SERVICES.filter((s) => s.slug !== currentSlug);

  return (
    <section className="section-divider relative bg-background-alt px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">Often Paired With</p>
          <h2 className="font-display mt-5 text-2xl text-foreground md:text-3xl">
            <TextReveal text="The Rest of the Studio" />
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {others.map((service, i) => {
            const Icon = SERVICE_ICON_MAP[service.icon];
            return (
              <Reveal key={service.slug} delay={i * 0.06}>
                <Link
                  href={`/services/${service.slug}`}
                  data-cursor-hover
                  data-cursor-text="View"
                  className="group flex h-full flex-col justify-between border border-border p-6 transition-colors duration-300 hover:border-gold/40"
                >
                  <Icon className="h-7 w-7 text-gold transition-transform duration-500 group-hover:scale-110" />
                  <div className="mt-8">
                    <h3 className="font-display text-base text-foreground">{service.title}</h3>
                    <span className="mt-2 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.15em] text-gold-dark transition-colors duration-300 group-hover:text-gold">
                      Explore
                      <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
