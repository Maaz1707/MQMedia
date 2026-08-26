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
      className={`section-divider mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-6 py-24 md:grid-cols-2 ${
        reversed ? "md:[&>*:first-child]:order-2" : ""
      }`}
    >
      <Reveal>
        <div
          aria-hidden="true"
          data-cursor-hover
          className="bg-noise group relative flex aspect-square items-center justify-center overflow-hidden rounded-3xl border border-border transition-all duration-500 hover:-translate-y-1 hover:border-gold/40 hover:shadow-[0_25px_70px_-20px_rgba(212,175,55,0.3)]"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-transparent transition-opacity duration-500 group-hover:from-gold/20" />
          <span className="font-display text-gold-dark/50 relative text-9xl transition-transform duration-500 group-hover:scale-110">
            {index}
          </span>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <span className="font-display text-sm text-gold-dark">{index}</span>
        <h3 className="font-display mt-3 text-3xl text-foreground md:text-4xl">
          {title}
        </h3>
        <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">
          {description}
        </p>

        <ul className="mt-7 flex flex-col gap-3">
          {includes.map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm text-foreground/90 md:text-base">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
              {item}
            </li>
          ))}
        </ul>

        <p className="mt-7 border-l-2 border-gold/50 pl-4 text-base italic leading-relaxed text-gold-light">
          {outcome}
        </p>
      </Reveal>
    </div>
  );
}
