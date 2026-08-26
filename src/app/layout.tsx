import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
  "MQ Media is a design, web development, social media marketing and catalogue production agency.";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "MQ Media | Where Vision Meets Precision",
    template: "%s | MQ Media",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "MQ Media",
    "design agency",
    "web development",
    "SMMA",
    "social media marketing",
    "catalogue design",
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
