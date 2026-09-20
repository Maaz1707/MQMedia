import { NextResponse } from "next/server";
import { SERVICES } from "@/lib/services-data";
import { SITE_CONFIG } from "@/lib/site-config";

type ContactPayload = {
  name?: string;
  email?: string;
  service?: string;
  message?: string;
  // Honeypot: a hidden field real visitors never fill. Named plainly
  // (not "honeypot") so it doesn't tip off anything reading field names.
  company?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const VALID_SERVICES = new Set([...SERVICES.map((s) => s.title), "Other"]);
const MESSAGE_MIN_LENGTH = 10;

// Soft, dependency-free rate limit: an in-memory counter per IP that
// resets whenever the serverless instance recycles. Good enough to
// blunt naive spam scripts; not a substitute for a real distributed
// limiter (e.g. Upstash) if abuse becomes a real problem later.
const submissionsByIp = new Map<string, number[]>();
const RATE_WINDOW_MS = 60_000;
const MAX_SUBMISSIONS_PER_WINDOW = 3;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (submissionsByIp.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  submissionsByIp.set(ip, recent);
  return recent.length > MAX_SUBMISSIONS_PER_WINDOW;
}

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, service, message, company } = body;

  // Bots that fill every field trip the honeypot. Respond as if it
  // succeeded so they don't learn to leave it blank — just never send.
  if (company && company.trim() !== "") {
    return NextResponse.json({ success: true });
  }

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json(
      { error: "Name, email and message are required." },
      { status: 400 }
    );
  }
  if (!EMAIL_RE.test(email.trim())) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }
  if (message.trim().length < MESSAGE_MIN_LENGTH) {
    return NextResponse.json(
      { error: "Message is too short — tell us a little more about the project." },
      { status: 400 }
    );
  }
  if (service && !VALID_SERVICES.has(service)) {
    return NextResponse.json({ error: "Invalid service selection." }, { status: 400 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many submissions — please wait a moment and try again." },
      { status: 429 }
    );
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    // Pre-launch state: no provider configured yet. Logging server-side
    // (never exposed to the client) so submissions aren't silently lost
    // during development, but this is NOT real delivery — see
    // TODO_BEFORE_LAUNCH.md.
    console.warn(
      "[contact] RESEND_API_KEY not set — submission logged only, not emailed:",
      { name, email, service }
    );
    return NextResponse.json({ success: true });
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM_EMAIL ?? "MQ Media Website <onboarding@resend.dev>",
        to: SITE_CONFIG.contactEmail,
        reply_to: email.trim(),
        subject: `New enquiry from ${name.trim()}${service ? ` — ${service}` : ""}`,
        text: `Name: ${name.trim()}\nEmail: ${email.trim()}\nService: ${service ?? "Not specified"}\n\n${message.trim()}`,
      }),
    });

    if (!res.ok) {
      const errorBody = await res.text();
      console.error("[contact] Resend API error:", res.status, errorBody);
      return NextResponse.json(
        { error: "Something went wrong sending your message. Please try again or email us directly." },
        { status: 502 }
      );
    }
  } catch (err) {
    console.error("[contact] Failed to reach email provider:", err);
    return NextResponse.json(
      { error: "Something went wrong sending your message. Please try again or email us directly." },
      { status: 502 }
    );
  }

  return NextResponse.json({ success: true });
}
