"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FolderGit2, PenLine } from "lucide-react";
import { personalInfo, focusDomains, projects, articles } from "@/data";
import FlairPill from "@/components/FlairPill";
import PostCard from "@/components/PostCard";
import RightSidebar from "@/components/RightSidebar";

export default function HomePage() {
  const hotProjects = projects.slice(0, 3);
  const hotArticles = articles.filter((a) => a.featured).concat(
    articles.filter((a) => !a.featured).slice(0, 1)
  );

  return (
    <>
      {/* ─── Full-width pinned hero ─────────────────────────────────────── */}
      <article className="reddit-card overflow-hidden mb-5">
        {/* Pinned label */}
        <div className="px-5 py-1.5 flex items-center gap-2 text-[11px] font-medium" style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)", color: "var(--success)" }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M16 2H8a2 2 0 0 0-2 2v2l-2 6v2h6v8l2 2 2-2v-8h6v-2l-2-6V4a2 2 0 0 0-2-2z"/></svg>
          Pinned by u/saurabh
        </div>

        {/* Cover banner — image or gradient fallback */}
        <div className="relative" style={{ height: 180 }}>
          {personalInfo.heroCover ? (
            <Image
              src={personalInfo.heroCover}
              alt="Cover"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 900px"
              priority
            />
          ) : (
            <div className="w-full h-full" style={{ background: "linear-gradient(135deg, #FF4500 0%, #CC3700 100%)" }} />
          )}
          {/* Scrim for text legibility over busy images */}
          <div className="absolute inset-x-0 bottom-0 h-20" style={{ background: "linear-gradient(transparent, rgba(0,0,0,0.35))" }} />
        </div>

        {/* Content — avatar overlaps cover bottom */}
        <div style={{ padding: "0 24px 24px", marginTop: -32 }}>
          <div className="relative" style={{ width: 64, height: 64 }}>
            <div
              className="rounded-full overflow-hidden"
              style={{ width: 64, height: 64, border: "4px solid var(--card)" }}
            >
              <Image src="/headshot.png" alt="Saurabh Dusane" width={64} height={64} className="object-cover" />
            </div>
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full online-dot" style={{ background: "var(--success)", border: "2px solid var(--card)" }} />
          </div>

          <h1 className="text-[18px] font-medium mt-3" style={{ color: "var(--text)" }}>
            {personalInfo.name}
          </h1>

          <div className="flex flex-wrap gap-1.5 mt-2 mb-3">
            <FlairPill label="AI/ML Engineer" accent />
            <FlairPill label="Data Scientist" />
            <FlairPill label="Full-Stack AI Builder" />
          </div>

          <p className="text-[13px] leading-[1.6] max-w-[640px]" style={{ color: "var(--text-muted)" }}>
            Passionate about building intelligent ML systems that transform real-world data into
            meaningful outcomes. Exploring the intersection of predictive analytics, NLP, and scalable AI.
          </p>

          <div className="flex flex-wrap gap-1.5 mt-4 pt-3.5" style={{ borderTop: "1px solid var(--border)" }}>
            {focusDomains.map((d) => (
              <FlairPill key={d.label} label={d.label} />
            ))}
          </div>
        </div>
      </article>

      {/* ─── Two-column row: Feed + Profile card ────────────────────────── */}
      <div className="home-row">
        {/* Feed column */}
        <div className="home-feed">
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
            {hotProjects.map((project) => (
              <PostCard
                key={project.id}
                title={project.title}
                body={project.description}
                flairs={project.techStack.slice(0, 3)}
                metric={project.metric ?? "—"}
                metricLabel={project.metricLabel}
                metricTooltip={project.metricTooltip}
                githubLink={project.githubLink}
                demoLink={project.demoLink}
              />
            ))}
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
              <a key={article.id} href={article.url} target="_blank" rel="noopener noreferrer" className="reddit-card p-3.5 block group card-lift">
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
        </div>

        {/* Profile card — right column, sticky */}
        <div className="home-profile hidden lg:block">
          <RightSidebar />
        </div>
      </div>
    </>
  );
}
