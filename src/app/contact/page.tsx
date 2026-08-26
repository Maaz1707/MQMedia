import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact | MQ Media",
  description: "Get in touch with MQ Media for design, web development, SMMA or catalogue projects.",
};

const DETAILS = [
  { label: "Email", value: "hello@mqmedia.com" },
  { label: "Phone", value: "+1 (000) 000-0000" },
  { label: "Location", value: "Available worldwide, remote-first" },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get in Touch"
        title="Let's Build Something Precise"
        description="Tell us about your project and we'll get back to you within one business day."
      />

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
          <div>
            <h2 className="font-display text-xl text-foreground">
              Contact Details
            </h2>
            <ul className="mt-6 flex flex-col gap-5">
              {DETAILS.map((detail) => (
                <li key={detail.label}>
                  <p className="text-xs uppercase tracking-[0.2em] text-gold">
                    {detail.label}
                  </p>
                  <p className="mt-1 text-sm text-foreground/90">
                    {detail.value}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <ContactForm />
        </div>
      </section>
    </>
  );
}
