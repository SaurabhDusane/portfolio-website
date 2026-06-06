"use client";

import { useState, useMemo } from "react";
import { PenLine, Calendar, Clock, Pin, ExternalLink } from "lucide-react";
import { articles } from "@/data";
import FeedTabs from "@/components/FeedTabs";
import FlairPill from "@/components/FlairPill";

const categories = ["All Posts", "Technical Essay", "Poetry & Creative", "Topical Essay"];

export default function WritingPage() {
  const [activeCategory, setActiveCategory] = useState("All Posts");

  const filtered = useMemo(() => {
    const list = activeCategory === "All Posts"
      ? articles
      : articles.filter((a) => a.category === activeCategory);
    return [...list].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }, [activeCategory]);

  const totalMinutes = articles.reduce((sum, a) => sum + a.readTime, 0);
  const uniqueCategories = new Set(articles.map((a) => a.category)).size;

  return (
    <>
      <div className="flex items-center gap-2.5 mb-1.5">
        <PenLine size={18} style={{ color: "var(--accent)" }} />
        <h1 className="text-[16px] font-medium" style={{ color: "var(--text)" }}>r/writing</h1>
      </div>

      <div className="flex items-center gap-3 text-[11px] mb-4" style={{ color: "var(--text-hint)" }}>
        <span className="font-medium" style={{ color: "var(--text-muted)" }}>{articles.length} Published</span>
        <span>&middot;</span>
        <span>{totalMinutes} min reading</span>
        <span>&middot;</span>
        <span>{uniqueCategories} categories</span>
      </div>

      <FeedTabs
        active={activeCategory}
        tabs={categories.map((c) => ({ id: c, label: c }))}
        onTabChange={setActiveCategory}
      />

      <div className="flex flex-col gap-2.5">
        {filtered.map((article) => (
          <a
            key={article.id}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="reddit-card p-3.5 block group"
          >
            <div className="flex items-center gap-1.5 text-[11px] mb-1.5 flex-wrap" style={{ color: "var(--text-hint)" }}>
              {article.featured && (
                <span className="flex items-center gap-1 font-medium" style={{ color: "var(--accent)" }}>
                  <Pin size={10} /> Featured
                </span>
              )}
              <FlairPill label={article.category} />
              <span className="flex items-center gap-1"><Calendar size={10} /> {article.date}</span>
              <span className="flex items-center gap-1"><Clock size={10} /> {article.readTime} min</span>
            </div>

            <h3 className="text-[14px] font-medium mb-1 transition-colors" style={{ color: "var(--text)" }}>
              {article.title}
            </h3>

            <p className="text-[12px] leading-[1.55] mb-2" style={{ color: "var(--text-muted)" }}>{article.excerpt}</p>

            <span className="inline-flex items-center gap-1 text-[11px] font-medium" style={{ color: "var(--accent)" }}>
              Read on Medium <ExternalLink size={10} />
            </span>
          </a>
        ))}
      </div>
    </>
  );
}
