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
    description:
      "A trade business without a distinct identity gets compared on price. We build the visual system that lets you compete on everything else.",
    includes: ["Logo & Mark", "Identity System", "Brand Guidelines", "Brand Voice"],
    outcome:
      "A brand that photographs, prints and scales consistently — from your business card to your storefront.",
  },
  {
    index: "02",
    icon: "webdev",
    title: "Web Design & Development",
    description:
      "Custom-built on modern infrastructure, not assembled from a drag-and-drop template. Every site is designed around how your buyers actually decide.",
    includes: ["Custom Build", "E-commerce", "Technical SEO", "Ongoing Support"],
    outcome: "A site fast enough to rank, and sharp enough to convert.",
  },
  {
    index: "03",
    icon: "catalogue",
    title: "Catalogue & Print Design",
    description:
      "Menus, product catalogues and brochures designed to be handled, not skimmed — print-ready and digital-ready from the same source.",
    includes: ["Menu Layout", "Lookbooks", "Print-Ready Files", "Digital / PDF"],
    outcome: "A catalogue built to be picked up, not scrolled past.",
  },
  {
    index: "04",
    icon: "seo",
    title: "SEO & Growth Marketing",
    description:
      "Visibility for the buyers already searching for what you sell — built on technical fundamentals, not shortcuts that fade in a month.",
    includes: ["Technical Audits", "On-Page SEO", "Local & Global", "Growth Reports"],
    outcome: "Found by the buyers actively looking for what you sell.",
  },
  {
    index: "05",
    icon: "smma",
    title: "SMMA",
    description:
      "Ongoing social strategy and management that reflects the quality of the business behind it, not just a posting calendar.",
    includes: ["Content Strategy", "Community", "Paid Social", "Performance Reports"],
    outcome: "A social presence that closes deals, not just impressions.",
  },
];
