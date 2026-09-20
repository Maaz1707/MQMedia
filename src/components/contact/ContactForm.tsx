"use client";

import { useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Magnetic from "@/components/Magnetic";
import { SERVICES, serviceForSlug } from "@/lib/services-data";

const SERVICE_OPTIONS = [...SERVICES.map((s) => s.title), "Other"];

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const searchParams = useSearchParams();

  // /?service=<slug>#contact prefill, e.g. from a service page's CTA.
  // Falls back to the first option if the slug is missing/unrecognized.
  const prefillTitle = serviceForSlug(searchParams.get("service") ?? "")?.title;
  const defaultService =
    prefillTitle && SERVICE_OPTIONS.includes(prefillTitle) ? prefillTitle : SERVICE_OPTIONS[0];

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json().catch(() => ({}));

      if (!res.ok) {
        setErrorMessage(
          typeof result.error === "string" ? result.error : "Something went wrong. Please try again."
        );
        setStatus("error");
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setErrorMessage("Something went wrong. Please check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="border border-gold/40 bg-surface p-10 text-center"
      >
        <p className="font-display text-lg text-gold">Message Sent</p>
        <p className="mt-2 text-sm text-muted">
          Thanks for reaching out &mdash; we&apos;ll get back to you shortly.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="relative flex flex-col gap-5">
      {/* Honeypot: hidden from sighted and screen-reader users alike
          (aria-hidden + tabIndex -1 + off-screen position, not display:none
          — some bots skip fields that are display:none but still fill
          positioned-off-screen ones). Real visitors never see or fill it. */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-xs uppercase tracking-[0.15em] text-muted">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="mt-2 w-full border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-gold"
          />
        </div>
        <div>
          <label htmlFor="email" className="text-xs uppercase tracking-[0.15em] text-muted">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-2 w-full border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-gold"
          />
        </div>
      </div>

      <div>
        <label htmlFor="service" className="text-xs uppercase tracking-[0.15em] text-muted">
          Service Interested In
        </label>
        <select
          id="service"
          name="service"
          defaultValue={defaultService}
          className="mt-2 w-full border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-gold"
        >
          {SERVICE_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="text-xs uppercase tracking-[0.15em] text-muted">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          rows={5}
          className="mt-2 w-full resize-none border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-gold"
        />
      </div>

      {status === "error" && (
        <motion.p
          role="alert"
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-sm text-red-400"
        >
          {errorMessage || "Something went wrong. Please try again."}
        </motion.p>
      )}

      <Magnetic className="mt-2">
        <button
          type="submit"
          disabled={status === "submitting"}
          data-cursor-hover
          className="block w-full border border-gold bg-gold px-8 py-4 text-xs uppercase tracking-[0.15em] text-background transition-colors duration-300 hover:bg-transparent hover:text-gold disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? "Sending..." : "Send Message"}
        </button>
      </Magnetic>
    </form>
  );
}
