import type { Metadata } from "next";
import { projects, earlierProjects } from "@/data";
import ProjectRow from "@/components/ProjectRow";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Work",
  description: "Projects by Saurabh Dusane: LLM agents, data pipelines, and applied machine learning.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  const selected = projects.filter((p) => p.featured);
  const more = projects.filter((p) => !p.featured && !p.earlier);

  return (
    <div className="page">
      <h1 className="t-h1">Work</h1>
      <p className="t-body mt-3 max-w-[600px]">
        Things I’ve built, from LLM agents to data pipelines and applied ML. Each one lists the result that best sums it up.
      </p>

      <section className="mt-12" aria-labelledby="selected-heading">
        <h2 id="selected-heading" className="t-h2 mb-2">Selected</h2>
        <div className="row-list">
          {/* Above the fold: no reveal animation, so it paints immediately */}
          {selected.map((project) => (
            <ProjectRow key={project.id} project={project} />
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

      {earlierProjects.length > 0 && (
        <section id="earlier-work" className="section" aria-labelledby="earlier-heading">
          <h2 id="earlier-heading" className="t-h2">Earlier work</h2>
          <p className="t-small mt-2">Older projects, newest first.</p>
          <ul className="earlier mt-5">
            {[...earlierProjects]
              .sort((a, b) => (b.year ?? 0) - (a.year ?? 0))
              .map((p) => (
                <li key={p.slug} id={`earlier-${p.slug}`} className="earlier-item">
                  <span className="t-small tabular-nums">{p.year}</span>
                  <span className="min-w-0">
                    <span className="earlier-title">{p.title}</span>
                    {p.stat && <span className="earlier-stat"> · {p.stat}</span>}
                    <span className="t-small block">{p.summary}</span>
                  </span>
                </li>
              ))}
          </ul>
        </section>
      )}
    </div>
  );
}
