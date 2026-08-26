import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-noise relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-[120px]"
      />

      <p className="relative text-xs uppercase tracking-[0.3em] text-gold">
        Design &middot; Web Development &middot; SMMA &middot; Catalogues
      </p>

      <h1 className="font-display text-gradient-gold relative mt-6 max-w-3xl text-4xl leading-tight md:text-6xl">
        Where Vision Meets Precision
      </h1>

      <p className="relative mt-6 max-w-xl text-sm leading-relaxed text-muted md:text-base">
        MQ Media crafts refined brand experiences &mdash; from striking
        design and high-performance websites to social growth and
        catalogue production &mdash; built with precision at every step.
      </p>

      <div className="relative mt-10 flex flex-col gap-4 sm:flex-row">
        <Link
          href="/contact"
          className="rounded-full bg-gold px-8 py-3 text-sm font-medium tracking-wide text-background transition-transform hover:scale-[1.03]"
        >
          Start a Project
        </Link>
        <Link
          href="/portfolio"
          className="rounded-full border border-gold/40 px-8 py-3 text-sm tracking-wide text-gold transition-colors hover:bg-gold/10"
        >
          View Our Work
        </Link>
      </div>
    </section>
  );
}
