import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SITE_CONFIG } from "@/lib/site-config";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mqmedia.com";
const SITE_DESCRIPTION =
  "MQ Media is a design and growth studio for trade businesses across India and the GCC — branding, web development, catalogue design, SEO and social media management.";

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
    "trade business design India GCC",
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
  areaServed: ["India", "United Arab Emirates", "Saudi Arabia", "Qatar", "Gulf Cooperation Council"],
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
      className={`${inter.variable} ${poppins.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
