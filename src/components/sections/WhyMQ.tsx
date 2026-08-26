import Reveal from "@/components/Reveal";

const ROWS = [
  {
    label: "Speed",
    freelancer: "Inconsistent, often stalls",
    agency: "Slow, layered approvals",
    mq: "Fast, founder-driven turnaround",
  },
  {
    label: "Design Quality",
    freelancer: "Varies project to project",
    agency: "Consistent, but genericized",
    mq: "Consistently sharp, never templated",
  },
  {
    label: "Attention",
    freelancer: "One person, limited scope",
    agency: "Passed between account managers",
    mq: "Direct access to the founder",
  },
  {
    label: "Pricing",
    freelancer: "Cheap, but unpredictable",
    agency: "Expensive, retainer-heavy",
    mq: "Transparent, scoped to the project",
  },
];

export default function WhyMQ() {
  return (
    <section id="why-mq" className="section-divider bg-background-alt px-6 py-32 md:py-40">
      <div className="mx-auto max-w-5xl">
        <Reveal className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">
            Why MQ
          </p>
          <h2 className="font-display mt-5 text-4xl text-foreground md:text-5xl">
            Not a Freelancer. Not a Slow Agency.
          </h2>
        </Reveal>

        {/* Desktop comparison table */}
        <Reveal delay={0.15} className="mt-16 hidden overflow-x-auto md:block">
          <table className="w-full min-w-[640px] border-collapse overflow-hidden rounded-2xl border border-border text-sm">
            <thead>
              <tr className="border-b border-border bg-surface text-left">
                <th className="px-6 py-5 font-normal text-muted">&nbsp;</th>
                <th className="px-6 py-5 font-normal text-muted">
                  Freelancers
                </th>
                <th className="px-6 py-5 font-normal text-muted">
                  Large Agencies
                </th>
                <th className="font-display bg-gold/10 px-6 py-5 text-gold">
                  MQ Media
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr
                  key={row.label}
                  className="border-b border-border transition-colors last:border-none hover:bg-gold/5"
                >
                  <td className="px-6 py-5 font-medium text-foreground">
                    {row.label}
                  </td>
                  <td className="px-6 py-5 text-muted">{row.freelancer}</td>
                  <td className="px-6 py-5 text-muted">{row.agency}</td>
                  <td className="bg-gold/5 px-6 py-5 text-foreground/90">
                    {row.mq}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>

        {/* Mobile stacked cards */}
        <div className="mt-14 flex flex-col gap-5 md:hidden">
          {ROWS.map((row, i) => (
            <Reveal key={row.label} delay={i * 0.08}>
              <div className="rounded-2xl border border-border bg-surface p-6">
                <p className="font-display text-sm uppercase tracking-[0.15em] text-gold">
                  {row.label}
                </p>
                <dl className="mt-4 flex flex-col gap-3 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted">Freelancers</dt>
                    <dd className="text-right text-foreground/70">{row.freelancer}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted">Large Agencies</dt>
                    <dd className="text-right text-foreground/70">{row.agency}</dd>
                  </div>
                  <div className="flex justify-between gap-4 rounded-lg bg-gold/10 px-3 py-2">
                    <dt className="font-medium text-gold">MQ Media</dt>
                    <dd className="text-right text-foreground/90">{row.mq}</dd>
                  </div>
                </dl>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
