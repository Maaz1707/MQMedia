import Reveal from "@/components/Reveal";
import ServiceBlock from "./ServiceBlock";

const SERVICES = [
  {
    index: "01",
    title: "Branding & Identity",
    description:
      "A trade business without a distinct identity gets compared on price. We build the visual system that lets you compete on everything else.",
    includes: [
      "Logo & mark design",
      "Full visual identity system",
      "Brand guidelines & usage rules",
      "Brand voice & positioning",
    ],
    outcome:
      "A brand that photographs, prints and scales consistently — from your business card to your storefront.",
  },
  {
    index: "02",
    title: "Web Design & Development",
    description:
      "Custom-built on modern infrastructure, not assembled from a drag-and-drop template. Every site is designed around how your buyers actually decide.",
    includes: [
      "Custom Next.js websites",
      "E-commerce & booking integrations",
      "SEO-ready technical architecture",
      "Ongoing support & maintenance",
    ],
    outcome: "A site fast enough to rank, and sharp enough to convert.",
  },
  {
    index: "03",
    title: "Catalogue & Print Design",
    description:
      "Menus, product catalogues and brochures designed to be handled, not skimmed — print-ready and digital-ready from the same source.",
    includes: [
      "Menu & product catalogue layout",
      "Brochure & lookbook design",
      "Print-ready file production",
      "Digital/PDF distribution formats",
    ],
    outcome: "A catalogue built to be picked up, not scrolled past.",
  },
  {
    index: "04",
    title: "SEO & Growth Marketing",
    description:
      "Visibility for the buyers already searching for what you sell — built on technical fundamentals, not shortcuts that fade in a month.",
    includes: [
      "Technical SEO audits & fixes",
      "On-page & local search optimization",
      "GCC & India regional targeting",
      "Monthly growth reporting",
    ],
    outcome: "Found by the buyers actively looking for what you sell.",
  },
  {
    index: "05",
    title: "SMMA",
    description:
      "Ongoing social strategy and management that reflects the quality of the business behind it, not just a posting calendar.",
    includes: [
      "Content strategy & calendar",
      "Community management",
      "Paid social advertising",
      "Monthly performance reporting",
    ],
    outcome: "A social presence that closes deals, not just impressions.",
  },
];

export default function Services() {
  return (
    <section id="services" className="section-divider py-4">
      <Reveal className="px-6 pt-32 text-center md:pt-40">
        <p className="text-xs uppercase tracking-[0.3em] text-gold">
          What We Do
        </p>
        <h2 className="font-display mt-5 text-4xl text-foreground md:text-5xl">
          Five Disciplines, One Standard
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted md:text-lg">
          Every service below is run to the same level of precision, whether
          it&apos;s a logo or a lead-generation system.
        </p>
      </Reveal>

      {SERVICES.map((service, i) => (
        <ServiceBlock key={service.index} {...service} reversed={i % 2 === 1} />
      ))}
    </section>
  );
}
