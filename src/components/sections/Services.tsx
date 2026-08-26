import Reveal from "@/components/Reveal";
import TextReveal from "@/components/TextReveal";
import ServiceBlock from "./ServiceBlock";
import ServicesHorizontal from "./ServicesHorizontal";
import { SERVICES } from "@/lib/services-data";

export default function Services() {
  return (
    <section id="services" className="section-divider py-4">
      <Reveal className="px-6 pt-32 text-center md:pt-40">
        <p className="text-xs uppercase tracking-[0.3em] text-gold">
          What We Do
        </p>
        <h2 className="font-display mt-5 text-4xl text-foreground md:text-5xl">
          <TextReveal text="Five Disciplines, One Standard" />
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted md:text-lg">
          Every service below is run to the same level of precision, whether
          it&apos;s a logo or a lead-generation system.
        </p>
      </Reveal>

      <ServicesHorizontal />

      <div className="lg:hidden">
        {SERVICES.map((service, i) => (
          <ServiceBlock key={service.index} {...service} reversed={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}
