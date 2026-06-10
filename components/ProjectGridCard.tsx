"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronUp, ChevronDown, Share2, ExternalLink, MessageSquare, BookOpen } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import * as LucideIcons from "lucide-react";
import type { Project } from "@/data/projects";
import FlairPill from "./FlairPill";

const MAX_TAGS = 4;

function getIcon(name: string) {
  const key = name.charAt(0).toUpperCase() + name.slice(1);
  const Icon = (LucideIcons as Record<string, any>)[key];
  return Icon ?? LucideIcons.Folder;
}

export default function ProjectGridCard({ project }: { project: Project }) {
  const [vote, setVote] = useState<"up" | "down" | null>(null);
  const [bouncing, setBouncing] = useState<"up" | "down" | null>(null);
  const [expanded, setExpanded] = useState(false);
  const expandRef = useRef<HTMLDivElement>(null);
  const [expandHeight, setExpandHeight] = useState(0);

  useEffect(() => {
    if (expandRef.current) {
      setExpandHeight(expanded ? expandRef.current.scrollHeight : 0);
    }
  }, [expanded]);

  const handleVote = (dir: "up" | "down") => {
    setVote((prev) => (prev === dir ? null : dir));
    setBouncing(dir);
    setTimeout(() => setBouncing(null), 180);
  };

  const visibleTags = project.techStack.slice(0, MAX_TAGS);
  const extra = project.techStack.length - MAX_TAGS;
  const Icon = getIcon(project.icon);

  return (
    <article className="reddit-card overflow-hidden card-lift flex flex-col">
      {/* Image area — 16:9 */}
      <div className="relative" style={{ aspectRatio: "16/9" }}>
        {project.coverImage ? (
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 400px"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, var(--accent) 0%, #CC3700 100%)" }}
          >
            <Icon size={40} strokeWidth={1.4} style={{ color: "rgba(255,255,255,0.7)" }} />
          </div>
        )}
        {/* Subtle bottom scrim */}
        <div className="absolute inset-x-0 bottom-0 h-8" style={{ background: "linear-gradient(transparent, rgba(0,0,0,0.2))" }} />
      </div>

      {/* Card body */}
      <div className="p-3.5 flex flex-col flex-1 min-w-0">
        {/* Inline metric + byline */}
        <div className="flex items-center gap-2 mb-1.5">
          <div className="flex items-center gap-0.5">
            <button
              onClick={() => handleVote("up")}
              className={`p-0.5 rounded transition-colors ${bouncing === "up" ? "vote-bounce" : ""}`}
              aria-label="Upvote"
            >
              <ChevronUp
                size={14}
                strokeWidth={2.5}
                style={{ color: vote === "up" ? "var(--upvote)" : "var(--downvote)" }}
              />
            </button>
            <span
              className="text-[11px] font-medium tabular-nums cursor-default"
              style={{ color: vote === "up" ? "var(--upvote)" : vote === "down" ? "var(--link)" : "var(--text)" }}
              title={project.metricTooltip}
              aria-label={project.metricTooltip ? `${project.metric} ${project.metricLabel ?? ""} — ${project.metricTooltip}` : undefined}
              tabIndex={project.metricTooltip ? 0 : undefined}
            >
              {project.metric ?? "—"}
            </span>
            {project.metricLabel && (
              <span className="text-[9px]" style={{ color: "var(--text-hint)" }}>{project.metricLabel}</span>
            )}
            <button
              onClick={() => handleVote("down")}
              className={`p-0.5 rounded transition-colors ${bouncing === "down" ? "vote-bounce" : ""}`}
              aria-label="Downvote"
            >
              <ChevronDown
                size={14}
                strokeWidth={2.5}
                style={{ color: vote === "down" ? "var(--link)" : "var(--downvote)" }}
              />
            </button>
          </div>
          <span className="text-[10px]" style={{ color: "var(--text-hint)" }}>u/saurabh</span>
        </div>

        {/* Title */}
        <h3 className="text-[13px] font-medium leading-snug mb-1" style={{ color: "var(--text)" }}>
          {project.title}
        </h3>

        {/* Description — clamped */}
        <p
          className="text-[11px] leading-[1.5] mb-2 flex-1"
          style={{
            color: "var(--text-muted)",
            display: "-webkit-box",
            WebkitLineClamp: expanded ? "unset" : 3,
            WebkitBoxOrient: "vertical",
            overflow: expanded ? "visible" : "hidden",
          }}
        >
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1 mb-2.5">
          {visibleTags.map((t) => (
            <FlairPill key={t} label={t} />
          ))}
          {extra > 0 && (
            <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ color: "var(--text-hint)", background: "var(--rail)" }}>
              +{extra}
            </span>
          )}
        </div>

        {/* Expanded content */}
        <div
          ref={expandRef}
          className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
          style={{ maxHeight: expanded ? expandHeight || 500 : 0 }}
        >
          {project.highlights && project.highlights.length > 0 && (
            <div className="mb-2.5 p-2.5 rounded-lg text-[11px]" style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text-muted)" }}>
              <ul className="space-y-1">
                {project.highlights.map((h, i) => (
                  <li key={i} className="flex gap-1.5">
                    <span style={{ color: "var(--accent)" }}>&bull;</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
              {extra > 0 && (
                <div className="flex flex-wrap gap-1 mt-2 pt-2" style={{ borderTop: "1px solid var(--border)" }}>
                  {project.techStack.map((t) => (
                    <FlairPill key={t} label={t} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action row */}
        <div className="flex items-center gap-0.5 mt-auto -ml-1 flex-wrap">
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] transition-colors"
              style={{ color: "var(--text-hint)" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-hint)"; }}
            >
              <FaGithub size={11} /> GitHub
            </a>
          )}
          {project.demoLink && (
            <a
              href={project.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] transition-colors"
              style={{ color: "var(--text-hint)" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-hint)"; }}
            >
              <ExternalLink size={11} /> Live ↗
            </a>
          )}
          {project.highlights && project.highlights.length > 0 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] transition-colors"
              style={{ color: "var(--text-hint)" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-hint)"; }}
            >
              <MessageSquare size={11} /> Details
              {expanded ? <ChevronUp size={9} /> : <ChevronDown size={9} />}
            </button>
          )}
          {project.caseStudy && (
            <Link
              href={`/projects/${project.slug}`}
              className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-medium transition-colors"
              style={{ color: "var(--accent)" }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.8"; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
            >
              <BookOpen size={11} /> Read case study &rarr;
            </Link>
          )}
          <button
            onClick={() => navigator.clipboard?.writeText(window.location.href)}
            className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] transition-colors"
            style={{ color: "var(--text-hint)" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-hint)"; }}
          >
            <Share2 size={11} /> Share
          </button>
        </div>
      </div>
    </article>
  );
}
