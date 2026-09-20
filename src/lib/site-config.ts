// Central place for contact details & social links.
// TODO: replace placeholder values with MQ Media's real details before launch.

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
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@mqmedia.com",
  // Empty string when unset/placeholder — never render a fake WhatsApp link.
  whatsappNumber: whatsappNumberIsReal ? rawWhatsappNumber.trim() : "",
  social: {
    instagram: "", // TODO: add once live
    facebook: "", // TODO: add once live
    linkedin: "",
  },
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
