import Reveal from "@/components/Reveal";
import ContactForm from "@/components/contact/ContactForm";
import { SITE_CONFIG, whatsappLink } from "@/lib/site-config";

const SOCIAL_ENTRIES = Object.entries(SITE_CONFIG.social).filter(([, url]) => url);

export default function Contact() {
  return (
    <section id="contact" className="section-divider bg-noise px-6 py-32 md:py-40">
      <div className="mx-auto max-w-6xl">
        <Reveal className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">
            Get in Touch
          </p>
          <h2 className="font-display mt-5 text-4xl text-foreground md:text-5xl">
            Let&apos;s Build Something Precise
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-muted md:text-lg">
            Tell us about your project and we&apos;ll get back to you within
            one business day.
          </p>
        </Reveal>

        <div className="mt-20 grid grid-cols-1 gap-16 md:grid-cols-2">
          <Reveal>
            <h3 className="font-display text-xl text-foreground">
              Contact Details
            </h3>
            <ul className="mt-6 flex flex-col gap-5">
              <li>
                <p className="text-xs uppercase tracking-[0.2em] text-gold">
                  Email
                </p>
                <p className="mt-1 text-sm text-foreground/90">
                  {SITE_CONFIG.contactEmail}
                </p>
              </li>
              <li>
                <p className="text-xs uppercase tracking-[0.2em] text-gold">
                  WhatsApp
                </p>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block text-sm text-foreground/90 underline underline-offset-4 hover:text-gold"
                >
                  Message us directly &rarr;
                </a>
              </li>
              {SOCIAL_ENTRIES.length > 0 && (
                <li>
                  <p className="text-xs uppercase tracking-[0.2em] text-gold">
                    Social
                  </p>
                  <div className="mt-2 flex gap-4">
                    {SOCIAL_ENTRIES.map(([key, url]) => (
                      <a
                        key={key}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm capitalize text-foreground/90 hover:text-gold"
                      >
                        {key}
                      </a>
                    ))}
                  </div>
                </li>
              )}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
