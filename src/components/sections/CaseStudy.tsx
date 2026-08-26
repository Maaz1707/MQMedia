import Reveal from "@/components/Reveal";
import PlaceholderNote from "@/components/PlaceholderNote";

type CaseStudyProps = {
  name: string;
  category: string;
  reversed?: boolean;
};

export default function CaseStudy({ name, category, reversed = false }: CaseStudyProps) {
  return (
    <div
      className={`section-divider mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-6 py-24 md:grid-cols-2 ${
        reversed ? "md:[&>*:first-child]:order-2" : ""
      }`}
    >
      <Reveal>
        <div
          aria-hidden="true"
          data-cursor-hover
          className="bg-noise group relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-3xl border border-border transition-all duration-500 hover:-translate-y-1 hover:border-gold/40 hover:shadow-[0_25px_70px_-20px_rgba(212,175,55,0.3)]"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-transparent transition-opacity duration-500 group-hover:from-gold/20" />
          <span className="font-display text-gold-dark/50 relative text-7xl transition-transform duration-500 group-hover:scale-110">
            {name
              .split(" ")
              .map((w) => w[0])
              .join("")
              .slice(0, 2)}
          </span>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <p className="text-xs uppercase tracking-[0.2em] text-gold">
          {category}
        </p>
        <h3 className="font-display mt-3 text-3xl text-foreground md:text-4xl">
          {name}
        </h3>

        <div className="mt-6 flex flex-col gap-4">
          <PlaceholderNote>
            The problem: what {name} needed before MQ. Replace with real
            case-study copy.
          </PlaceholderNote>
          <PlaceholderNote>
            The approach: how MQ designed the solution. Replace with real
            case-study copy.
          </PlaceholderNote>
          <PlaceholderNote>
            The result: the measurable or observed outcome. Replace with
            real case-study copy.
          </PlaceholderNote>
        </div>
      </Reveal>
    </div>
  );
}
