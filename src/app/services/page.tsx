import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ServiceSection from "@/components/services/ServiceSection";
import CtaBanner from "@/components/home/CtaBanner";

export const metadata: Metadata = {
  title: "Services | MQ Media",
  description:
    "Design, web development, social media marketing and catalogue production services from MQ Media.",
};

const SERVICES = [
  {
    index: "01",
    title: "Design",
    description:
      "From brand identity to UI/UX, we craft visual systems that make your brand instantly recognizable and consistent across every touchpoint.",
    features: [
      "Logo & brand identity design",
      "UI/UX design for web & mobile",
      "Marketing & social creatives",
      "Brand guidelines & style systems",
    ],
  },
  {
    index: "02",
    title: "Web Development",
    description:
      "We build fast, modern, responsive websites engineered to convert visitors into customers, with clean code and scalable architecture.",
    features: [
      "Custom website design & build",
      "E-commerce & booking platforms",
      "Performance & SEO optimization",
      "Ongoing maintenance & support",
    ],
  },
  {
    index: "03",
    title: "SMMA",
    description:
      "Our social media management and growth strategy builds real, engaged audiences for your brand, not vanity metrics.",
    features: [
      "Content strategy & calendar",
      "Community management",
      "Paid social advertising",
      "Analytics & growth reporting",
    ],
  },
  {
    index: "04",
    title: "Catalogue Making",
    description:
      "We produce polished product catalogues and lookbooks that present your offering with precision, ready for print or digital.",
    features: [
      "Product photography direction",
      "Catalogue & lookbook layout",
      "Print-ready & digital formats",
      "Seasonal & campaign updates",
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="What We Do"
        title="Our Services"
        description="Four disciplines, one precise standard. Explore how MQ Media brings your brand to life."
      />

      {SERVICES.map((service, i) => (
        <ServiceSection key={service.index} {...service} reversed={i % 2 === 1} />
      ))}

      <CtaBanner />
    </>
  );
}
