import Reveal from "@/components/Reveal";
import PlaceholderNote from "@/components/PlaceholderNote";

const TESTIMONIAL_SLOTS = ["Bae Laban", "Chopdar"];

export default function Testimonials() {
  return (
    <section id="testimonials" className="section-divider px-6 py-32 md:py-40">
      <div className="mx-auto max-w-5xl">
        <Reveal className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">
            In Their Words
          </p>
          <h2 className="font-display mt-5 text-4xl text-foreground md:text-5xl">
            Testimonials
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          {TESTIMONIAL_SLOTS.map((client, i) => (
            <Reveal key={client} delay={i * 0.1}>
              <div className="flex h-full flex-col justify-between rounded-2xl border border-border bg-surface p-8 transition-all duration-500 hover:-translate-y-1 hover:border-gold/40 hover:shadow-[0_25px_70px_-20px_rgba(212,175,55,0.25)]">
                <PlaceholderNote>
                  Real quote from {client} goes here once provided.
                </PlaceholderNote>
                <p className="mt-6 text-sm font-medium text-foreground/80">
                  &mdash; {client}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
