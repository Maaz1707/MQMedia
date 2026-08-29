import type { ServiceSlug } from "@/lib/services-data";

export type IncludedItem = { title: string; description: string };
export type ProcessStep = { number: string; title: string; description: string };
export type FaqItem = { question: string; answer: string };

// Visual treatment key for each hero — picked per service so the five
// pages don't read as one template with swapped text. See
// src/components/service-page/ServiceHero.tsx for what each renders.
export type HeroVariant = "orbit" | "flip" | "fan" | "radar" | "mosaic";

export type ServicePageContent = {
  slug: ServiceSlug;
  heroVariant: HeroVariant;
  heroEyebrow: string;
  heroHeadline: string;
  heroSubline: string;
  includedIntro: string;
  included: IncludedItem[];
  process: ProcessStep[];
  whyItMatters: { headline: string; body: string[] };
  faq: FaqItem[];
};

export const SERVICE_PAGES: Record<ServiceSlug, ServicePageContent> = {
  branding: {
    slug: "branding",
    heroVariant: "orbit",
    heroEyebrow: "Branding & Identity",
    heroHeadline: "An Identity Built to Be Remembered, Not Just Seen",
    heroSubline:
      "Most trade businesses inherit a logo and call it branding. We build the full system underneath it — the one that makes every touchpoint feel like the same company made it.",
    includedIntro:
      "Branding isn't a single deliverable — it's a system. Here's what's actually built when you commission identity work with MQ Media.",
    included: [
      {
        title: "Logo & Mark",
        description:
          "A primary mark plus the practical variants — icon-only, horizontal lockup, single-colour and reversed versions — so it works on a truck door as well as a business card.",
      },
      {
        title: "Identity System",
        description:
          "Colour palette, typography, spacing rules and imagery direction defined precisely enough that anyone producing material for you — a printer, a sign shop, a future hire — gets it right without guessing.",
      },
      {
        title: "Brand Guidelines",
        description:
          "A single reference document laying out how the mark, colours and type are used and, just as importantly, how they're not — the thing that keeps the brand consistent once you're not the one designing every piece yourself.",
      },
      {
        title: "Brand Voice",
        description:
          "A short, practical guide to how the business writes and talks — tone, vocabulary, what to say and what to avoid — so copy across the site, socials and print sounds like one business, not three.",
      },
    ],
    process: [
      {
        number: "01",
        title: "Positioning",
        description:
          "Before any visual work starts, we define what the business actually competes on and who it's competing against — the identity has to serve that, not just look good in isolation.",
      },
      {
        number: "02",
        title: "Concept Direction",
        description:
          "A small number of genuinely distinct directions, not twelve variations of one idea — each explored far enough to judge on its merits, not just a sketch.",
      },
      {
        number: "03",
        title: "Refinement",
        description:
          "The chosen direction gets pressure-tested at the sizes and surfaces it'll actually live on — favicon, signage, packaging — and adjusted until it holds up everywhere.",
      },
      {
        number: "04",
        title: "System & Handoff",
        description:
          "Every file, variant and guideline delivered in the formats you'll actually need, plus a walkthrough so whoever uses these files next knows exactly how to.",
      },
    ],
    whyItMatters: {
      headline: "A weak identity is a discount you're giving away for free",
      body: [
        "Trade buyers — the people hiring contractors, ordering wholesale, sourcing suppliers — read visual consistency as a proxy for reliability before they've spoken to you. An inconsistent identity, or one that looks like it was assembled from three different projects, quietly signals the same about the business behind it.",
        "This isn't about looking flashy. It's about looking like the kind of company that finishes what it starts — because that's the actual thing being evaluated when a buyer compares your quote against a competitor's.",
      ],
    },
    faq: [
      {
        question: "Do you design logos on their own, without the full system?",
        answer:
          "We can, but we'll always recommend at least the core identity system alongside it — a logo without defined colour, type and usage rules tends to drift inconsistently the moment more than one person is producing material with it.",
      },
      {
        question: "What if we already have a logo we like and just need it built out?",
        answer:
          "Common request, and straightforward — we can build the identity system, guidelines and voice around an existing mark without changing it, as long as it's structurally sound enough to extend.",
      },
      {
        question: "How long does a branding project take?",
        answer:
          "A full identity system typically runs a few weeks from kickoff to final handoff, depending on how many rounds of direction the concept phase needs. We'll give you a specific timeline once we understand the scope.",
      },
      {
        question: "Can you work from an existing brand in a different market?",
        answer:
          "Yes — if you're adapting an identity for a new region or audience, we can evolve the existing system rather than starting from zero, keeping what's already recognisable while fixing what isn't working.",
      },
      {
        question: "Do you provide print-ready files for signage and packaging?",
        answer:
          "Yes, print-ready exports in the correct colour modes and formats are part of the handoff — this is one of the reasons the guidelines document exists, so your printer or sign shop has everything they need without back-and-forth.",
      },
    ],
  },

  "web-development": {
    slug: "web-development",
    heroVariant: "flip",
    heroEyebrow: "Web Design & Development",
    heroHeadline: "A Site Fast Enough to Rank, Sharp Enough to Convert",
    heroSubline:
      "Most trade-business websites are built once and forgotten. We build ones engineered to load fast, read clearly on a job-site phone, and actually turn a visit into an enquiry.",
    includedIntro:
      "A website is judged in seconds. Here's everything that goes into making those seconds work in your favour.",
    included: [
      {
        title: "Custom Build",
        description:
          "A site designed and built specifically for your business — not a modified template — so the structure matches how buyers actually need to find your products or services, not how a generic theme assumes they will.",
      },
      {
        title: "E-commerce",
        description:
          "Product catalogues, quote requests or full checkout flows built to handle trade-volume browsing without breaking down on mobile, where most of your traffic likely already is.",
      },
      {
        title: "Technical SEO",
        description:
          "Correct page structure, metadata, sitemap and load-speed fundamentals built in from the start — the unglamorous groundwork that determines whether Google can find and rank you at all.",
      },
      {
        title: "Ongoing Support",
        description:
          "Sites need maintenance — security updates, content changes, small fixes — handled directly by the person who built it, not routed through a support ticket queue.",
      },
    ],
    process: [
      {
        number: "01",
        title: "Discovery",
        description:
          "Understand what the site actually needs to do — generate quote requests, showcase a catalogue, support a sales team — before a single screen is designed.",
      },
      {
        number: "02",
        title: "Design",
        description:
          "Full page designs built around your content and identity, reviewed with you before any code is written, so structural changes happen on paper, not mid-build.",
      },
      {
        number: "03",
        title: "Build",
        description:
          "Engineered on modern, fast-loading foundations — the same technical approach used to build this site — with performance treated as a feature, not an afterthought.",
      },
      {
        number: "04",
        title: "Launch & Grow",
        description:
          "Post-launch, we monitor real performance and search visibility and keep refining — a site that's finished at launch is already starting to fall behind.",
      },
    ],
    whyItMatters: {
      headline: "Your site is doing the first sales call whether you're in it or not",
      body: [
        "A buyer researching suppliers checks the website before they ever pick up the phone. If it's slow, dated, or unclear about what you actually do, that call often never happens — not because the business wasn't a fit, but because the site didn't survive the first ten seconds of scrutiny.",
        "This is especially true for trade businesses competing on trust as much as price: a site that loads instantly and clearly states what you deliver does real work before a human is ever involved.",
      ],
    },
    faq: [
      {
        question: "How long does a custom build take?",
        answer:
          "A typical business site runs a few weeks from design sign-off to launch; larger builds with e-commerce or custom functionality take longer. We'll give you a firm timeline once we understand scope.",
      },
      {
        question: "Do you handle hosting?",
        answer:
          "We deploy on fast, reliable infrastructure and can manage hosting on your behalf, or hand off deployment access if you'd rather manage it in-house — either way works.",
      },
      {
        question: "Is SEO included, or is that a separate service?",
        answer:
          "Technical SEO fundamentals — site speed, structure, metadata — are built into every site we ship. Ongoing content and growth SEO is a separate, deeper engagement under our SEO & Growth Marketing service.",
      },
      {
        question: "Can you redesign an existing site instead of starting fresh?",
        answer:
          "Yes — if the existing content and structure are salvageable, a redesign on the current foundation can be faster and cheaper than a full rebuild. We'll assess honestly which makes more sense for your case.",
      },
      {
        question: "What platform do you build on?",
        answer:
          "We build custom on modern web frameworks rather than page-builder platforms, which is what makes the speed and technical SEO groundwork possible in the first place.",
      },
      {
        question: "Do you provide content and product photography?",
        answer:
          "We can guide what's needed and structure the site around it, but photography and written content are typically supplied by you or sourced separately — we'll flag exactly what's needed early so it's not a bottleneck later.",
      },
    ],
  },

  "catalogue-design": {
    slug: "catalogue-design",
    heroVariant: "fan",
    heroEyebrow: "Catalogue & Print Design",
    heroHeadline: "A Catalogue Built to Be Picked Up, Not Skimmed",
    heroSubline:
      "Menus, lookbooks, product catalogues — the print pieces that carry your business into someone's hands. We design them to hold attention as long as the products deserve.",
    includedIntro:
      "Print doesn't get a second chance the way a website does — every page has to earn the turn to the next one. Here's what goes into that.",
    included: [
      {
        title: "Menu Layout",
        description:
          "Structured for how people actually read a menu or price list — hierarchy, grouping and pacing designed to guide the eye toward what you most want ordered or enquired about.",
      },
      {
        title: "Lookbooks",
        description:
          "Product or project showcases built around strong visual pacing — enough breathing room to let each piece land, without padding the page count for its own sake.",
      },
      {
        title: "Print-Ready Files",
        description:
          "Correctly set up in CMYK, with bleed, trim marks and resolution checked before it ever reaches a printer — the difference between a clean print run and an expensive reprint.",
      },
      {
        title: "Digital / PDF",
        description:
          "A parallel digital version built for screens — WhatsApp-shareable, correctly compressed, and readable on a phone — so the same catalogue works in print and in a chat thread.",
      },
    ],
    process: [
      {
        number: "01",
        title: "Content Audit",
        description:
          "Every product, dish or item that needs a place gets catalogued and organised first — the layout follows the content's logic, not the other way around.",
      },
      {
        number: "02",
        title: "Layout Design",
        description:
          "Grid, hierarchy and pacing established across spreads so the piece has rhythm — some pages built to slow the reader down, others built to move quickly.",
      },
      {
        number: "03",
        title: "Production Setup",
        description:
          "Final files prepared to the printer's exact specification — colour profile, bleed, paper stock considerations — checked before submission, not after a bad print run.",
      },
      {
        number: "04",
        title: "Print & Digital Handoff",
        description:
          "Print-ready files delivered alongside the digital version, so you're covered for the print run and for sharing it directly with a buyer the same afternoon.",
      },
    ],
    whyItMatters: {
      headline: "A cheap-looking catalogue undersells everything inside it",
      body: [
        "For trade businesses — restaurants, wholesalers, manufacturers — the catalogue is often the actual sales document. A buyer flipping through a cluttered, inconsistent layout unconsciously discounts what's being offered, regardless of the quality of the product itself.",
        "A well-built catalogue does the opposite: it makes the products look like they belong to a business that takes itself seriously, which is exactly the impression that gets a quote request instead of a page turn.",
      ],
    },
    faq: [
      {
        question: "Can you design both a print version and a digital version?",
        answer:
          "Yes — this is standard on every catalogue project. The print file is set up for a professional print run, and a parallel digital version is built for screens and easy sharing.",
      },
      {
        question: "Do you handle printing, or just the design files?",
        answer:
          "We design and prepare fully print-ready files; the actual print run is placed with a printer of your choice (or one we can recommend) so you retain control over paper stock, quantity and cost.",
      },
      {
        question: "How many products or pages can a catalogue include?",
        answer:
          "There's no fixed limit — we've built single-page menus and multi-section product catalogues. Scope and pricing are set based on the actual page count and complexity involved.",
      },
      {
        question: "Can you update an existing catalogue rather than redesign it?",
        answer:
          "If the existing layout and files are usable, updates and new editions are usually far faster than a full redesign — we'll assess the source files first.",
      },
      {
        question: "What information do you need from us to start?",
        answer:
          "Product names, descriptions, pricing and any existing photography — the more organised this is going in, the faster the layout phase moves. We'll provide a simple content template to make this easy.",
      },
    ],
  },

  "seo-growth": {
    slug: "seo-growth",
    heroVariant: "radar",
    heroEyebrow: "SEO & Growth Marketing",
    heroHeadline: "Visibility That Compounds, Not Fades in a Month",
    heroSubline:
      "Buyers search before they ask for referrals. If you're not visible when they do, you're not in the conversation — regardless of how good the work is once they find you.",
    includedIntro:
      "SEO is a lot of small, correct decisions compounding over time. Here's what that actually involves.",
    included: [
      {
        title: "Technical Audits",
        description:
          "A full check of the site's crawlability, speed, structure and indexing — the foundational issues that quietly cap how well anything else you do can perform.",
      },
      {
        title: "On-Page SEO",
        description:
          "Page titles, headings, content structure and internal linking built around what buyers are actually searching for, not just what the business wants to say about itself.",
      },
      {
        title: "Local & Global",
        description:
          "Local search presence for businesses that depend on geography, and broader visibility strategy for those competing beyond a single market — set up based on where your actual buyers are.",
      },
      {
        title: "Growth Reports",
        description:
          "Clear, regular reporting on rankings, traffic and what changed — not a wall of metrics, but the specific numbers that tell you whether the work is producing results.",
      },
    ],
    process: [
      {
        number: "01",
        title: "Audit & Baseline",
        description:
          "Establish exactly where the site stands today — technical issues, current rankings, competitor positioning — so progress is measured against a real starting point.",
      },
      {
        number: "02",
        title: "Strategy",
        description:
          "Identify the specific search terms and pages worth targeting based on buyer intent and realistic competitiveness, not just the highest-volume keywords.",
      },
      {
        number: "03",
        title: "Implementation",
        description:
          "Technical fixes, content and structural changes rolled out systematically — the unglamorous, correct work that search engines actually reward over time.",
      },
      {
        number: "04",
        title: "Monitor & Compound",
        description:
          "Ongoing tracking and refinement based on what's actually moving — SEO is not a one-time project, and treating it as one is the most common way it fails to work.",
      },
    ],
    whyItMatters: {
      headline: "If you're not found, being the better option doesn't matter",
      body: [
        "Trade buyers increasingly search before they call anyone — for suppliers, contractors, manufacturers. A business that's genuinely better but invisible in search loses to a mediocre competitor who simply shows up first.",
        "This isn't a one-time fix. Search visibility is closer to compound interest than a light switch — the businesses that invest consistently pull further ahead of the ones that treat it as a single project and move on.",
      ],
    },
    faq: [
      {
        question: "How long before we see results?",
        answer:
          "Technical fixes can show impact within weeks; meaningful ranking movement for competitive terms typically takes a few months of consistent work. Anyone promising overnight results on competitive terms isn't being straight with you.",
      },
      {
        question: "Do you guarantee first-page rankings?",
        answer:
          "No credible SEO provider can honestly guarantee specific rankings — search algorithms aren't controlled by anyone we work with. What we commit to is the correct, consistent work that reliably moves visibility over time.",
      },
      {
        question: "Is this a one-time project or ongoing?",
        answer:
          "Ongoing. SEO compounds with consistent work and erodes if abandoned — we're upfront that this is a retainer-style engagement, not a set-and-forget purchase.",
      },
      {
        question: "Do you handle both local and national/global SEO?",
        answer:
          "Yes — the strategy is built around where your actual buyers are searching, whether that's a single city or a much broader market.",
      },
      {
        question: "What's the difference between this and the technical SEO in a new website build?",
        answer:
          "A new site build includes the technical foundation — correct structure, speed, metadata. This service is the ongoing strategy, content and authority-building work layered on top of that foundation over time.",
      },
    ],
  },

  smma: {
    slug: "smma",
    heroVariant: "mosaic",
    heroEyebrow: "Social Media Marketing & Management",
    heroHeadline: "A Presence That Reflects the Business Behind It",
    heroSubline:
      "Most trade-business social accounts are inconsistent, outdated, or an afterthought. We build and run a presence that actually closes deals, not just collects impressions.",
    includedIntro:
      "Social media for a trade business is a credibility check, not a popularity contest. Here's what a properly run presence involves.",
    included: [
      {
        title: "Content Strategy",
        description:
          "A clear plan for what actually gets posted and why — tied to the business's real work and identity, not generic trending formats that don't reflect what you do.",
      },
      {
        title: "Community",
        description:
          "Consistent engagement — responding, commenting, staying visible — because an account that posts but never engages reads as a broadcast, not a business people can reach.",
      },
      {
        title: "Paid Social",
        description:
          "Targeted campaigns built around the buyers you actually want, not broad reach for its own sake — set up and monitored to justify the spend with real enquiries.",
      },
      {
        title: "Performance Reports",
        description:
          "Straightforward reporting on what's working and what isn't, so the strategy adjusts based on evidence rather than running the same plan indefinitely.",
      },
    ],
    process: [
      {
        number: "01",
        title: "Audit & Positioning",
        description:
          "Review what's currently live, what's working, and how the business should actually sound and look across platforms before any new content goes out.",
      },
      {
        number: "02",
        title: "Content Planning",
        description:
          "A realistic content calendar built around what the business can actually supply — real projects, real product, real people — not stock content that could belong to anyone.",
      },
      {
        number: "03",
        title: "Production & Posting",
        description:
          "Content produced and scheduled consistently, maintaining the visual identity and voice established for the brand across every post.",
      },
      {
        number: "04",
        title: "Measure & Adjust",
        description:
          "Regular review of what's actually driving engagement and enquiries, with the strategy adjusted accordingly rather than left on autopilot.",
      },
    ],
    whyItMatters: {
      headline: "An inactive or inconsistent account is a credibility gap buyers notice",
      body: [
        "When a buyer checks a business's social presence before reaching out — and most do — a dead account, inconsistent branding, or a feed of unrelated stock content quietly undermines trust, even if the actual work is excellent.",
        "This service exists to close that gap: a presence that looks and sounds like the same considered business behind the branding and the website, not a disconnected afterthought.",
      ],
    },
    faq: [
      {
        question: "Which platforms do you manage?",
        answer:
          "We focus on the platforms your actual buyers use, which for most trade businesses means a mix of Instagram, Facebook and LinkedIn — we won't push you onto a platform that doesn't fit your audience just to pad a report.",
      },
      {
        question: "Do we need to supply content, or do you produce it?",
        answer:
          "A mix — we handle strategy, design and production, but real project photos, product shots or footage from your business make the content far stronger, so we'll ask for that where it exists.",
      },
      {
        question: "How is paid social spend handled?",
        answer:
          "Ad spend is separate from our management fee and goes directly to the platform, so you always know exactly what's being spent on media versus on our work.",
      },
      {
        question: "How often do you post?",
        answer:
          "Frequency is set based on what the business can realistically sustain with genuine content — we'd rather post consistently at a sustainable pace than start fast and taper off.",
      },
      {
        question: "Can this work alongside our own in-house social posting?",
        answer:
          "Yes — some clients keep day-to-day posting in-house and bring us in for strategy, paid campaigns and higher-effort content. We'll structure the engagement around what you actually need.",
      },
    ],
  },
};

export function servicePageForSlug(slug: string): ServicePageContent | undefined {
  return SERVICE_PAGES[slug as ServiceSlug];
}
