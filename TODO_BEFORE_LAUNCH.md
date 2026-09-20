# TODO Before Launch

Things Claude could not (and should not) fill in with real answers. Grouped by
fix number from the audit. Resolve these before this goes live.

## Fix 2 — WhatsApp
- [ ] Set `NEXT_PUBLIC_WHATSAPP_NUMBER` (digits only, with country code) in
      Vercel's env vars. Until this is set, the WhatsApp button/link is
      hidden everywhere rather than showing a broken placeholder.

## Fix 3 — Domain
- [ ] Set `NEXT_PUBLIC_SITE_URL` to the real production domain once
      mqmedia.com's DNS points at this Vercel project. Until then it falls
      back to the Vercel deployment URL automatically, so nothing is
      broken — just not on the final domain yet.

## Fix 4 — Stats
- [ ] Confirm the real total number of projects MQ Media has shipped
      (not just the ones shown in the Work section) and set
      `NEXT_PUBLIC_PROJECTS_SHIPPED_COUNT` accordingly. Currently defaults
      to 4 (the number of projects actually shown), which is honest but
      may understate the real total.

## Fix 5 — Contact form delivery
- [ ] **Important**: the contact form does not actually deliver email
      anywhere yet. Sign up at resend.com, verify a sending domain (or
      use their shared test sender for now), and set `RESEND_API_KEY`
      (and optionally `RESEND_FROM_EMAIL`) in Vercel's env vars. Until
      then, submissions are validated and logged server-side only —
      real enquiries will be silently lost if this ships without it.
- [ ] Confirm the "within one business day" response-time promise in
      the Contact section is one you can actually keep. If not, set
      `NEXT_PUBLIC_SHOW_RESPONSE_TIME_PROMISE=false`.
