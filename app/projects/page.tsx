import type { Metadata } from "next";
import { projects } from "@/data";
import ProjectRow from "@/components/ProjectRow";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Work",
  description: "Projects by Saurabh Dusane: LLM agents, data pipelines, and applied machine learning.",
};

export default function ProjectsPage() {
  const selected = projects.filter((p) => p.featured);
  const more = projects.filter((p) => !p.featured);

  return (
    <div className="page">
      <h1 className="t-h1">Work</h1>
      <p className="t-body mt-3 max-w-[600px]">
        Agents, data pipelines, and applied ML: what I built, and the number that best describes how it turned out.
      </p>

      <section className="mt-12" aria-labelledby="selected-heading">
        <h2 id="selected-heading" className="t-h2 mb-2">Selected</h2>
        <div className="row-list">
          {selected.map((project, i) => (
            <Reveal key={project.id} delay={i * 50}>
              <ProjectRow project={project} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="more-heading">
        <h2 id="more-heading" className="t-h2 mb-2">More projects</h2>
        <div className="row-list">
          {more.map((project, i) => (
            <Reveal key={project.id} delay={Math.min(i * 50, 200)}>
              <ProjectRow project={project} />
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
