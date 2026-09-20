import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceHero from "@/components/service-page/ServiceHero";
import IncludedBreakdown from "@/components/service-page/IncludedBreakdown";
import ServiceProcess from "@/components/service-page/ServiceProcess";
import WhyItMatters from "@/components/service-page/WhyItMatters";
import RelevantPortfolio from "@/components/service-page/RelevantPortfolio";
import ServiceFAQ from "@/components/service-page/ServiceFAQ";
import CrossSell from "@/components/service-page/CrossSell";
import ServiceFinalCTA from "@/components/service-page/ServiceFinalCTA";
import { SERVICES, serviceForSlug, type ServiceSlug } from "@/lib/services-data";
import { servicePageForSlug } from "@/lib/service-pages-data";
import { projectsForService } from "@/lib/portfolio-data";
import { SITE_CONFIG } from "@/lib/site-config";

type Params = { slug: string };

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mqmedia.com";

export function generateStaticParams(): Params[] {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = serviceForSlug(slug);
  const content = servicePageForSlug(slug);
  if (!service || !content) return {};

  const pageUrl = `${BASE_URL}/services/${slug}`;

  return {
    title: service.title,
    description: content.metaDescription,
    alternates: { canonical: pageUrl },
    openGraph: {
      title: `${service.title} | ${SITE_CONFIG.name}`,
      description: content.metaDescription,
      url: pageUrl,
      siteName: SITE_CONFIG.name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title} | ${SITE_CONFIG.name}`,
      description: content.metaDescription,
    },
  };
}

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const service = serviceForSlug(slug);
  const content = servicePageForSlug(slug);

  if (!service || !content) {
    notFound();
  }

  const relatedProjects = projectsForService(slug as ServiceSlug);
  const pageUrl = `${BASE_URL}/services/${slug}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.title,
    name: `${service.title} by ${SITE_CONFIG.name}`,
    description: content.metaDescription,
    url: pageUrl,
    provider: {
      "@type": "ProfessionalService",
      name: SITE_CONFIG.name,
      url: BASE_URL,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: service.title,
      itemListElement: content.included.map((item) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: item.title, description: item.description },
      })),
    },
  };

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
      <CrossSell currentSlug={slug as ServiceSlug} />
      <ServiceFinalCTA serviceTitle={service.title} />
    </>
  );
}
