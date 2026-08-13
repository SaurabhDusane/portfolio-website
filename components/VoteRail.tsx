"use client";

import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

interface VoteRailProps {
  metric: string;
  label?: string;
  tooltip?: string;
}

/**
 * Keeps metric/label text inside the fixed-width rail: centered, wrapping on
 * word boundaries (never mid-word), clipped with an ellipsis if it still can't
 * fit, and never wider than the rail.
 */
const railTextGuard: React.CSSProperties = {
  maxWidth: "100%",
  overflow: "hidden",
  textOverflow: "ellipsis",
  textAlign: "center",
  overflowWrap: "break-word",
  wordBreak: "keep-all",
  lineHeight: 1.15,
};

export default function VoteRail({ metric, label, tooltip }: VoteRailProps) {
  const [vote, setVote] = useState<"up" | "down" | null>(null);
  const [bouncing, setBouncing] = useState<"up" | "down" | null>(null);
  const [hoverUp, setHoverUp] = useState(false);

  const triggerBounce = (dir: "up" | "down") => {
    setBouncing(dir);
    setTimeout(() => setBouncing(null), 180);
  };

  const handleVote = (dir: "up" | "down") => {
    setVote((prev) => (prev === dir ? null : dir));
    triggerBounce(dir);
  };

  return (
    <div
      className="flex flex-col items-center justify-center gap-0.5 py-3 px-1 shrink-0 rounded-l-[10px]"
      style={{ width: 56, background: "var(--rail)", borderRight: "1px solid var(--border)", transition: "background-color 0.2s, border-color 0.2s" }}
    >
      <button
        onClick={() => handleVote("up")}
        onMouseEnter={() => { setHoverUp(true); triggerBounce("up"); }}
        onMouseLeave={() => setHoverUp(false)}
        className={`p-0.5 rounded transition-colors ${bouncing === "up" ? "vote-bounce" : ""}`}
        aria-label="Upvote"
      >
        <ChevronUp
          size={18}
          strokeWidth={2.5}
          style={{ color: vote === "up" || hoverUp ? "var(--accent)" : "var(--downvote)" }}
        />
      </button>
      <span
        className="text-xs font-medium tabular-nums cursor-default"
        style={{ color: vote === "down" ? "var(--link)" : "var(--accent)", ...railTextGuard }}
        title={tooltip}
        aria-label={tooltip ? `${metric} ${label ?? ""} — ${tooltip}` : undefined}
        tabIndex={tooltip ? 0 : undefined}
      >
        {metric}
      </span>
      {label && (
        <span className="text-[9px]" style={{ color: "var(--text-hint)", ...railTextGuard }}>{label}</span>
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
