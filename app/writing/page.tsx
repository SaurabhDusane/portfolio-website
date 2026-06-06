"use client";

import { useState, useMemo } from "react";
import { PenLine } from "lucide-react";
import { articles } from "@/data";
import FeedTabs from "@/components/FeedTabs";
import WritingGridCard from "@/components/WritingGridCard";

export default function WritingPage() {
  const [activeCategory, setActiveCategory] = useState("All Posts");

  const categoryTabs = useMemo(() => {
    const cats = Array.from(new Set(articles.map((a) => a.category)));
    return [{ id: "All Posts", label: "All Posts" }, ...cats.map((c) => ({ id: c, label: c }))];
  }, []);

  const filtered = useMemo(() => {
    const list = activeCategory === "All Posts"
      ? articles
      : articles.filter((a) => a.category === activeCategory);
    return [...list].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }, [activeCategory]);

  return (
    <>
      <div className="mb-1.5">
        <div className="flex items-center gap-2.5">
          <PenLine size={18} style={{ color: "var(--accent)" }} />
          <h1 className="text-[16px] font-medium" style={{ color: "var(--text)" }}>r/writing</h1>
        </div>
        <p className="text-[11px] mt-1 ml-[30px]" style={{ color: "var(--text-hint)" }}>Essays on AI, ethics, and systems.</p>
      </div>

      <FeedTabs
        active={activeCategory}
        tabs={categoryTabs}
        onTabChange={setActiveCategory}
      />

      <div className="feed-grid">
        {filtered.map((article) => (
          <WritingGridCard key={article.id} article={article} />
        ))}
      </div>
    </>
  );
}
