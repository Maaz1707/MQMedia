import type { Mockup } from "@/components/sections/CaseStudy";
import type { ServiceSlug } from "@/lib/services-data";

export type Project = {
  name: string;
  category: string;
  caption: string;
  mockups: Mockup[];
  // Which service pages this project is relevant proof for.
  services: ServiceSlug[];
};

export const PROJECTS: Project[] = [
  {
    name: "Bae Laban",
    category: "Menu Design",
    caption: "A menu built to be picked up, not skimmed.",
    mockups: [{ type: "catalogue", alt: "Bae Laban Menu" }],
    services: ["catalogue-design"],
  },
  {
    name: "Chopdar",
    category: "Catalogue Design",
    caption: "A catalogue with the polish of the products inside it.",
    mockups: [{ type: "catalogue", alt: "Chopdar Catalogue" }],
    services: ["catalogue-design"],
  },
  {
    name: "Bestech",
    category: "Catalogue & Website Design",
    caption: "One identity, carried across print and web.",
    mockups: [
      { type: "catalogue", alt: "Bestech Catalogue" },
      { type: "browser", alt: "Bestech Website" },
    ],
    services: ["catalogue-design", "web-development"],
  },
  {
    name: "AIM Hitech",
    category: "Catalogue & Website Design",
    caption: "Precision engineering, presented with equal precision.",
    mockups: [
      { type: "catalogue", alt: "AIM Hitech Catalogue" },
      { type: "browser", alt: "AIM Hitech Website" },
    ],
    services: ["catalogue-design", "web-development"],
  },
  // Add more projects here as they're completed.
];

export function projectsForService(slug: ServiceSlug): Project[] {
  return PROJECTS.filter((p) => p.services.includes(slug));
}
