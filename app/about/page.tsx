"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  User, Briefcase, GraduationCap, Code2, Trophy, ChevronDown,
  Terminal, Brain, Database, BarChart3, Target, PieChart, Award, Sparkles, ExternalLink,
} from "lucide-react";
import {
  personalInfo, education, skillCategories, proficiency,
  experiences, leadership,
} from "@/data";
import FlairPill from "@/components/FlairPill";

const groupIcons: Record<string, React.ReactNode> = {
  terminal: <Terminal size={14} />,
  brain: <Brain size={14} />,
  chart: <BarChart3 size={14} />,
  database: <Database size={14} />,
  pieChart: <PieChart size={14} />,
  target: <Target size={14} />,
};

const compIcons: Record<string, React.ReactNode> = {
  pipeline: <Code2 size={13} />,
  brain: <Brain size={13} />,
  chart: <BarChart3 size={13} />,
  cloud: <Database size={13} />,
  zap: <Sparkles size={13} />,
  bar: <BarChart3 size={13} />,
  team: <User size={13} />,
  mentor: <GraduationCap size={13} />,
};

const badgeColors: Record<string, string> = {
  emerald: "var(--success)",
  blue: "var(--link)",
  amber: "#D97706",
  purple: "#A855F7",
};

/* ─── Collapsible coursework ─────────────────────────────────────────────── */
function CourseworkToggle({ courses }: { courses: string[] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [h, setH] = useState(0);

  useEffect(() => {
    if (ref.current) setH(open ? ref.current.scrollHeight : 0);
  }, [open]);

  return (
    <div className="mt-2">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="flex items-center gap-1.5 text-[11px] font-medium transition-colors"
        style={{ color: "var(--text-hint)" }}
      >
        <ChevronDown
          size={12}
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}
        />
        Courses ({courses.length})
      </button>
      <div
        ref={ref}
        className="overflow-hidden nav-sub-expand"
        style={{ maxHeight: open ? h || 300 : 0 }}
      >
        <div className="flex flex-wrap gap-1 pt-2">
          {courses.map((c) => (
            <FlairPill key={c} label={c} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Main Page ──────────────────────────────────────────────────────────── */
export default function AboutPage() {
  return (
    <div className="about-grid">
      {/* ════════ LEFT COLUMN ════════ */}
      <div className="about-main">
        {/* ── Profile header + Overview ─────────────────────────────────── */}
        <section id="overview" className="reddit-card overflow-hidden">
          <div style={{ height: 80, background: "linear-gradient(135deg, var(--accent) 0%, #cc3700 100%)" }} />
          <div style={{ marginTop: -28, padding: "0 20px 20px" }}>
            <div className="flex items-end gap-3">
              <div className="relative shrink-0" style={{ width: 56, height: 56 }}>
                <div className="rounded-full overflow-hidden" style={{ width: 56, height: 56, border: "3px solid var(--card)" }}>
                  <Image src="/headshot.png" alt="Saurabh Dusane" width={56} height={56} className="object-cover" />
                </div>
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full online-dot" style={{ background: "var(--success)", border: "2px solid var(--card)" }} />
              </div>
              <div className="min-w-0 pb-0.5">
                <h1 className="text-[16px] font-medium" style={{ color: "var(--text)" }}>{personalInfo.name}</h1>
                <p className="text-[11px]" style={{ color: "var(--text-hint)" }}>u/saurabh &middot; AI/ML Engineer</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
              <a
                href={personalInfo.resumePath}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-white text-[12px] font-medium"
                style={{ background: "var(--accent)" }}
              >
                Resume <ExternalLink size={11} />
              </a>
              <Link
                href="/contact"
                className="flex items-center px-3.5 py-1.5 rounded-full text-[12px] font-medium"
                style={{ border: "1px solid var(--border)", color: "var(--text)" }}
              >
                Let&apos;s connect
              </Link>
            </div>

            <div className="space-y-2.5 text-[12px] leading-[1.6] mt-4" style={{ color: "var(--text-muted)" }}>
              {personalInfo.bio.map((p: string, i: number) => (
                <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Education ──────────────────────────────────────────────────── */}
        <section id="education">
          <div className="flex items-center gap-2 text-[13px] font-medium mb-3 px-1" style={{ color: "var(--text)" }}>
            <GraduationCap size={15} style={{ color: "var(--accent)" }} /> Education
          </div>
          <div className="space-y-3">
            {education.map((edu, i) => (
              <article
                key={i}
                className="reddit-card p-4"
                style={{ borderLeft: `3px solid ${edu.color}` }}
              >
                <div className="flex items-start justify-between gap-2 flex-wrap">
                  <div>
                    <h3 className="text-[13px] font-medium" style={{ color: "var(--text)" }}>{edu.degree}</h3>
                    {edu.sub && <p className="text-[11px]" style={{ color: "var(--text-hint)" }}>{edu.sub}</p>}
                    <p className="text-[11px] mt-0.5" style={{ color: "var(--text-hint)" }}>{edu.school} &middot; {edu.period}</p>
                  </div>
                  {edu.gpa && (
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-medium shrink-0" style={{ background: "rgba(70,209,96,0.1)", color: "var(--success)" }}>
                      GPA {edu.gpa}
                    </span>
                  )}
                </div>
                <p className="text-[11px] mt-2 italic" style={{ color: "var(--text-hint)" }}>{edu.focus}</p>
                <CourseworkToggle courses={edu.coursework} />
              </article>
            ))}
          </div>
        </section>

        {/* ── Experience ─────────────────────────────────────────────────── */}
        <section id="experience">
          <div className="flex items-center gap-2 text-[13px] font-medium mb-3 px-1" style={{ color: "var(--text)" }}>
            <Briefcase size={15} style={{ color: "var(--accent)" }} /> Experience
          </div>
          <div className="space-y-2">
            {experiences.map((exp, i) => (
              <article key={i} className="reddit-card p-4">
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span
                    className="px-1.5 py-0.5 rounded text-[10px] font-medium uppercase"
                    style={{ backgroundColor: `${badgeColors[exp.badgeColor]}15`, color: badgeColors[exp.badgeColor] }}
                  >
                    {exp.badge}
                  </span>
                  <span className="text-[11px]" style={{ color: "var(--text-hint)" }}>{exp.duration} &middot; {exp.location}</span>
                </div>
                <h3 className="text-[13px] font-medium" style={{ color: "var(--text)" }}>{exp.title}</h3>
                <p className="text-[11px] mb-2" style={{ color: "var(--text-hint)" }}>{exp.company}</p>
                <ul className="space-y-1.5 text-[11px] leading-[1.55]" style={{ color: "var(--text-muted)" }}>
                  {exp.bullets.map((b, j) => (
                    <li key={j} className="flex gap-2">
                      <span className="mt-0.5 shrink-0" style={{ color: "var(--accent)" }}>&bull;</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          {/* Leadership sub-section */}
          <div className="flex items-center gap-2 text-[12px] font-medium mt-4 mb-2.5 px-1" style={{ color: "var(--text)" }}>
            <Sparkles size={14} style={{ color: "var(--accent)" }} /> Leadership & activities
          </div>
          <div className="space-y-2">
            {leadership.map((l, i) => (
              <article key={i} className="reddit-card p-4">
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span
                    className="px-1.5 py-0.5 rounded text-[10px] font-medium uppercase"
                    style={{ backgroundColor: `${badgeColors[l.badgeColor]}15`, color: badgeColors[l.badgeColor] }}
                  >
                    {l.badge}
                  </span>
                  <span className="text-[11px]" style={{ color: "var(--text-hint)" }}>{l.duration}</span>
                </div>
                <h3 className="text-[13px] font-medium" style={{ color: "var(--text)" }}>{l.title}</h3>
                <p className="text-[11px] mb-2" style={{ color: "var(--text-hint)" }}>{l.company}</p>
                <ul className="space-y-1.5 text-[11px] leading-[1.55]" style={{ color: "var(--text-muted)" }}>
                  {l.bullets.map((b, j) => (
                    <li key={j} className="flex gap-2">
                      <span className="mt-0.5 shrink-0" style={{ color: "var(--accent)" }}>&bull;</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      </div>

      {/* ════════ RIGHT COLUMN (sticky sidebar) ════════ */}
      <div className="about-side">
        {/* ── Why hire me ────────────────────────────────────────────────── */}
        <section id="why-hire-me" className="reddit-card p-5" style={{ borderLeft: "3px solid var(--accent)" }}>
          <div className="flex items-center gap-2 text-[13px] font-medium mb-1" style={{ color: "var(--text)" }}>
            <Trophy size={15} style={{ color: "var(--accent)" }} /> Why hire me
          </div>
          <p className="text-[11px] mb-3" style={{ color: "var(--text-hint)" }}>
            Equal parts researcher and builder — deep learning, scalable infrastructure, and real business impact.
          </p>
          <div className="grid grid-cols-2 gap-1.5">
            {personalInfo.coreCompetencies.map((comp: { label: string; icon: string }) => (
              <div
                key={comp.label}
                className="flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-[11px] font-medium cursor-default"
                style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text-muted)" }}
                title={comp.label}
              >
                {compIcons[comp.icon] || <Award size={13} />}
                <span className="truncate">{comp.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Skills ─────────────────────────────────────────────────────── */}
        <section id="skills">
          <div className="flex items-center gap-2 text-[13px] font-medium mb-3 px-1" style={{ color: "var(--text)" }}>
            <Code2 size={15} style={{ color: "var(--accent)" }} /> Skills & technologies
          </div>
          <div className="space-y-3">
            {skillCategories.map((cat) => (
              <div key={cat.title} className="reddit-card p-3.5" style={{ borderLeft: `3px solid ${cat.color}` }}>
                <div className="flex items-center gap-2 text-[12px] font-medium mb-2" style={{ color: "var(--text)" }}>
                  <span style={{ color: "var(--text-hint)" }}>{groupIcons[cat.icon] || <Code2 size={14} />}</span>
                  {cat.title}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {cat.skills.map((s) => (
                    <FlairPill key={s} label={s} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Proficiency bars */}
          <div className="reddit-card p-4 mt-3">
            <div className="flex items-center gap-2 text-[12px] font-medium mb-3" style={{ color: "var(--text)" }}>
              <BarChart3 size={14} style={{ color: "var(--accent)" }} /> Proficiency overview
            </div>
            <div className="space-y-2.5">
              {proficiency.map((p) => (
                <div key={p.label}>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span style={{ color: "var(--text-muted)" }}>{p.label}</span>
                    <span className="font-medium" style={{ color: "var(--text)" }}>{p.pct}%</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--surface)" }}>
                    <div
                      className="h-full rounded-full fill-bar"
                      style={{ width: `${p.pct}%`, background: "linear-gradient(90deg, var(--accent), var(--downvote))" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
