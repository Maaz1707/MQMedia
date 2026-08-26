type ProjectCardProps = {
  title: string;
  category: string;
  description: string;
};

export default function ProjectCard({ title, category, description }: ProjectCardProps) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-border bg-surface transition-colors hover:border-gold/50">
      <div className="bg-noise relative flex aspect-[4/3] items-center justify-center border-b border-border">
        <span className="font-display text-gold-dark/60 text-4xl">
          {title
            .split(" ")
            .map((w) => w[0])
            .join("")
            .slice(0, 2)}
        </span>
      </div>
      <div className="p-6">
        <p className="text-xs uppercase tracking-[0.2em] text-gold">
          {category}
        </p>
        <h3 className="font-display mt-2 text-lg text-foreground">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {description}
        </p>
      </div>
    </div>
  );
}
