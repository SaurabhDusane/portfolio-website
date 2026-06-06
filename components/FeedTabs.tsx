"use client";

import { Flame, Clock, TrendingUp } from "lucide-react";

interface FeedTabsProps {
  active: string;
  tabs: { id: string; label: string; icon?: "hot" | "new" | "top" }[];
  onTabChange: (id: string) => void;
}

const icons = {
  hot: <Flame size={13} />,
  new: <Clock size={13} />,
  top: <TrendingUp size={13} />,
};

export default function FeedTabs({ active, tabs, onTabChange }: FeedTabsProps) {
  return (
    <div
      className="flex items-center gap-0.5 p-1 rounded-lg mb-3"
      style={{ background: "var(--surface)", border: "1px solid var(--border)", transition: "background-color 0.2s, border-color 0.2s" }}
      role="tablist"
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          role="tab"
          aria-selected={active === tab.id}
          onClick={() => onTabChange(tab.id)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[12px] font-medium transition-colors"
          style={{
            background: active === tab.id ? "var(--card)" : "transparent",
            color: active === tab.id ? "var(--text)" : "var(--text-hint)",
          }}
        >
          {tab.icon && icons[tab.icon]}
          {tab.label}
        </button>
      ))}
    </div>
  );
}
