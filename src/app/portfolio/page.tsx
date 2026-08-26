import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ProjectCard from "@/components/portfolio/ProjectCard";
import CtaBanner from "@/components/home/CtaBanner";

export const metadata: Metadata = {
  title: "Portfolio | MQ Media",
  description: "A selection of design, web development, SMMA and catalogue projects by MQ Media.",
};

const PROJECTS = [
  {
    title: "Lumière Skincare",
    category: "Brand Identity & Design",
    description: "Full visual identity and packaging design for a premium skincare launch.",
  },
  {
    title: "Vertex Realty",
    category: "Web Development",
    description: "High-performance property listing platform with custom booking flow.",
  },
  {
    title: "Aurora Fitness",
    category: "SMMA",
    description: "Social growth strategy that scaled engaged following across platforms.",
  },
  {
    title: "Noor Collection",
    category: "Catalogue Making",
    description: "Seasonal lookbook and print catalogue for a fashion label's new line.",
  },
  {
    title: "Solstice Cafe",
    category: "Web Development",
    description: "Menu-driven marketing site with online ordering integration.",
  },
  {
    title: "Marbleworks Studio",
    category: "Brand Identity & Design",
    description: "Logo, brand guidelines and creative assets for an interior design studio.",
  },
];

export default function PortfolioPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Work"
        title="Selected Projects"
        description="A look at the brands we've helped design, build, grow and present."
      />

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
