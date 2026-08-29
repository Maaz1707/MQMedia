import Link from "next/link";
import Reveal from "@/components/Reveal";
import TextReveal from "@/components/TextReveal";
import Magnetic from "@/components/Magnetic";

export default function ServiceFinalCTA({ serviceTitle }: { serviceTitle: string }) {
  return (
    <section id="contact-cta" className="section-divider bg-noise relative px-6 py-28 text-center md:py-40">
      <div className="relative mx-auto max-w-2xl">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-gold">Ready When You Are</p>
          <h2 className="font-display mt-5 text-3xl text-foreground md:text-5xl">
            <TextReveal text={`Let's Talk About ${serviceTitle}`} />
          </h2>
          <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-muted md:text-lg">
            Tell us where the business is today and we&apos;ll tell you exactly what this looks
            like for you — no generic proposal, no pressure.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Magnetic>
            <Link
              href="/#contact"
              data-cursor-hover
              className="block border border-gold bg-gold px-9 py-4 text-xs uppercase tracking-[0.15em] text-background transition-colors duration-300 hover:bg-transparent hover:text-gold"
            >
              Book a Call
            </Link>
          </Magnetic>
          <Magnetic>
            <Link
              href="/#work"
              data-cursor-hover
              className="block border border-border px-9 py-4 text-xs uppercase tracking-[0.15em] text-foreground/80 transition-colors duration-300 hover:border-gold hover:text-gold"
            >
              See All Work
            </Link>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
}
