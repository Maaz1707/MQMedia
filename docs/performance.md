# Performance — Lighthouse Results

Measured 2026-09-20 with Lighthouse 12.8.2 against a real **production
build** (`next build` + `next start`, not `next dev`), default mobile
emulation with simulated throttling. Not synthetic/hardcoded — this is
the actual `lighthouse` CLI output.

## Home page (`/`)

| Category | Score |
| --- | --- |
| Performance | **77** |
| Accessibility | **100** |
| Best Practices | **100** |
| SEO | **100** |

- First Contentful Paint: 1.3s
- Largest Contentful Paint: 4.4s
- Total Blocking Time: 260ms
- Cumulative Layout Shift: 0
- Speed Index: 4.1s

## Web Design & Development page (`/services/web-development`)

| Category | Score |
| --- | --- |
| Performance | **69** |
| Accessibility | **100** |
| Best Practices | **100** |
| SEO | **100** |

- First Contentful Paint: 1.6s
- Largest Contentful Paint: 3.9s
- Total Blocking Time: 640ms
- Cumulative Layout Shift: 0
- Speed Index: 4.6s

## Reading these numbers

- **Accessibility, Best Practices and SEO are all 100 on both pages** —
  worth noting given fix 8 specifically targeted a real accessibility
  gap in the Why-MQ comparison; this is one data point that the fix (and
  the rest of the site) holds up under an automated audit, not proof of
  full manual accessibility coverage.
- **Cumulative Layout Shift is 0 on both pages** — nothing on the site
  is causing visible content jumps.
- **Performance (77 / 69) is the number with the most room** — LCP
  (3.9–4.4s) and, on the service page, Total Blocking Time (640ms) are
  the main drags. Likely contributors: Google Fonts loading, the hero's
  canvas-based particle field, and Framer Motion's JS execution cost
  before interactivity settles. Lighthouse's mobile throttling profile
  is intentionally strict (simulates a mid-range phone on a slower
  connection) — real-world desktop/broadband visitors will experience
  this faster than these numbers suggest, but they're still the honest
  baseline to improve from.
- These are lab scores from one run each, not field data (real user
  monitoring via something like Vercel Analytics would give a fuller
  picture over time).

## Per instruction: no score is in the site's UI

A "Built on Next.js" proof point was **not** added to the Web
Development page with these numbers baked in, since the audit
instructions require explicit approval before hardcoding a score into
the UI. See `TODO_BEFORE_LAUNCH.md` — say the word and it gets added
with these real numbers, or re-measured closer to launch if you'd
rather the UI reflect a fresher run.

## Reproducing this

```bash
npm run build
npm run start -- -p 4173
npx lighthouse http://localhost:4173/ --view
npx lighthouse http://localhost:4173/services/web-development --view
```
