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
    <section id="why-mq" className="border-t border-border bg-background-alt px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">
            Why MQ
          </p>
          <h2 className="font-display mt-4 text-3xl text-foreground md:text-4xl">
            Not a Freelancer. Not a Slow Agency.
          </h2>
        </Reveal>

        <Reveal delay={0.15} className="mt-14 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse overflow-hidden rounded-2xl border border-border text-sm">
            <thead>
              <tr className="border-b border-border bg-surface text-left">
                <th className="px-6 py-4 font-normal text-muted">
                  &nbsp;
                </th>
                <th className="px-6 py-4 font-normal text-muted">
                  Freelancers
                </th>
                <th className="px-6 py-4 font-normal text-muted">
                  Large Agencies
                </th>
                <th className="font-display bg-gold/10 px-6 py-4 text-gold">
                  MQ Media
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.label} className="border-b border-border last:border-none">
                  <td className="px-6 py-4 font-medium text-foreground">
                    {row.label}
                  </td>
                  <td className="px-6 py-4 text-muted">{row.freelancer}</td>
                  <td className="px-6 py-4 text-muted">{row.agency}</td>
                  <td className="bg-gold/5 px-6 py-4 text-foreground/90">
                    {row.mq}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </div>
    </section>
  );
}
