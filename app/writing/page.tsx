"use client";

import { useState, useMemo } from "react";
import { PenLine, Calendar, Clock, Pin, ExternalLink } from "lucide-react";
import { articles } from "@/data";
import FeedTabs from "@/components/FeedTabs";
import FlairPill from "@/components/FlairPill";

const categoryColors: Record<string, string> = {
  "Technical Essay": "var(--link)",
  "Poetry & Creative": "#A855F7",
  "Topical Essay": "#14B8A6",
};

const categories = ["All Posts", "Technical Essay", "Poetry & Creative", "Topical Essay"];

export default function WritingPage() {
  const [activeCategory, setActiveCategory] = useState("All Posts");

  const filtered = useMemo(() => {
    const list = activeCategory === "All Posts"
      ? articles
      : articles.filter((a) => a.category === activeCategory);
    // featured (pinned) first
    return [...list].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }, [activeCategory]);

  const totalMinutes = articles.reduce((sum, a) => sum + a.readTime, 0);
  const uniqueCategories = new Set(articles.map((a) => a.category)).size;

  return (
    <>
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <PenLine size={22} className="text-accent" />
        <h1 className="text-xl font-bold text-text">r/writing</h1>
      </div>

      {/* Stats row */}
      <div className="flex items-center gap-4 text-xs text-text-muted mb-4">
        <span className="font-semibold text-text">{articles.length} Published</span>
        <span>&middot;</span>
        <span>{totalMinutes} Min Reading</span>
        <span>&middot;</span>
        <span>{uniqueCategories} Categories</span>
      </div>

      {/* Category tabs */}
      <FeedTabs
        active={activeCategory}
        tabs={categories.map((c) => ({ id: c, label: c }))}
        onTabChange={setActiveCategory}
      />

      {/* Articles feed */}
      <div className="flex flex-col gap-3">
        {filtered.map((article) => (
          <a
            key={article.id}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="reddit-card p-4 block group"
          >
            {/* Meta row */}
            <div className="flex items-center gap-2 text-xs text-text-muted mb-1.5 flex-wrap">
              {article.featured && (
                <span className="flex items-center gap-1 text-accent font-semibold">
                  <Pin size={12} /> Featured
                </span>
              )}
              <FlairPill
                label={article.category}
                color={categoryColors[article.category]}
              />
              <span className="flex items-center gap-1"><Calendar size={12} /> {article.date}</span>
              <span className="flex items-center gap-1"><Clock size={12} /> {article.readTime} min</span>
            </div>

            {/* Title */}
            <h3 className="text-base font-semibold text-text group-hover:text-link transition-colors mb-1">
              {article.title}
            </h3>

            {/* Excerpt */}
            <p className="text-sm text-text-muted leading-relaxed mb-2">{article.excerpt}</p>

            {/* Read link */}
            <span className="inline-flex items-center gap-1 text-xs text-accent font-medium group-hover:underline">
              Read on Medium <ExternalLink size={12} />
            </span>
          </a>
        ))}
      </div>
    </>
  );
}
