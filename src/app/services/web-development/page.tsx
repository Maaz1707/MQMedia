import type { Metadata } from "next";
import ServiceHero from "@/components/service-page/ServiceHero";
import IncludedBreakdown from "@/components/service-page/IncludedBreakdown";
import ServiceProcess from "@/components/service-page/ServiceProcess";
import WhyItMatters from "@/components/service-page/WhyItMatters";
import RelevantPortfolio from "@/components/service-page/RelevantPortfolio";
import ServiceFAQ from "@/components/service-page/ServiceFAQ";
import CrossSell from "@/components/service-page/CrossSell";
import ServiceFinalCTA from "@/components/service-page/ServiceFinalCTA";
import { serviceForSlug } from "@/lib/services-data";
import { servicePageForSlug } from "@/lib/service-pages-data";
import { projectsForService } from "@/lib/portfolio-data";
import { SITE_CONFIG } from "@/lib/site-config";

const SLUG = "web-development" as const;
const service = serviceForSlug(SLUG)!;
const content = servicePageForSlug(SLUG)!;

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mqmedia.com";
const PAGE_URL = `${BASE_URL}/services/${SLUG}`;

export const metadata: Metadata = {
  title: "Web Design & Development",
  description:
    "Custom-built, fast-loading websites for trade businesses — engineered to rank and designed to convert. See what's included, our process, and real work.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: `Web Design & Development | ${SITE_CONFIG.name}`,
    description: content.heroSubline,
    url: PAGE_URL,
    siteName: SITE_CONFIG.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Web Design & Development | ${SITE_CONFIG.name}`,
    description: content.heroSubline,
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Web Design & Development",
  name: `Web Design & Development by ${SITE_CONFIG.name}`,
  description: content.heroSubline,
  url: PAGE_URL,
  provider: {
    "@type": "ProfessionalService",
    name: SITE_CONFIG.name,
    url: BASE_URL,
  },
  areaServed: "Worldwide",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Web Design & Development",
    itemListElement: content.included.map((item) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: item.title, description: item.description },
    })),
  },
};

export default function WebDevelopmentPage() {
  const relatedProjects = projectsForService(SLUG);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ServiceHero
        eyebrow={content.heroEyebrow}
        headline={content.heroHeadline}
        subline={content.heroSubline}
        variant={content.heroVariant}
      />
      <IncludedBreakdown intro={content.includedIntro} items={content.included} />
      <ServiceProcess steps={content.process} />
      <WhyItMatters headline={content.whyItMatters.headline} body={content.whyItMatters.body} />
      <RelevantPortfolio projects={relatedProjects} />
      <ServiceFAQ items={content.faq} />
      <CrossSell currentSlug={SLUG} />
      <ServiceFinalCTA serviceTitle={service.title} />
    </>
  );
}
