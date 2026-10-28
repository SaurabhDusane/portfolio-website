import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/data/projects";

/** One project in a list: title + year, one-line summary, key fact and stack. */
export default function ProjectRow({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.slug}`} className="row group">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="t-h3 row-title flex items-center gap-2 min-w-0">
          <span className="min-w-0">{project.title}</span>
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
    </Link>
  );
}
