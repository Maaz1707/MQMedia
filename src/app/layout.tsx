import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import PageIntro from "@/components/PageIntro";
import { SITE_CONFIG } from "@/lib/site-config";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mqmedia.com";
const SITE_DESCRIPTION =
  "MQ Media is a design and growth studio for trade businesses worldwide — branding, web development, catalogue design, SEO and social media management.";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
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
    "social media marketing",
    "global trade business branding",
  ],
  openGraph: {
    title: "MQ Media | Where Vision Meets Precision",
    description: SITE_DESCRIPTION,
    url: BASE_URL,
    siteName: "MQ Media",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MQ Media | Where Vision Meets Precision",
    description: SITE_DESCRIPTION,
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: SITE_CONFIG.name,
  description: SITE_DESCRIPTION,
  url: BASE_URL,
  email: SITE_CONFIG.contactEmail,
  areaServed: "Worldwide",
  makesOffer: [
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Branding & Identity" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Web Design & Development" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Catalogue & Print Design" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "SEO & Growth Marketing" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Social Media Marketing & Management" } },
  ],
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
        <PageIntro />
        <ScrollProgress />
        <CustomCursor />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
