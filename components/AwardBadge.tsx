"use client";

import { useState } from "react";
import { Trophy } from "lucide-react";

interface AwardBadgeProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  color?: string;
}

export default function AwardBadge({ icon, title, description, color = "var(--accent)" }: AwardBadgeProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div
        className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border cursor-default transition-colors hover:brightness-110"
        style={{
          backgroundColor: `${color}15`,
          borderColor: `${color}40`,
          color: color,
        }}
      >
        {icon || <Trophy size={12} />}
        {title}
      </div>
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 rounded-lg bg-surface border border-border shadow-lg text-xs text-text w-48 text-center z-50 pointer-events-none">
          <div className="font-semibold mb-0.5" style={{ color }}>{title}</div>
          <div className="text-text-muted">{description}</div>
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px w-2 h-2 rotate-45 bg-surface border-r border-b border-border" />
        </div>
      )}
    </div>
  );
}
