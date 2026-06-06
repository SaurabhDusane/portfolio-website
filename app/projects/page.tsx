"use client";

import { useState, useMemo } from "react";
import { FolderGit2 } from "lucide-react";
import { projects } from "@/data";
import PostCard from "@/components/PostCard";
import FeedTabs from "@/components/FeedTabs";
import FlairPill from "@/components/FlairPill";

export default function ProjectsPage() {
  const [sort, setSort] = useState("hot");

  const sorted = useMemo(() => {
    const list = [...projects];
    if (sort === "new") {
      list.sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
    } else if (sort === "top") {
      list.sort((a, b) => (b.topRank ?? 0) - (a.topRank ?? 0));
    }
    return list;
  }, [sort]);

  return (
    <>
      <div className="mb-1.5">
        <div className="flex items-center gap-2.5">
          <FolderGit2 size={18} style={{ color: "var(--accent)" }} />
          <h1 className="text-[16px] font-medium" style={{ color: "var(--text)" }}>r/projects</h1>
        </div>
        <p className="text-[11px] mt-1 ml-[30px]" style={{ color: "var(--text-hint)" }}>Things I've built</p>
      </div>

      <FeedTabs
        active={sort}
        tabs={[
          { id: "hot", label: "Hot", icon: "hot" },
          { id: "new", label: "New", icon: "new" },
          { id: "top", label: "Top", icon: "top" },
        ]}
        onTabChange={setSort}
      />

      <div className="flex flex-col gap-2.5">
        {sorted.map((project) => (
          <PostCard
            key={project.id}
            title={project.title}
            body={project.description}
            flairs={project.techStack}
            metric={project.metric ?? "—"}
            metricLabel={project.metricLabel}
            metricTooltip={project.metricTooltip}
            githubLink={project.githubLink}
            demoLink={project.demoLink}
            expandedContent={
              project.highlights && project.highlights.length > 0 ? (
                <div>
                  <ul className="space-y-1">
                    {project.highlights.map((h, i) => (
                      <li key={i} className="flex gap-2">
                        <span style={{ color: "var(--accent)" }}>&bull;</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1.5 mt-2 pt-2" style={{ borderTop: "1px solid var(--border)" }}>
                    {project.techStack.map((t) => (
                      <FlairPill key={t} label={t} />
                    ))}
                  </div>
                </div>
              ) : undefined
            }
          />
        ))}
      </div>
    </>
  );
}
