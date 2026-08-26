import Link from "next/link";

export default function CtaBanner() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="bg-noise relative overflow-hidden rounded-3xl border border-gold/30 px-8 py-16 text-center">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-[100px]"
        />
        <h2 className="font-display text-gradient-gold relative text-3xl md:text-4xl">
          Ready to Elevate Your Brand?
        </h2>
        <p className="relative mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted md:text-base">
          Let&apos;s talk about design, development, social growth or your
          next catalogue &mdash; and bring precision to your vision.
        </p>
        <Link
          href="/contact"
          className="relative mt-8 inline-block rounded-full bg-gold px-8 py-3 text-sm font-medium tracking-wide text-background transition-transform hover:scale-[1.03]"
        >
          Get in Touch
        </Link>
      </div>
    </section>
  );
}
