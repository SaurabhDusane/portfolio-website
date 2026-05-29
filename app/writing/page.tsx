/**
 * Writing page — Medium essays with category filter, stats, and featured article.
 */
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PenLine,
  Clock,
  Calendar,
  ArrowUpRight,
  Layers,
  Star,
} from "lucide-react";
import { FaMedium } from "react-icons/fa";
import { articles, personalInfo } from "@/data";
import Button from "@/components/Button";
import PageTransition from "@/components/PageTransition";

const categories = ["All Posts", "Technical Essay", "Poetry & Creative", "Topical Essay"];

const categoryColors: Record<string, string> = {
  "Technical Essay": "bg-violet-500/15 text-violet-300 border-violet-500/20",
  "Poetry & Creative": "bg-fuchsia-500/15 text-fuchsia-300 border-fuchsia-500/20",
  "Topical Essay": "bg-amber-500/15 text-amber-300 border-amber-500/20",
};

/* ══════════════════════════════════════════════════════════════════════════════ */

export default function WritingPage() {
  const [activeCategory, setActiveCategory] = useState("All Posts");

  const filtered =
    activeCategory === "All Posts"
      ? articles
      : articles.filter((a) => a.category === activeCategory);

  const featured = articles.find((a) => a.featured);
  const totalReadTime = articles.reduce((sum, a) => sum + a.readTime, 0);
  const uniqueCategories = new Set(articles.map((a) => a.category)).size;

  return (
    <PageTransition className="max-w-4xl mx-auto px-6 pb-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-5"
      >
        <h1
          className="text-2xl font-bold text-white/90 inline-flex items-center gap-3 mb-3"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          <PenLine size={24} className="text-violet-400" aria-hidden="true" /> Writing &amp; Essays
        </h1>
        <p className="text-white/50 text-sm max-w-lg mx-auto mb-5">
          Where technical depth meets intellectual curiosity — essays on AI strategy, ethics, and the human condition
        </p>
        <Button href={personalInfo.medium} external>
          <FaMedium size={16} /> Visit Medium Blog
        </Button>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-3 gap-4 mb-8"
      >
        {[
          { value: articles.length, label: "Published" },
          { value: totalReadTime, label: "Min Reading" },
          { value: uniqueCategories, label: "Categories" },
        ].map((stat) => (
          <div key={stat.label} className="glass p-4 text-center">
            <div className="text-2xl font-bold gradient-text" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              {stat.value}
            </div>
            <div className="text-xs text-white/40 font-semibold uppercase tracking-wider mt-1">
              {stat.label}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Category Filter */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="flex flex-wrap justify-center gap-2 mb-8"
        role="tablist"
        aria-label="Filter articles by category"
      >
        {categories.map((cat) => (
          <button
            key={cat}
            role="tab"
            aria-selected={activeCategory === cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
              activeCategory === cat
                ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-500/25"
                : "bg-white/[0.04] border border-white/10 text-white/60 hover:text-white hover:bg-white/[0.06]"
            }`}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      {/* Featured Article */}
      {featured && activeCategory === "All Posts" && (
        <motion.a
          href={featured.url}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="block glass glass-accent relative overflow-hidden p-6 mb-8 group hover:shadow-lg hover:shadow-violet-500/[0.06]"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/20 text-amber-300 text-xs font-bold">
              <Star size={12} aria-hidden="true" /> Featured
            </span>
            <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${categoryColors[featured.category]}`}>
              {featured.category}
            </span>
          </div>
          <h2
            className="text-lg font-bold text-white/90 mb-2 group-hover:text-violet-300 transition-colors"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            {featured.title}
          </h2>
          <p className="text-sm text-white/60 leading-relaxed mb-3">{featured.excerpt}</p>
          <div className="flex gap-4 text-xs text-white/40 font-medium">
            <span className="flex items-center gap-1"><Calendar size={12} aria-hidden="true" /> {featured.date}</span>
            <span className="flex items-center gap-1"><Clock size={12} aria-hidden="true" /> {featured.readTime} min read</span>
          </div>
        </motion.a>
      )}

      {/* Article Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
          role="tabpanel"
        >
          {filtered
            .filter((a) => !a.featured || activeCategory !== "All Posts")
            .map((article, i) => (
              <motion.a
                key={article.id}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group glass p-5 flex flex-col hover:shadow-lg hover:shadow-violet-500/[0.06]"
              >
                <div className="mb-3">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${categoryColors[article.category] || "bg-white/10 text-white/60 border-white/20"}`}>
                    {article.category}
                  </span>
                </div>
                <h3
                  className="text-base font-semibold text-white/90 mb-2 line-clamp-2 group-hover:text-violet-300 transition-colors"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {article.title}
                </h3>
                <p className="text-sm text-white/60 leading-relaxed mb-4 flex-1 line-clamp-3">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-white/40 pt-3 border-t border-white/[0.06]">
                  <div className="flex gap-3">
                    <span className="flex items-center gap-1"><Calendar size={11} aria-hidden="true" /> {article.date}</span>
                    <span className="flex items-center gap-1"><Clock size={11} aria-hidden="true" /> {article.readTime} min</span>
                  </div>
                  <span className="flex items-center gap-1 text-violet-400 font-semibold group-hover:gap-2 transition-all">
                    Read <ArrowUpRight size={12} />
                  </span>
                </div>
              </motion.a>
            ))}
        </motion.div>
      </AnimatePresence>
    </PageTransition>
  );
}
