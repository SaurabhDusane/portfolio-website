"use client";

import { Flame, Clock, TrendingUp } from "lucide-react";

interface FeedTabsProps {
  active: string;
  tabs: { id: string; label: string; icon?: "hot" | "new" | "top" }[];
  onTabChange: (id: string) => void;
}

const icons = {
  hot: <Flame size={14} />,
  new: <Clock size={14} />,
  top: <TrendingUp size={14} />,
};

export default function FeedTabs({ active, tabs, onTabChange }: FeedTabsProps) {
  return (
    <div className="flex items-center gap-1 p-1 rounded-lg bg-surface border border-border mb-4" role="tablist">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          role="tab"
          aria-selected={active === tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
            active === tab.id
              ? "bg-card text-text"
              : "text-text-muted hover:text-text hover:bg-card/50"
          }`}
        >
          {tab.icon && icons[tab.icon]}
          {tab.label}
        </button>
      ))}
    </div>
  );
}
