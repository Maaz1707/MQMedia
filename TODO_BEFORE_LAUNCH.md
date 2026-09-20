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
