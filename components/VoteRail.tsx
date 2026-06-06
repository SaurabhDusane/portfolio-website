"use client";

import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

interface VoteRailProps {
  initialCount: number;
  label?: string;
}

export default function VoteRail({ initialCount, label }: VoteRailProps) {
  const [vote, setVote] = useState<"up" | "down" | null>(null);
  const [bouncing, setBouncing] = useState<"up" | "down" | null>(null);

  const count = initialCount + (vote === "up" ? 1 : vote === "down" ? -1 : 0);

  const handleVote = (dir: "up" | "down") => {
    setVote((prev) => (prev === dir ? null : dir));
    setBouncing(dir);
    setTimeout(() => setBouncing(null), 200);
  };

  return (
    <div className="flex flex-col items-center gap-0.5 py-2 px-1.5 min-w-[40px]">
      <button
        onClick={() => handleVote("up")}
        className={`p-0.5 rounded hover:bg-upvote/20 transition-colors ${bouncing === "up" ? "vote-bounce" : ""}`}
        aria-label="Upvote"
      >
        <ChevronUp
          size={20}
          className={vote === "up" ? "text-upvote" : "text-text-muted hover:text-upvote"}
        />
      </button>
      <span className={`text-xs font-bold tabular-nums ${vote === "up" ? "text-upvote" : vote === "down" ? "text-downvote" : "text-text"}`}>
        {count}
      </span>
      {label && <span className="text-[9px] text-text-muted leading-none">{label}</span>}
      <button
        onClick={() => handleVote("down")}
        className={`p-0.5 rounded hover:bg-downvote/20 transition-colors ${bouncing === "down" ? "vote-bounce" : ""}`}
        aria-label="Downvote"
      >
        <ChevronDown
          size={20}
          className={vote === "down" ? "text-downvote" : "text-text-muted hover:text-downvote"}
        />
      </button>
    </div>
  );
}
