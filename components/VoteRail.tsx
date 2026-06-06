"use client";

import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

interface VoteRailProps {
  metric: string;
  label?: string;
}

export default function VoteRail({ metric, label }: VoteRailProps) {
  const [vote, setVote] = useState<"up" | "down" | null>(null);
  const [bouncing, setBouncing] = useState<"up" | "down" | null>(null);

  const handleVote = (dir: "up" | "down") => {
    setVote((prev) => (prev === dir ? null : dir));
    setBouncing(dir);
    setTimeout(() => setBouncing(null), 180);
  };

  return (
    <div
      className="flex flex-col items-center justify-center gap-0.5 py-3 shrink-0"
      style={{ width: 56, background: "var(--vote-bg)", borderRight: "1px solid var(--border)" }}
    >
      <button
        onClick={() => handleVote("up")}
        className={`p-0.5 rounded transition-colors ${bouncing === "up" ? "vote-bounce" : ""}`}
        aria-label="Upvote"
      >
        <ChevronUp
          size={18}
          strokeWidth={2.5}
          style={{ color: vote === "up" ? "var(--upvote)" : "var(--downvote)" }}
        />
      </button>
      <span
        className="text-xs font-medium tabular-nums leading-none"
        style={{ color: vote === "up" ? "var(--upvote)" : vote === "down" ? "var(--link)" : "var(--text)" }}
      >
        {metric}
      </span>
      {label && (
        <span className="text-[9px] leading-none" style={{ color: "var(--text-hint)" }}>{label}</span>
      )}
      <button
        onClick={() => handleVote("down")}
        className={`p-0.5 rounded transition-colors ${bouncing === "down" ? "vote-bounce" : ""}`}
        aria-label="Downvote"
      >
        <ChevronDown
          size={18}
          strokeWidth={2.5}
          style={{ color: vote === "down" ? "var(--link)" : "var(--downvote)" }}
        />
      </button>
    </div>
  );
}
