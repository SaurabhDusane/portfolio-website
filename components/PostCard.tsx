"use client";

import { useState } from "react";
import { MessageSquare, Share2, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import VoteRail from "./VoteRail";
import FlairPill from "./FlairPill";

interface PostCardProps {
  title: string;
  body: string;
  author?: string;
  flairs: string[];
  metric: string;
  metricLabel?: string;
  githubLink?: string;
  demoLink?: string;
  expandedContent?: React.ReactNode;
  pinned?: boolean;
  badge?: string;
}

export default function PostCard({
  title,
  body,
  author = "u/saurabh",
  flairs,
  metric,
  metricLabel,
  githubLink,
  demoLink,
  expandedContent,
  pinned,
  badge,
}: PostCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="reddit-card flex overflow-hidden">
      {/* Vote Rail */}
      <VoteRail metric={metric} label={metricLabel} />

      {/* Body */}
      <div className="flex-1 p-3.5 min-w-0">
        {/* Meta row — inline tech as muted text */}
        <div className="flex items-center gap-1.5 text-[11px] mb-1.5 flex-wrap" style={{ color: "var(--text-hint)" }}>
          {pinned && (
            <span className="flex items-center gap-1 font-medium" style={{ color: "var(--success)" }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M16 2H8a2 2 0 0 0-2 2v2l-2 6v2h6v8l2 2 2-2v-8h6v-2l-2-6V4a2 2 0 0 0-2-2z"/></svg>
              Pinned
            </span>
          )}
          {badge && (
            <span
              className="px-1.5 py-0.5 rounded text-[10px] font-medium uppercase"
              style={{ backgroundColor: "var(--pill-accent-bg)", color: "var(--pill-accent-text)" }}
            >
              {badge}
            </span>
          )}
          <span>{author}</span>
          {flairs.length > 0 && (
            <>
              <span>&middot;</span>
              <span>{flairs.join(" \u00b7 ")}</span>
            </>
          )}
        </div>

        {/* Title */}
        <h3 className="text-[14px] font-medium leading-snug mb-1.5" style={{ color: "var(--text)" }}>
          {title}
        </h3>

        {/* Body */}
        <p className="text-[12px] leading-[1.55] mb-3" style={{ color: "var(--text-muted)" }}>{body}</p>

        {/* Expanded content */}
        {expanded && expandedContent && (
          <div className="mb-3 p-3 rounded-lg text-[12px]" style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text-muted)" }}>
            {expandedContent}
          </div>
        )}

        {/* Action row */}
        <div className="flex items-center gap-0.5 -ml-1.5 flex-wrap">
          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[11px] transition-colors"
              style={{ color: "var(--text-hint)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-hint)")}
            >
              <FaGithub size={13} /> GitHub
            </a>
          )}
          {demoLink && (
            <a
              href={demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[11px] transition-colors"
              style={{ color: "var(--text-hint)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-hint)")}
            >
              <ExternalLink size={13} /> Live
            </a>
          )}
          {expandedContent && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[11px] transition-colors"
              style={{ color: "var(--text-hint)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-hint)")}
            >
              <MessageSquare size={13} /> Details
              {expanded ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
            </button>
          )}
          <button
            onClick={() => navigator.clipboard?.writeText(window.location.href)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[11px] transition-colors"
            style={{ color: "var(--text-hint)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-hint)")}
          >
            <Share2 size={13} /> Share
          </button>
        </div>
      </div>
    </article>
  );
}
