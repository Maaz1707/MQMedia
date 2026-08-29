import type { MetadataRoute } from "next";
import { SERVICES } from "@/lib/services-data";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mqmedia.com";

// Only slugs with a built page.tsx under src/app/services/ actually
// resolve — listing an unbuilt one here would put a 404 in the sitemap.
const LIVE_SERVICE_SLUGS = new Set(["web-development"]);

export default function sitemap(): MetadataRoute.Sitemap {
  const servicePages: MetadataRoute.Sitemap = SERVICES.filter((s) =>
    LIVE_SERVICE_SLUGS.has(s.slug)
  ).map((s) => ({
    url: `${BASE_URL}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...servicePages,
  ];
}
