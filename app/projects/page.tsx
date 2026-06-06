"use client";

import { useState, useMemo } from "react";
import { FolderGit2 } from "lucide-react";
import { projects } from "@/data";
import PostCard from "@/components/PostCard";
import FeedTabs from "@/components/FeedTabs";
import FlairPill from "@/components/FlairPill";

/* ── Map each project to an honest metric for the vote rail ────────────── */
const projectMetrics: Record<number, { count: number; label: string }> = {
  0: { count: 50, label: "K records" },
  1: { count: 86, label: "% acc." },
  2: { count: 3, label: "rd place" },
  3: { count: 5, label: "yr data" },
  4: { count: 4, label: "person" },
  5: { count: 2, label: "nd place" },
};

/* ── Featured / date-ish ordering ──────────────────────────────────────── */
const featuredOrder = [0, 2, 5, 1, 3, 4]; // hot = by impact
const dateOrder = [5, 4, 3, 2, 1, 0]; // newest first (reverse id)
const metricOrder = [...projects].sort(
  (a, b) => (projectMetrics[b.id]?.count ?? 0) - (projectMetrics[a.id]?.count ?? 0)
).map((p) => p.id);

const sortOrders: Record<string, number[]> = {
  hot: featuredOrder,
  new: dateOrder,
  top: metricOrder,
};

export default function ProjectsPage() {
  const [sort, setSort] = useState("hot");

  const sorted = useMemo(() => {
    const order = sortOrders[sort] ?? featuredOrder;
    return order.map((id) => projects.find((p) => p.id === id)!);
  }, [sort]);

  return (
    <>
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <FolderGit2 size={22} className="text-accent" />
        <h1 className="text-xl font-bold text-text">r/projects</h1>
        <FlairPill label={`${projects.length} posts`} color="var(--accent)" />
      </div>

      {/* Sort tabs */}
      <FeedTabs
        active={sort}
        tabs={[
          { id: "hot", label: "Hot", icon: "hot" },
          { id: "new", label: "New", icon: "new" },
          { id: "top", label: "Top", icon: "top" },
        ]}
        onTabChange={setSort}
      />

      {/* Feed */}
      <div className="flex flex-col gap-3">
        {sorted.map((project) => {
          const m = projectMetrics[project.id] ?? { count: 0, label: "" };
          return (
            <PostCard
              key={project.id}
              title={project.title}
              body={project.description}
              flairs={project.techStack}
              voteCount={m.count}
              voteLabel={m.label}
              githubLink={project.githubLink}
              demoLink={project.demoLink}
              expandedContent={
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((t) => (
                      <FlairPill key={t} label={t} color="var(--link)" />
                    ))}
                  </div>
                </div>
              }
            />
          );
        })}
      </div>
    </>
  );
}
