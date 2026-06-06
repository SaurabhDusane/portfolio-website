"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FolderGit2, PenLine } from "lucide-react";
import { personalInfo, focusDomains, projects, articles } from "@/data";
import FlairPill from "@/components/FlairPill";
import PostCard from "@/components/PostCard";

const projectMetrics: Record<number, { metric: string; label: string }> = {
  0: { metric: "50K", label: "records" },
  1: { metric: "86%", label: "acc." },
  2: { metric: "3rd", label: "place" },
  3: { metric: "5yr", label: "data" },
  4: { metric: "4", label: "team" },
  5: { metric: "2nd", label: "place" },
};

export default function HomePage() {
  const hotProjects = projects.slice(0, 3);
  const hotArticles = articles.filter((a) => a.featured).concat(
    articles.filter((a) => !a.featured).slice(0, 1)
  );

  return (
    <>
      {/* Pinned welcome */}
      <article className="reddit-card overflow-hidden mb-4">
        <div className="px-3.5 py-1.5 flex items-center gap-2 text-[11px] font-medium" style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)", color: "var(--success)" }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M16 2H8a2 2 0 0 0-2 2v2l-2 6v2h6v8l2 2 2-2v-8h6v-2l-2-6V4a2 2 0 0 0-2-2z"/></svg>
          Pinned by u/saurabh
        </div>
        <div className="p-4">
          <div className="flex items-start gap-3.5">
            <div className="relative shrink-0" style={{ width: 52, height: 52 }}>
              <div className="rounded-full overflow-hidden" style={{ width: 52, height: 52, border: "2px solid var(--border)" }}>
                <Image src="/headshot.png" alt="Saurabh Dusane" width={52} height={52} className="object-cover" />
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full online-dot" style={{ background: "var(--success)", border: "2px solid var(--card)" }} />
            </div>
            <div className="min-w-0">
              <h1 className="text-[16px] font-medium" style={{ color: "var(--text)" }}>Saurabh Nilesh Dusane</h1>
              <div className="flex flex-wrap gap-1.5 mt-1.5 mb-2.5">
                <FlairPill label="AI/ML Engineer" accent />
                <FlairPill label="Data Scientist" />
                <FlairPill label="Full-Stack AI Builder" />
              </div>
              <p className="text-[12px] leading-[1.55]" style={{ color: "var(--text-muted)" }}>
                Passionate about building intelligent ML systems that transform real-world data into
                meaningful outcomes. Exploring the intersection of predictive analytics, NLP, and scalable AI.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 mt-3.5 pt-3" style={{ borderTop: "1px solid var(--border)" }}>
            {focusDomains.map((d) => (
              <FlairPill key={d.label} label={d.label} />
            ))}
          </div>
        </div>
      </article>

      {/* Hot projects */}
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2">
          <FolderGit2 size={14} style={{ color: "var(--accent)" }} />
          <h2 className="text-[13px] font-medium" style={{ color: "var(--text)" }}>Hot from r/projects</h2>
        </div>
        <Link href="/projects" className="flex items-center gap-1 text-[11px]" style={{ color: "var(--accent)" }}>
          View all <ArrowRight size={11} />
        </Link>
      </div>
      <div className="flex flex-col gap-2.5 mb-5">
        {hotProjects.map((project) => {
          const m = projectMetrics[project.id] ?? { metric: "0", label: "" };
          return (
            <PostCard
              key={project.id}
              title={project.title}
              body={project.description}
              flairs={project.techStack.slice(0, 3)}
              metric={m.metric}
              metricLabel={m.label}
              githubLink={project.githubLink}
              demoLink={project.demoLink}
            />
          );
        })}
      </div>

      {/* Latest writing */}
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2">
          <PenLine size={14} style={{ color: "var(--accent)" }} />
          <h2 className="text-[13px] font-medium" style={{ color: "var(--text)" }}>Latest from r/writing</h2>
        </div>
        <Link href="/writing" className="flex items-center gap-1 text-[11px]" style={{ color: "var(--accent)" }}>
          View all <ArrowRight size={11} />
        </Link>
      </div>
      <div className="flex flex-col gap-2.5">
        {hotArticles.map((article) => (
          <a key={article.id} href={article.url} target="_blank" rel="noopener noreferrer" className="reddit-card p-3.5 block group">
            <div className="flex items-center gap-1.5 text-[11px] mb-1 flex-wrap" style={{ color: "var(--text-hint)" }}>
              {article.featured && (
                <span className="font-medium" style={{ color: "var(--accent)" }}>Featured</span>
              )}
              <FlairPill label={article.category} />
              <span>{article.date}</span>
              <span>{article.readTime} min read</span>
            </div>
            <h3 className="text-[13px] font-medium mb-0.5 transition-colors" style={{ color: "var(--text)" }}>
              {article.title}
            </h3>
            <p className="text-[11px] leading-[1.55]" style={{ color: "var(--text-muted)" }}>{article.excerpt}</p>
          </a>
        ))}
      </div>
    </>
  );
}
