import Reveal from "@/components/Reveal";
import CaseStudy from "./CaseStudy";

const PROJECTS = [
  { name: "Bae Laban", category: "Menu Design" },
  { name: "Chopdar", category: "Catalogue Design" },
  // Add more projects here as they're completed.
];

export default function Work() {
  return (
    <section id="work" className="section-divider py-4">
      <Reveal className="px-6 pt-32 text-center md:pt-40">
        <p className="text-xs uppercase tracking-[0.3em] text-gold">
          Selected Work
        </p>
        <h2 className="font-display mt-5 text-4xl text-foreground md:text-5xl">
          Proof, Not Promises
        </h2>
      </Reveal>

      {PROJECTS.map((project, i) => (
        <CaseStudy key={project.name} {...project} reversed={i % 2 === 1} />
      ))}
    </section>
  );
}
