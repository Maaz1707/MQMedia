# TODO Before Launch

Things Claude could not (and should not) fill in with real answers. Grouped by
fix number from the audit. Resolve these before this goes live.

## Fix 2 — WhatsApp
- [ ] Set `NEXT_PUBLIC_WHATSAPP_NUMBER` (digits only, with country code) in
      Vercel's env vars. Until this is set, the WhatsApp button/link is
      hidden everywhere rather than showing a broken placeholder.
