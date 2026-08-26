import type { ServiceIconKey } from "@/components/Icons";

export type ServiceData = {
  index: string;
  icon: ServiceIconKey;
  title: string;
  description: string;
  includes: string[];
  outcome: string;
};

export const SERVICES: ServiceData[] = [
  {
    index: "01",
    icon: "branding",
    title: "Branding & Identity",
    description: "A distinct identity is how you stop competing on price.",
    includes: ["Logo & Mark", "Identity System", "Brand Guidelines", "Brand Voice"],
    outcome:
      "A brand that photographs, prints and scales consistently — from your business card to your storefront.",
  },
  {
    index: "02",
    icon: "webdev",
    title: "Web Design & Development",
    description: "Built to convert, not just to exist.",
    includes: ["Custom Build", "E-commerce", "Technical SEO", "Ongoing Support"],
    outcome: "A site fast enough to rank, and sharp enough to convert.",
  },
  {
    index: "03",
    icon: "catalogue",
    title: "Catalogue & Print Design",
    description: "Designed to be picked up, not skimmed.",
    includes: ["Menu Layout", "Lookbooks", "Print-Ready Files", "Digital / PDF"],
    outcome: "Print-ready and digital-ready, from one file.",
  },
  {
    index: "04",
    icon: "seo",
    title: "SEO & Growth Marketing",
    description: "Found by buyers already searching for you.",
    includes: ["Technical Audits", "On-Page SEO", "Local & Global", "Growth Reports"],
    outcome: "Visibility that compounds, not fades in a month.",
  },
  {
    index: "05",
    icon: "smma",
    title: "SMMA",
    description: "A presence that reflects the business behind it.",
    includes: ["Content Strategy", "Community", "Paid Social", "Performance Reports"],
    outcome: "A social presence that closes deals, not just impressions.",
  },
];
