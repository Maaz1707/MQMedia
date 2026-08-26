import Reveal from "@/components/Reveal";
import PlaceholderNote from "@/components/PlaceholderNote";

const TESTIMONIAL_SLOTS = ["Bae Laban", "Chopdar"];

export default function Testimonials() {
  return (
    <section id="testimonials" className="border-t border-border px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">
            In Their Words
          </p>
          <h2 className="font-display mt-4 text-3xl text-foreground md:text-4xl">
            Testimonials
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {TESTIMONIAL_SLOTS.map((client, i) => (
            <Reveal key={client} delay={i * 0.1}>
              <div className="flex h-full flex-col justify-between rounded-2xl border border-border bg-surface p-8">
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
