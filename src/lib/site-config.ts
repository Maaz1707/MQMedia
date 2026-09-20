// Central place for contact details & social links.
// TODO: replace placeholder values with MQ Media's real details before launch.

// Resolution order: an explicit real domain always wins; otherwise fall
// back to whatever Vercel URL this deployment actually has (production
// domain first, then the per-deployment URL), so canonical/OG links are
// never wrong just because the custom domain isn't wired up yet. Only
// falls back to the mqmedia.com literal when none of that is available
// (i.e. local dev with no env vars set at all).
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/+$/, "");

  const vercelProductionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercelProductionUrl) return `https://${vercelProductionUrl}`;

  const vercelUrl = process.env.VERCEL_URL;
  if (vercelUrl) return `https://${vercelUrl}`;

  return "https://mqmedia.com";
}

function isPlaceholderNumber(value: string): boolean {
  return value.trim() === "" || /^0+$/.test(value.trim());
}

const rawWhatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";
const whatsappNumberIsReal = !isPlaceholderNumber(rawWhatsappNumber);

if (!whatsappNumberIsReal && typeof window === "undefined") {
  // Server/build-time only, so this doesn't spam the browser console for
  // every visitor — just shows up once in build/server logs as a nudge.
  console.warn(
    "[siteConfig] NEXT_PUBLIC_WHATSAPP_NUMBER is missing or looks like a placeholder (all zeros) — the WhatsApp button will not render until it's set."
  );
}

export const SITE_CONFIG = {
  name: "MQ Media",
  tagline: "Where Vision Meets Precision",
  siteUrl: resolveSiteUrl(),
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@mqmedia.com",
  // Empty string when unset/placeholder — never render a fake WhatsApp link.
  whatsappNumber: whatsappNumberIsReal ? rawWhatsappNumber.trim() : "",
  social: {
    instagram: "", // TODO: add once live
    facebook: "", // TODO: add once live
    linkedin: "",
  },
  // The "we'll get back to you within one business day" promise is a real
  // commitment, not filler copy — default on, but a single env flag turns
  // it off everywhere if that response time ever stops being true.
  showResponseTimePromise: process.env.NEXT_PUBLIC_SHOW_RESPONSE_TIME_PROMISE !== "false",
  // Single source of truth for the region positioning — was hardcoded as
  // "Worldwide" in the hero eyebrow, meta description and footer, which
  // overstates reach for a solo-founder studio. Phrased as a fragment
  // ("for trade businesses across India and the GCC") so it drops
  // naturally into different sentences at each call site.
  regionDescriptor:
    process.env.NEXT_PUBLIC_REGION_DESCRIPTOR ?? "for trade businesses across India and the GCC",
  // Trust signals — both genuinely optional. Empty string when unset, so
  // Contact/Footer render nothing rather than a placeholder.
  location: process.env.NEXT_PUBLIC_LOCATION ?? "",
  phone: process.env.NEXT_PUBLIC_PHONE ?? "",
};

export function whatsappLink(
  message = "Hi MQ Media, I'd like to talk about a project."
): string | null {
  if (!SITE_CONFIG.whatsappNumber) return null;
  return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const NAV_SECTIONS = [
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "process", label: "Process" },
  { id: "work", label: "Work" },
  { id: "why-mq", label: "Why MQ" },
  { id: "contact", label: "Contact" },
];
