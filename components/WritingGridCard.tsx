import Image from "next/image";
import { Calendar, Clock, Pin, ExternalLink, PenLine, BookOpen, Lightbulb } from "lucide-react";
import type { Article } from "@/data/writing";
import FlairPill from "./FlairPill";

const categoryIcons: Record<string, React.ComponentType<any>> = {
  "Technical Essay": BookOpen,
  "Poetry & Creative": PenLine,
  "Topical Essay": Lightbulb,
};

export default function WritingGridCard({ article }: { article: Article }) {
  const FallbackIcon = categoryIcons[article.category] ?? PenLine;

  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`reddit-card overflow-hidden card-lift flex flex-col group ${article.featured ? "writing-featured" : ""}`}
    >
      {/* Image area — 16:9 */}
      <div className="relative" style={{ aspectRatio: "16/9" }}>
        {article.coverImage ? (
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 400px"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, var(--accent) 0%, #CC3700 100%)" }}
          >
            <FallbackIcon size={36} strokeWidth={1.4} style={{ color: "rgba(255,255,255,0.7)" }} />
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-8" style={{ background: "linear-gradient(transparent, rgba(0,0,0,0.2))" }} />
      </div>

      {/* Card body */}
      <div className="p-3.5 flex flex-col flex-1 min-w-0">
        {/* Category + featured badge */}
        <div className="flex items-center gap-1.5 text-[11px] mb-1.5 flex-wrap" style={{ color: "var(--text-hint)" }}>
          {article.featured && (
            <span className="flex items-center gap-1 font-medium" style={{ color: "var(--accent)" }}>
              <Pin size={10} /> Featured
            </span>
          )}
          <FlairPill label={article.category} />
        </div>

        {/* Title */}
        <h3 className="text-[13px] font-medium leading-snug mb-1 transition-colors group-hover:underline" style={{ color: "var(--text)" }}>
          {article.title}
        </h3>

        {/* Excerpt — clamped */}
        <p
          className="text-[11px] leading-[1.5] mb-2.5 flex-1"
          style={{
            color: "var(--text-muted)",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {article.excerpt}
        </p>

        {/* Date + read time */}
        <div className="flex items-center gap-2.5 text-[10px] mb-2" style={{ color: "var(--text-hint)" }}>
          <span className="flex items-center gap-1"><Calendar size={10} /> {article.date}</span>
          <span className="flex items-center gap-1"><Clock size={10} /> {article.readTime} min</span>
        </div>

        {/* CTA */}
        <span className="inline-flex items-center gap-1 text-[11px] font-medium mt-auto" style={{ color: "var(--accent)" }}>
          Read on Medium <ExternalLink size={10} />
        </span>
      </div>
    </a>
  );
}
