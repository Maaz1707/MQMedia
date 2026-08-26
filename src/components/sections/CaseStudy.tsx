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
      className={`mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 border-t border-border px-6 py-20 md:grid-cols-2 ${
        reversed ? "md:[&>*:first-child]:order-2" : ""
      }`}
    >
      <Reveal>
        <div
          aria-hidden="true"
          className="bg-noise relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-3xl border border-border"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-transparent" />
          <span className="font-display text-gold-dark/50 relative text-6xl">
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
        <h3 className="font-display mt-3 text-2xl text-foreground md:text-3xl">
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
