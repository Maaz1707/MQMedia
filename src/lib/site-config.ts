// Central place for contact details & social links.
// TODO: replace placeholder values with MQ Media's real details before launch.

export const SITE_CONFIG = {
  name: "MQ Media",
  tagline: "Where Vision Meets Precision",
  contactEmail: "hello@mqmedia.com",
  whatsappNumber: "910000000000", // TODO: replace with real WhatsApp number (country code + number, no symbols)
  social: {
    instagram: "", // TODO: add once live
    facebook: "", // TODO: add once live
    linkedin: "",
  },
};

export const whatsappLink = (message = "Hi MQ Media, I'd like to talk about a project.") =>
  `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;

export const NAV_SECTIONS = [
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "process", label: "Process" },
  { id: "work", label: "Work" },
  { id: "why-mq", label: "Why MQ" },
  { id: "testimonials", label: "Testimonials" },
  { id: "contact", label: "Contact" },
];
