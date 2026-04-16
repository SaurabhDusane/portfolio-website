"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PenLine,
  Clock,
  Calendar,
  BookOpen,
  ArrowUpRight,
  Layers,
} from "lucide-react";
import { FaMedium } from "react-icons/fa";
import { articles } from "@/lib/data";

const categories = ["All Posts", "Technical Essay", "Poetry & Creative", "Topical Essay"];

const categoryColors: Record<string, string> = {
  "Technical Essay": "bg-indigo-500/15 text-indigo-300 border-indigo-500/20",
  "Poetry & Creative": "bg-purple-500/15 text-purple-300 border-purple-500/20",
  "Topical Essay": "bg-amber-500/15 text-amber-300 border-amber-500/20",
};

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
    <div className="max-w-4xl mx-auto px-6 pb-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1
          className="text-2xl font-bold text-white/90 inline-flex items-center gap-3 mb-3"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          <PenLine size={24} className="text-indigo-400" /> Writing &amp; Essays
        </h1>
        <p className="text-white/60 text-sm max-w-lg mx-auto mb-5">
          Where technical depth meets intellectual curiosity — essays on AI
          strategy, ethics, and the human condition
        </p>
        <a
          href="https://medium.com/@saurndusane13"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-semibold shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:-translate-y-1"
        >
          <FaMedium size={16} /> Visit Medium Blog
        </a>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-3 gap-4 mb-8"
      >
        {[
          { value: articles.length, label: "Published Articles" },
          { value: totalReadTime, label: "Minutes of Reading" },
          { value: uniqueCategories, label: "Categories" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="glass p-5 text-center hover:scale-[1.02]"
          >
            <div
              className="text-2xl font-bold gradient-text"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {stat.value}
            </div>
            <div className="text-xs text-white/50 font-semibold uppercase tracking-wider mt-1">
              {stat.label}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Category Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="flex flex-wrap justify-center gap-2 mb-10"
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${
              activeCategory === cat
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30"
                : "bg-white/[0.04] border border-white/10 text-white/60 hover:text-white hover:bg-white/[0.08]"
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="block glass p-8 mb-8 group hover:scale-[1.01]"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/20 text-amber-300 text-xs font-bold">
              <Star /> Featured
            </span>
            <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${categoryColors[featured.category]}`}>
              {featured.category}
            </span>
          </div>
          <h2
            className="text-xl font-bold text-white/90 mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-300 group-hover:to-pink-300 group-hover:bg-clip-text transition-all"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            {featured.title}
          </h2>
          <p className="text-sm text-white/60 leading-relaxed mb-4">
            {featured.excerpt}
          </p>
          <div className="flex gap-4 text-xs text-white/50 font-medium">
            <span className="flex items-center gap-1">
              <Calendar size={12} className="text-indigo-400" />{" "}
              {featured.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={12} className="text-indigo-400" />{" "}
              {featured.readTime} min read
            </span>
          </div>
        </motion.a>
      )}

      {/* Article Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {filtered
            .filter((a) => !a.featured || activeCategory !== "All Posts")
            .map((article, i) => (
              <motion.a
                key={article.id}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group glass p-6 flex flex-col hover:scale-[1.02]"
              >
                <div className="mb-3">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-bold border ${
                      categoryColors[article.category] ||
                      "bg-white/10 text-white/60 border-white/20"
                    }`}
                  >
                    {article.category}
                  </span>
                </div>
                <h3
                  className="text-base font-semibold text-white/90 mb-2 line-clamp-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-300 group-hover:to-pink-300 group-hover:bg-clip-text transition-all"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {article.title}
                </h3>
                <p className="text-sm text-white/60 leading-relaxed mb-4 flex-1 line-clamp-3">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-white/40 pt-3 border-t border-white/[0.06]">
                  <div className="flex gap-3">
                    <span className="flex items-center gap-1">
                      <Calendar size={11} /> {article.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={11} /> {article.readTime} min
                    </span>
                  </div>
                  <span className="flex items-center gap-1 text-indigo-400 font-semibold group-hover:gap-2 transition-all">
                    Read <ArrowUpRight size={12} />
                  </span>
                </div>
              </motion.a>
            ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function Star() {
  return (
    <svg
      className="inline w-3 h-3 mr-1"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}
