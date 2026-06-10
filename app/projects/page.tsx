"use client";

import { useState, useMemo } from "react";
import { FolderGit2 } from "lucide-react";
import { projects } from "@/data";
import FeedTabs from "@/components/FeedTabs";
import ProjectGridCard from "@/components/ProjectGridCard";
import Reveal from "@/components/Reveal";

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

      <div className="feed-grid">
        {sorted.map((project, i) => (
          <Reveal key={project.id} delay={Math.min(i * 50, 250)}>
            <ProjectGridCard project={project} />
          </Reveal>
        ))}
      </div>
    </>
  );
}
