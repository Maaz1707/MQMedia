import Reveal from "@/components/Reveal";

type ServiceBlockProps = {
  index: string;
  title: string;
  description: string;
  includes: string[];
  outcome: string;
  reversed?: boolean;
};

export default function ServiceBlock({
  index,
  title,
  description,
  includes,
  outcome,
  reversed = false,
}: ServiceBlockProps) {
  return (
    <div
      className={`mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 border-t border-border px-6 py-20 md:grid-cols-2 ${
        reversed ? "md:[&>*:first-child]:order-2" : ""
      }`}
    >
      <Reveal>
        <div
          aria-hidden="true"
          className="bg-noise relative flex aspect-square items-center justify-center overflow-hidden rounded-3xl border border-border"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-transparent" />
          <span className="font-display text-gold-dark/50 relative text-8xl">
            {index}
          </span>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <span className="font-display text-sm text-gold-dark">{index}</span>
        <h3 className="font-display mt-3 text-2xl text-foreground md:text-3xl">
          {title}
        </h3>
        <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">
          {description}
        </p>

        <ul className="mt-6 flex flex-col gap-3">
          {includes.map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm text-foreground/90">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
              {item}
            </li>
          ))}
        </ul>

        <p className="mt-6 border-l-2 border-gold/50 pl-4 text-sm italic leading-relaxed text-gold-light">
          {outcome}
        </p>
      </Reveal>
    </div>
  );
}
