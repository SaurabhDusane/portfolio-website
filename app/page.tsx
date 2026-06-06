"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FolderGit2, PenLine } from "lucide-react";
import { personalInfo, focusDomains, projects, articles } from "@/data";
import FlairPill from "@/components/FlairPill";
import PostCard from "@/components/PostCard";

const domainColors: Record<string, string> = {
  brain: "var(--accent)",
  chart: "var(--link)",
  bot: "#A855F7",
  eye: "#14B8A6",
};

/* metric per project for vote rail */
const projectMetrics: Record<number, { count: number; label: string }> = {
  0: { count: 50, label: "K records" },
  1: { count: 86, label: "% acc." },
  2: { count: 3, label: "rd place" },
  3: { count: 5, label: "yr data" },
  4: { count: 4, label: "person" },
  5: { count: 2, label: "nd place" },
};

export default function HomePage() {
  /* Show top 3 projects + top 2 articles as hot posts */
  const hotProjects = projects.slice(0, 3);
  const hotArticles = articles.filter((a) => a.featured).concat(
    articles.filter((a) => !a.featured).slice(0, 1)
  );

  return (
    <>
      {/* ── Pinned welcome post ───────────────────────────────────────── */}
      <article className="reddit-card overflow-hidden mb-4">
        <div className="bg-surface/50 border-b border-border px-4 py-1.5 flex items-center gap-2 text-xs text-success font-semibold">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M16 2H8a2 2 0 0 0-2 2v2l-2 6v2h6v8l2 2 2-2v-8h6v-2l-2-6V4a2 2 0 0 0-2-2z"/></svg>
          Pinned by u/saurabh
        </div>
        <div className="p-4">
          <div className="flex items-start gap-4">
            <div className="relative w-16 h-16 rounded-full border-2 border-accent/30 overflow-hidden shrink-0">
              <Image src="/headshot.png" alt="Saurabh Dusane" fill className="object-cover" sizes="64px" />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-card online-dot" />
            </div>
            <div className="min-w-0">
              <h1 className="text-lg font-bold text-text">Saurabh Nilesh Dusane</h1>
              <div className="flex flex-wrap gap-1.5 mt-1 mb-3">
                <FlairPill label="AI/ML Engineer" color="var(--accent)" />
                <FlairPill label="Data Scientist" color="var(--link)" />
                <FlairPill label="Full-Stack AI Builder" color="#A855F7" />
              </div>
              <p className="text-sm text-text-muted leading-relaxed">
                Passionate about building intelligent ML systems that transform real-world data into
                meaningful outcomes. Exploring the intersection of predictive analytics, NLP, and scalable AI.
              </p>
            </div>
          </div>

          {/* Interest flair chips */}
          <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-border">
            {focusDomains.map((d) => (
              <FlairPill key={d.label} label={d.label} color={domainColors[d.icon] || "var(--text-muted)"} />
            ))}
          </div>
        </div>
      </article>

      {/* ── Hot Projects ──────────────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <FolderGit2 size={16} className="text-accent" />
          <h2 className="text-sm font-semibold text-text">Hot from r/projects</h2>
        </div>
        <Link href="/projects" className="flex items-center gap-1 text-xs text-accent hover:underline">
          View all <ArrowRight size={12} />
        </Link>
      </div>
      <div className="flex flex-col gap-3 mb-6">
        {hotProjects.map((project) => {
          const m = projectMetrics[project.id] ?? { count: 0, label: "" };
          return (
            <PostCard
              key={project.id}
              title={project.title}
              body={project.description}
              flairs={project.techStack.slice(0, 3)}
              voteCount={m.count}
              voteLabel={m.label}
              githubLink={project.githubLink}
              demoLink={project.demoLink}
            />
          );
        })}
      </div>

      {/* ── Hot Articles ──────────────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <PenLine size={16} className="text-accent" />
          <h2 className="text-sm font-semibold text-text">Latest from r/writing</h2>
        </div>
        <Link href="/writing" className="flex items-center gap-1 text-xs text-accent hover:underline">
          View all <ArrowRight size={12} />
        </Link>
      </div>
      <div className="flex flex-col gap-3">
        {hotArticles.map((article) => (
          <a key={article.id} href={article.url} target="_blank" rel="noopener noreferrer" className="reddit-card p-4 block group">
            <div className="flex items-center gap-2 text-xs text-text-muted mb-1 flex-wrap">
              {article.featured && (
                <span className="text-accent font-semibold">Featured</span>
              )}
              <FlairPill label={article.category} />
              <span>{article.date}</span>
              <span>{article.readTime} min read</span>
            </div>
            <h3 className="text-sm font-semibold text-text group-hover:text-link transition-colors mb-1">
              {article.title}
            </h3>
            <p className="text-xs text-text-muted">{article.excerpt}</p>
          </a>
        ))}
      </div>
    </>
  );
}
