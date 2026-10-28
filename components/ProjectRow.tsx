import { ViewTransition } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { hasCaseStudyContent } from "@/data/projects";
import ProjectCover from "./ProjectCover";

/**
 * One project in a list: generated thumbnail (wider screens), title + year,
 * one-line summary, key fact and stack. The thumbnail and title share view
 * transition names with the project page, so they morph into its cover and
 * heading on navigation.
 */
export default function ProjectRow({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.slug}`} className="row group project-row">
      <ViewTransition name={`cover-${project.slug}`} share="morph">
        <div className="project-thumb" aria-hidden="true">
          <ProjectCover slug={project.slug} variant="thumb" />
        </div>
      </ViewTransition>
      <div className="min-w-0">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="t-h3 row-title flex items-center gap-2 min-w-0">
            <ViewTransition name={`title-${project.slug}`} share="morph">
              <span className="min-w-0">{project.title}</span>
            </ViewTransition>
            {hasCaseStudyContent(project.caseStudy) && <span className="badge">Case study</span>}
            <ArrowRight size={16} className="row-arrow" aria-hidden="true" />
          </h3>
          {project.year && <span className="t-small shrink-0 tabular-nums">{project.year}</span>}
        </div>
        <p className="t-body mt-1">{project.summary}</p>
        <p className="t-small mt-2">
          {project.stat && <span style={{ color: "var(--accent)" }}>{project.stat}</span>}
          {project.stat && <span aria-hidden="true"> · </span>}
          <span>{project.techStack.slice(0, 4).join(", ")}</span>
        </p>
      </div>
    </Link>
  );
}
