type ServiceSectionProps = {
  index: string;
  title: string;
  description: string;
  features: string[];
  reversed?: boolean;
};

export default function ServiceSection({
  index,
  title,
  description,
  features,
  reversed = false,
}: ServiceSectionProps) {
  return (
    <section className="border-b border-border">
      <div
        className={`mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 py-20 md:grid-cols-2 md:items-center ${
          reversed ? "md:[&>*:first-child]:order-2" : ""
        }`}
      >
        <div>
          <span className="font-display text-gold-dark text-5xl">
            {index}
          </span>
          <h2 className="font-display mt-4 text-2xl text-foreground md:text-3xl">
            {title}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">
            {description}
          </p>
        </div>

        <ul className="flex flex-col gap-4">
          {features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-3 rounded-xl border border-border bg-surface px-5 py-4 text-sm text-foreground/90"
            >
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
