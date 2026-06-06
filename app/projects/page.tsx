"use client";

import { useState, useMemo } from "react";
import { FolderGit2 } from "lucide-react";
import { projects } from "@/data";
import PostCard from "@/components/PostCard";
import FeedTabs from "@/components/FeedTabs";
import FlairPill from "@/components/FlairPill";

const projectMetrics: Record<number, { metric: string; label: string }> = {
  0: { metric: "50K", label: "records" },
  1: { metric: "86%", label: "acc." },
  2: { metric: "3rd", label: "place" },
  3: { metric: "5yr", label: "data" },
  4: { metric: "4", label: "team" },
  5: { metric: "2nd", label: "place" },
};

const featuredOrder = [0, 2, 5, 1, 3, 4];
const dateOrder = [5, 4, 3, 2, 1, 0];
const metricOrder = [0, 1, 3, 2, 5, 4];

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
      <div className="flex items-center gap-2.5 mb-4">
        <FolderGit2 size={18} style={{ color: "var(--accent)" }} />
        <h1 className="text-[16px] font-medium" style={{ color: "var(--text)" }}>r/projects</h1>
        <FlairPill label={`${projects.length} posts`} accent />
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
        {sorted.map((project) => {
          const m = projectMetrics[project.id] ?? { metric: "0", label: "" };
          return (
            <PostCard
              key={project.id}
              title={project.title}
              body={project.description}
              flairs={project.techStack}
              metric={m.metric}
              metricLabel={m.label}
              githubLink={project.githubLink}
              demoLink={project.demoLink}
              expandedContent={
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((t) => (
                    <FlairPill key={t} label={t} />
                  ))}
                </div>
              }
            />
          );
        })}
      </div>
    </>
  );
}
