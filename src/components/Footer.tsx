import Logo from "./Logo";
import Reveal from "./Reveal";
import { NAV_SECTIONS, SITE_CONFIG, whatsappLink } from "@/lib/site-config";

const SOCIAL_ENTRIES = Object.entries(SITE_CONFIG.social).filter(([, url]) => url);

export default function Footer() {
  const whatsapp = whatsappLink();

  return (
    <footer className="border-t border-border bg-background-alt">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <Reveal className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <Logo size={96} />
            <p className="mt-5 text-sm leading-relaxed text-muted">
              Branding, web development, catalogue design, SEO and social
              media management {SITE_CONFIG.regionDescriptor}.
            </p>
            {SITE_CONFIG.location && (
              <p className="mt-4 text-sm text-muted">{SITE_CONFIG.location}</p>
            )}
          </div>

          <div className="flex gap-16">
            <div>
              <h3 className="font-display text-xs uppercase tracking-[0.2em] text-gold">
                Navigate
              </h3>
              <ul className="mt-4 flex flex-col gap-3">
                {NAV_SECTIONS.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="text-sm text-muted transition-colors hover:text-gold"
                    >
                      {section.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-display text-xs uppercase tracking-[0.2em] text-gold">
                Connect
              </h3>
              <ul className="mt-4 flex flex-col gap-3">
                {whatsapp && (
                  <li>
                    <a
                      href={whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted transition-colors hover:text-gold"
                    >
                      WhatsApp
                    </a>
                  </li>
                )}
                <li>
                  <a
                    href={`mailto:${SITE_CONFIG.contactEmail}`}
                    className="text-sm text-muted transition-colors hover:text-gold"
                  >
                    Email
                  </a>
                </li>
                {SITE_CONFIG.phone && (
                  <li>
                    <a
                      href={`tel:${SITE_CONFIG.phone.replace(/[^\d+]/g, "")}`}
                      className="text-sm text-muted transition-colors hover:text-gold"
                    >
                      {SITE_CONFIG.phone}
                    </a>
                  </li>
                )}
                {SOCIAL_ENTRIES.map(([key, url]) => (
                  <li key={key}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm capitalize text-muted transition-colors hover:text-gold"
                    >
                      {key}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-xs text-muted md:flex-row">
          <p>&copy; {new Date().getFullYear()} MQ Media. All rights reserved.</p>
          <p className="tracking-[0.2em] uppercase">Where Vision Meets Precision</p>
        </div>
      </div>
    </footer>
  );
}
