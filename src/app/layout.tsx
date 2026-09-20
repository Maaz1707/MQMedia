import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollSpine from "@/components/ScrollSpine";
import PageIntro from "@/components/PageIntro";
import AmbientBackground from "@/components/AmbientBackground";
import GrainOverlay from "@/components/GrainOverlay";
import { SITE_CONFIG } from "@/lib/site-config";
import { SERVICES } from "@/lib/services-data";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const SITE_DESCRIPTION = `MQ Media is a design and growth studio ${SITE_CONFIG.regionDescriptor} — branding, web development, catalogue design, SEO and social media management.`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.siteUrl),
  title: {
    default: "MQ Media | Where Vision Meets Precision",
    template: "%s | MQ Media",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "MQ Media",
    "branding agency",
    "web development",
    "catalogue design",
    "SEO",
    "SMMA",
    "trade business branding",
  ],
  openGraph: {
    title: "MQ Media | Where Vision Meets Precision",
    description: SITE_DESCRIPTION,
    url: SITE_CONFIG.siteUrl,
    siteName: "MQ Media",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MQ Media | Where Vision Meets Precision",
    description: SITE_DESCRIPTION,
  },
};

// Organization + Service: the business entity plus what it offers, built
// only from siteConfig/services data — no field here is invented, and
// anything unset (social links, phone, address) is simply omitted rather
// than rendered empty, since empty structured-data fields are worse than
// absent ones for search engines.
const socialLinks = Object.values(SITE_CONFIG.social).filter(Boolean);

const structuredData = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  name: SITE_CONFIG.name,
  description: SITE_DESCRIPTION,
  url: SITE_CONFIG.siteUrl,
  email: SITE_CONFIG.contactEmail,
  ...(socialLinks.length > 0 ? { sameAs: socialLinks } : {}),
  makesOffer: SERVICES.map((service) => ({
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name: service.title,
      url: `${SITE_CONFIG.siteUrl}/services/${service.slug}`,
    },
  })),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <AmbientBackground />
        <GrainOverlay />
        <PageIntro />
        <ScrollProgress />
        <ScrollSpine />
        <CustomCursor />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
