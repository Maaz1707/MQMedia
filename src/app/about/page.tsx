import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import CtaBanner from "@/components/home/CtaBanner";

export const metadata: Metadata = {
  title: "About | MQ Media",
  description:
    "MQ Media is a design, web development, SMMA and catalogue production agency built on precision.",
};

const VALUES = [
  {
    title: "Precision",
    description:
      "Every detail is deliberate, from the first sketch to the final line of code.",
  },
  {
    title: "Partnership",
    description:
      "We work as an extension of your team, not a vendor ticking boxes.",
  },
  {
    title: "Craft",
    description:
      "Design, development, growth and print are treated as crafts, not commodities.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About MQ Media"
        title="Vision, Backed by Precision"
        description="MQ Media was built on a simple idea: brands deserve a single partner who can design, build, grow and present their story with equal care."
      />

      <section className="mx-auto max-w-4xl px-6 py-20 text-center">
        <p className="text-sm leading-relaxed text-muted md:text-base">
          We started MQ Media to close the gap between agencies that design
          beautifully and agencies that execute reliably. Today we bring
          design, web development, social media management and catalogue
          production together under one roof &mdash; so every touchpoint of
          your brand looks, feels and performs like it belongs to the same
          story.
        </p>
      </section>

      <section className="border-y border-border bg-background-alt">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-gold">
              Our Values
            </p>
            <h2 className="font-display mt-4 text-3xl text-foreground md:text-4xl">
              What Guides Our Work
            </h2>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {VALUES.map((value) => (
              <div
                key={value.title}
                className="rounded-2xl border border-border bg-surface p-8 text-center"
              >
                <h3 className="font-display text-lg text-gold">
                  {value.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
