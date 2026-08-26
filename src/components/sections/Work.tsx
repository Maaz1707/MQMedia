import Reveal from "@/components/Reveal";
import CaseStudy from "./CaseStudy";

const PROJECTS = [
  { name: "Bae Laban", category: "Menu Design" },
  { name: "Chopdar", category: "Catalogue Design" },
  // Add more projects here as they're completed.
];

export default function Work() {
  return (
    <section id="work" className="border-t border-border py-4">
      <Reveal className="px-6 pt-24 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-gold">
          Selected Work
        </p>
        <h2 className="font-display mt-4 text-3xl text-foreground md:text-4xl">
          Proof, Not Promises
        </h2>
      </Reveal>

      {PROJECTS.map((project, i) => (
        <CaseStudy key={project.name} {...project} reversed={i % 2 === 1} />
      ))}
    </section>
  );
}
