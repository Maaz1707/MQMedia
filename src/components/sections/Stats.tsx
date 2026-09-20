import StatCounter from "@/components/StatCounter";
import { SERVICES } from "@/lib/services-data";
import { PROJECTS_SHIPPED_COUNT } from "@/lib/portfolio-data";

export default function Stats() {
  return (
    <section className="border-y border-border bg-background-alt/40 px-6 py-16">
      <div className="mx-auto grid max-w-4xl grid-cols-2 gap-10 sm:grid-cols-3">
        <StatCounter value={SERVICES.length} label="Core Disciplines" />
        <StatCounter value={PROJECTS_SHIPPED_COUNT} label="Projects Shipped" delay={0.1} />
        <StatCounter
          value={100}
          suffix="%"
          label="Founder-Led"
          delay={0.2}
        />
      </div>
    </section>
  );
}
