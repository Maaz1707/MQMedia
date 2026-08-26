"use client";

import { motion } from "framer-motion";
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
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="px-6 py-5 font-normal">&nbsp;</th>
                <th className="px-6 py-5 text-xs font-normal uppercase tracking-[0.15em] text-muted">
                  Freelancers
                </th>
                <th className="px-6 py-5 text-xs font-normal uppercase tracking-[0.15em] text-muted">
                  Large Agencies
                </th>
                <th className="font-display border-b-2 border-gold px-6 py-5 text-xs font-normal uppercase tracking-[0.15em] text-gold">
                  MQ Media
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, i) => (
                <motion.tr
                  key={row.label}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="border-b border-border transition-colors duration-300 hover:bg-gold/[0.03] last:border-none"
                >
                  <td className="px-6 py-6 font-medium text-foreground">
                    {row.label}
                  </td>
                  <td className="px-6 py-6 text-muted">{row.freelancer}</td>
                  <td className="px-6 py-6 text-muted">{row.agency}</td>
                  <td className="border-l border-gold/20 px-6 py-6 text-foreground/90">
                    {row.mq}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </Reveal>

        {/* Mobile stacked cards */}
        <div className="mt-14 flex flex-col gap-5 md:hidden">
          {ROWS.map((row, i) => (
            <Reveal key={row.label} delay={i * 0.08}>
              <div className="border border-border bg-surface p-6">
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
                  <div className="flex justify-between gap-4 border-t border-gold/30 pt-3">
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
