type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export default function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <section className="bg-noise border-b border-border px-6 py-20 text-center">
      <p className="text-xs uppercase tracking-[0.3em] text-gold">{eyebrow}</p>
      <h1 className="font-display text-gradient-gold mt-4 text-3xl md:text-5xl">
        {title}
      </h1>
      {description && (
        <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
          {description}
        </p>
      )}
    </section>
  );
}
