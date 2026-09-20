import type { Mockup } from "@/components/sections/CaseStudy";
import type { ServiceSlug } from "@/lib/services-data";

export type Testimonial = { quote: string; name: string; role: string };

export type Project = {
  // Client name.
  name: string;
  // Human-readable scope label shown on the card (e.g. "Catalogue &
  // Website Design") — this already doubles as the "what MQ did" scope
  // line the audit asked for; services[] below is the structured,
  // filterable version of the same thing.
  category: string;
  caption: string;
  mockups: Mockup[];
  // Which service pages this project is relevant proof for — also the
  // structured discipline list for this project.
  services: ServiceSlug[];
  // Only set when it's directly inferable from existing, already-public
  // copy about the project (not guessed) — e.g. AIM Hitech's caption
  // already says "precision engineering". Left unset rather than guessed
  // where it isn't obvious (e.g. Chopdar, Bestech).
  industry?: string;
  // None of the below exist for any current project — no real outcome
  // metrics or client quotes have been provided, so nothing is invented.
  // Set these later as real ones come in; the UI only renders a block
  // when the data is actually present.
  outcome?: string;
  testimonial?: Testimonial;
  liveUrl?: string;
};

export const PROJECTS: Project[] = [
  {
    name: "Bae Laban",
    category: "Menu Design",
    caption: "A menu built to be picked up, not skimmed.",
    mockups: [{ type: "catalogue", alt: "Bae Laban Menu" }],
    services: ["catalogue-design"],
    industry: "Food & Beverage",
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
    industry: "Engineering & Manufacturing",
  },
  // Add more projects here as they're completed.
];

export function projectsForService(slug: ServiceSlug): Project[] {
  return PROJECTS.filter((p) => p.services.includes(slug));
}

// "Projects shipped" for the homepage stat is intentionally NOT just
// PROJECTS.length — the portfolio only shows a curated subset, and the
// real total may be higher. Defaults to the count actually shown (the
// only number we can verify without guessing) until a real figure is
// confirmed via env var. See TODO_BEFORE_LAUNCH.md.
const rawProjectsShipped = process.env.NEXT_PUBLIC_PROJECTS_SHIPPED_COUNT;
const parsedProjectsShipped = rawProjectsShipped ? Number(rawProjectsShipped) : NaN;
export const PROJECTS_SHIPPED_COUNT =
  Number.isFinite(parsedProjectsShipped) && parsedProjectsShipped > 0
    ? parsedProjectsShipped
    : PROJECTS.length;
