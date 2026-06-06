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
  voteCount: number;
  voteLabel?: string;
  githubLink?: string;
  demoLink?: string;
  expandedContent?: React.ReactNode;
  pinned?: boolean;
  badge?: string;
  badgeColor?: string;
}

export default function PostCard({
  title,
  body,
  author = "u/saurabh",
  flairs,
  voteCount,
  voteLabel,
  githubLink,
  demoLink,
  expandedContent,
  pinned,
  badge,
  badgeColor,
}: PostCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="reddit-card flex overflow-hidden">
      {/* Vote Rail */}
      <div className="bg-surface/50 border-r border-border flex-shrink-0">
        <VoteRail initialCount={voteCount} label={voteLabel} />
      </div>

      {/* Body */}
      <div className="flex-1 p-3 min-w-0">
        {/* Meta row */}
        <div className="flex items-center gap-2 text-xs text-text-muted mb-1.5 flex-wrap">
          {pinned && (
            <span className="flex items-center gap-1 text-success font-semibold">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M16 2H8a2 2 0 0 0-2 2v2l-2 6v2h6v8l2 2 2-2v-8h6v-2l-2-6V4a2 2 0 0 0-2-2z"/></svg>
              Pinned
            </span>
          )}
          {badge && (
            <span
              className="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase"
              style={{ backgroundColor: `${badgeColor}20`, color: badgeColor }}
            >
              {badge}
            </span>
          )}
          <span>{author}</span>
          <span>&middot;</span>
          <div className="flex flex-wrap gap-1">
            {flairs.slice(0, 4).map((f) => (
              <FlairPill key={f} label={f} />
            ))}
            {flairs.length > 4 && (
              <span className="text-text-muted text-[10px]">+{flairs.length - 4}</span>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base font-semibold text-text leading-snug mb-1.5 group-hover:text-link transition-colors">
          {title}
        </h3>

        {/* Body */}
        <p className="text-sm text-text-muted leading-relaxed mb-3">{body}</p>

        {/* Expanded content */}
        {expanded && expandedContent && (
          <div className="mb-3 p-3 rounded-lg bg-surface border border-border text-sm text-text-muted">
            {expandedContent}
          </div>
        )}

        {/* Action row */}
        <div className="flex items-center gap-1 -ml-1.5 flex-wrap">
          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs text-text-muted hover:bg-card-hover hover:text-text transition-colors"
            >
              <FaGithub size={14} /> GitHub
            </a>
          )}
          {demoLink && (
            <a
              href={demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs text-text-muted hover:bg-card-hover hover:text-text transition-colors"
            >
              <ExternalLink size={14} /> Live
            </a>
          )}
          {expandedContent && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs text-text-muted hover:bg-card-hover hover:text-text transition-colors"
            >
              <MessageSquare size={14} /> Details
              {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            </button>
          )}
          <button
            onClick={() => navigator.clipboard?.writeText(window.location.href)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs text-text-muted hover:bg-card-hover hover:text-text transition-colors"
          >
            <Share2 size={14} /> Share
          </button>
        </div>
      </div>
    </article>
  );
}
