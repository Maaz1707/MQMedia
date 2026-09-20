#!/usr/bin/env node
// Crawls the production build looking for broken internal links/anchors.
// No new dependencies: uses Node's built-in fetch + regex-based HTML
// scanning (good enough for this site's markup; not a full HTML parser).
//
// Usage: npm run check:links
// Assumes `npm run build` has already produced .next/ — spawns its own
// `next start` on an ephemeral port, crawls, then always tears the
// server down (even on failure) so it never leaves a process running.

import { spawn } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";

const PORT = 4174;
const BASE = `http://localhost:${PORT}`;
const REQUIRED_HOME_ANCHORS = ["about", "services", "process", "work", "why-mq", "contact"];
const SERVICE_SLUGS = ["branding", "web-development", "catalogue-design", "seo-growth", "smma"];
const START_TIMEOUT_MS = 30_000;

function extractHrefs(html) {
  const hrefs = new Set();
  const re = /href="([^"]+)"/g;
  let m;
  while ((m = re.exec(html))) hrefs.add(m[1]);
  return [...hrefs];
}

function extractIds(html) {
  const ids = new Set();
  const re = /\sid="([^"]+)"/g;
  let m;
  while ((m = re.exec(html))) ids.add(m[1]);
  return ids;
}

function isInternalPagePath(href) {
  if (!href) return false;
  if (href.startsWith("#")) return false;
  if (href.startsWith("mailto:") || href.startsWith("tel:")) return false;
  if (/^https?:\/\//.test(href) || href.startsWith("//")) return false;
  if (href.startsWith("/_next") || href.startsWith("/api")) return false;
  return href.startsWith("/") || href.startsWith("?");
}

async function waitForServer() {
  const start = Date.now();
  while (Date.now() - start < START_TIMEOUT_MS) {
    try {
      const res = await fetch(BASE + "/");
      if (res.ok) return true;
    } catch {
      // not up yet
    }
    await delay(500);
  }
  return false;
}

async function crawl() {
  const errors = [];
  const visited = new Set();
  const toVisit = ["/", ...SERVICE_SLUGS.map((s) => `/services/${s}`)];
  let homeHtml = "";

  while (toVisit.length > 0) {
    const path = toVisit.shift();
    if (visited.has(path)) continue;
    visited.add(path);

    const url = BASE + path;
    let res;
    try {
      res = await fetch(url);
    } catch (err) {
      errors.push(`${path} → request failed (${err.message})`);
      continue;
    }

    if (res.status !== 200) {
      errors.push(`${path} → ${res.status} (expected 200)`);
      continue;
    }

    const html = await res.text();
    if (path === "/") homeHtml = html;

    for (const href of extractHrefs(html)) {
      if (!isInternalPagePath(href)) continue;
      const cleanPath = href.split("#")[0].split("?")[0];
      if (!cleanPath || visited.has(cleanPath) || toVisit.includes(cleanPath)) continue;
      toVisit.push(cleanPath);
    }
  }

  const homeIds = extractIds(homeHtml);
  for (const anchor of REQUIRED_HOME_ANCHORS) {
    if (!homeIds.has(anchor)) {
      errors.push(`Missing anchor target id="${anchor}" on the home page`);
    }
  }

  // Every service slug should have actually been reached above; flag any
  // that 404'd distinctly since that's the specific failure mode fix 1 fixed.
  for (const slug of SERVICE_SLUGS) {
    if (!visited.has(`/services/${slug}`)) {
      errors.push(`/services/${slug} was never reached during the crawl`);
    }
  }

  return { errors, pagesVisited: visited.size };
}

async function main() {
  console.log(`Starting production server on port ${PORT}...`);
  const server = spawn("npx", ["next", "start", "-p", String(PORT)], {
    stdio: "pipe",
    shell: true,
  });

  let serverOutput = "";
  server.stdout?.on("data", (d) => (serverOutput += d));
  server.stderr?.on("data", (d) => (serverOutput += d));

  let exitCode = 1;
  try {
    const ready = await waitForServer();
    if (!ready) {
      console.error("Server never became ready:\n" + serverOutput);
      process.exit(1);
    }

    const { errors, pagesVisited } = await crawl();

    if (errors.length > 0) {
      console.error(`check:links FAILED (${pagesVisited} pages visited):`);
      for (const e of errors) console.error(`  - ${e}`);
      exitCode = 1;
    } else {
      console.log(`check:links OK — ${pagesVisited} pages visited, all anchors present, no 404s.`);
      exitCode = 0;
    }
  } finally {
    server.kill();
  }

  process.exit(exitCode);
}

main().catch((err) => {
  console.error("check:links crashed:", err);
  process.exit(1);
});
