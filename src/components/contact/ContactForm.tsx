"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import Magnetic from "@/components/Magnetic";

const SERVICES = ["Design", "Web Development", "SMMA", "Catalogue Making", "Other"];

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus("success");
      form.reset();
    } catch {
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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
          defaultValue="Design"
          className="mt-2 w-full border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-gold"
        >
          {SERVICES.map((s) => (
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
          rows={5}
          className="mt-2 w-full resize-none border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-gold"
        />
      </div>

      {status === "error" && (
        <motion.p
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-sm text-red-400"
        >
          Something went wrong. Please try again.
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
