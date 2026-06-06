"use client";

import { useState } from "react";
import Image from "next/image";
import {
  User, Briefcase, GraduationCap, Code2, Trophy, ChevronDown, ChevronRight,
  Terminal, Brain, Database, BarChart3, Target, PieChart, Award, Sparkles,
} from "lucide-react";
import {
  personalInfo, education, skillCategories, proficiency,
  experiences, leadership,
} from "@/data";
import FlairPill from "@/components/FlairPill";
import AwardBadge from "@/components/AwardBadge";

/* ── Skill-group icon map ─────────────────────────────────────────────── */
const groupIcons: Record<string, React.ReactNode> = {
  terminal: <Terminal size={16} />,
  brain: <Brain size={16} />,
  chart: <BarChart3 size={16} />,
  database: <Database size={16} />,
  pieChart: <PieChart size={16} />,
  target: <Target size={16} />,
};

/* ── Competency icon map ──────────────────────────────────────────────── */
const compIcons: Record<string, React.ReactNode> = {
  pipeline: <Code2 size={14} />,
  brain: <Brain size={14} />,
  chart: <BarChart3 size={14} />,
  cloud: <Database size={14} />,
  zap: <Sparkles size={14} />,
  bar: <BarChart3 size={14} />,
  team: <User size={14} />,
  mentor: <GraduationCap size={14} />,
};

/* ── Collapsible skill section ────────────────────────────────────────── */
function SkillSection({ title, icon, color, skills }: {
  title: string; icon: string; color: string; skills: string[];
}) {
  const [open, setOpen] = useState(true);
  return (
    <div className="reddit-card overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm font-semibold text-left hover:bg-card-hover transition-colors"
      >
        <span style={{ color }}>{groupIcons[icon] || <Code2 size={16} />}</span>
        <span className="text-text flex-1">{title}</span>
        {open ? <ChevronDown size={14} className="text-text-muted" /> : <ChevronRight size={14} className="text-text-muted" />}
      </button>
      {open && (
        <div className="px-3 pb-3 flex flex-wrap gap-1.5">
          {skills.map((s) => (
            <FlairPill key={s} label={s} color={color} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Badge color map ──────────────────────────────────────────────────── */
const badgeColors: Record<string, string> = {
  emerald: "var(--success)",
  blue: "var(--link)",
  amber: "#F59E0B",
  purple: "#A855F7",
};

export default function AboutPage() {
  return (
    <>
      {/* ── Profile banner ─────────────────────────────────────────────── */}
      <div className="reddit-card overflow-hidden mb-4">
        <div className="h-24 bg-gradient-to-r from-accent/50 via-accent-2/30 to-accent/20" />
        <div className="-mt-10 px-4 pb-4">
          <div className="relative w-20 h-20 rounded-full border-4 border-card overflow-hidden">
            <Image src="/headshot.png" alt="Saurabh Dusane" fill className="object-cover" sizes="80px" />
            <span className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-success rounded-full border-2 border-card online-dot" />
          </div>
          <div className="mt-2">
            <h1 className="text-xl font-bold text-text">u/saurabh</h1>
            <p className="text-sm text-text-muted">Saurabh Nilesh Dusane &middot; AI/ML Engineer &middot; Data Scientist &middot; Full-Stack AI Builder</p>
            <div className="flex items-center gap-3 mt-2 text-xs text-text-muted">
              <span className="flex items-center gap-1"><Sparkles size={12} className="text-accent" /> 1,500+ community reach</span>
              <span>&middot;</span>
              <span>Graduated May 2026</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Overview (bio) ─────────────────────────────────────────────── */}
      <section className="reddit-card p-4 mb-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-text mb-3">
          <User size={16} className="text-accent" /> Overview
        </div>
        <div className="space-y-3 text-sm text-text-muted leading-relaxed">
          {personalInfo.bio.map((p: string, i: number) => (
            <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
          ))}
        </div>
      </section>

      {/* ── What I Bring ───────────────────────────────────────────────── */}
      <section className="reddit-card p-4 mb-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-text mb-3">
          <Trophy size={16} className="text-accent" /> What I Bring to the Table
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {personalInfo.coreCompetencies.map((comp: { label: string; icon: string }) => (
            <div
              key={comp.label}
              className="flex items-center gap-2 px-2.5 py-2 rounded-lg bg-surface border border-border text-xs text-text-muted font-medium hover:border-accent/40 hover:text-accent transition-colors cursor-default"
            >
              {compIcons[comp.icon] || <Award size={14} />}
              <span className="truncate">{comp.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Trophies ───────────────────────────────────────────────────── */}
      <section className="reddit-card p-4 mb-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-text mb-3">
          <Award size={16} className="text-accent" /> Trophies
        </div>
        <div className="flex flex-wrap gap-2">
          <AwardBadge title="AVEVA EcoTech 3rd" description="3rd place globally — IoT Smart Agriculture System" color="#FFD700" />
          <AwardBadge title="SIH 2nd Place" description="2nd place — Smart India Hackathon, AI Traffic Optimization" color="#C0C0C0" />
          <AwardBadge title="Phoenix AI Club" description="Co-founder & President — Scaled 0 to 1,500+ members in 3 months" color="var(--accent)" />
        </div>
      </section>

      {/* ── Education ──────────────────────────────────────────────────── */}
      <section className="reddit-card p-4 mb-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-text mb-3">
          <GraduationCap size={16} className="text-accent" /> Education
        </div>
        <div className="space-y-4">
          {education.map((edu, i) => (
            <div key={i} className="p-3 rounded-lg bg-surface border border-border">
              <div className="flex items-start justify-between gap-2 flex-wrap">
                <div>
                  <h3 className="text-sm font-semibold text-text">{edu.degree}</h3>
                  {edu.sub && <p className="text-xs text-text-muted">{edu.sub}</p>}
                  <p className="text-xs text-text-muted mt-0.5">{edu.school} &middot; {edu.period}</p>
                </div>
                {edu.gpa && (
                  <span className="px-2 py-0.5 rounded-full bg-success/15 text-success text-xs font-bold shrink-0">
                    GPA {edu.gpa}
                  </span>
                )}
              </div>
              <p className="text-xs text-text-muted mt-2 italic">{edu.focus}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {edu.coursework.map((c) => (
                  <FlairPill key={c} label={c} color={edu.color} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Skills & Technologies ──────────────────────────────────────── */}
      <section className="mb-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-text mb-3 px-1">
          <Code2 size={16} className="text-accent" /> Skills & Technologies
        </div>
        <div className="space-y-2">
          {skillCategories.map((cat) => (
            <SkillSection key={cat.title} title={cat.title} icon={cat.icon} color={cat.color} skills={cat.skills} />
          ))}
        </div>
      </section>

      {/* ── Proficiency Overview ───────────────────────────────────────── */}
      <section className="reddit-card p-4 mb-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-text mb-3">
          <BarChart3 size={16} className="text-accent" /> Proficiency Overview
        </div>
        <div className="space-y-3">
          {proficiency.map((p) => (
            <div key={p.label}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-text-muted">{p.label}</span>
                <span className="font-bold text-text">{p.pct}%</span>
              </div>
              <div className="h-2 rounded-full bg-surface overflow-hidden">
                <div
                  className="h-full rounded-full fill-bar"
                  style={{
                    width: `${p.pct}%`,
                    background: `linear-gradient(90deg, var(--accent), var(--downvote))`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Experience ─────────────────────────────────────────────────── */}
      <section className="mb-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-text mb-3 px-1">
          <Briefcase size={16} className="text-accent" /> Experience
        </div>
        <div className="space-y-3">
          {experiences.map((exp, i) => (
            <article key={i} className="reddit-card p-4">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span
                  className="px-2 py-0.5 rounded text-[10px] font-bold uppercase"
                  style={{
                    backgroundColor: `${badgeColors[exp.badgeColor]}20`,
                    color: badgeColors[exp.badgeColor],
                  }}
                >
                  {exp.badge}
                </span>
                <span className="text-xs text-text-muted">{exp.duration} &middot; {exp.location}</span>
              </div>
              <h3 className="text-sm font-semibold text-text">{exp.title}</h3>
              <p className="text-xs text-text-muted mb-2">{exp.company}</p>
              <ul className="space-y-1.5 text-xs text-text-muted leading-relaxed">
                {exp.bullets.map((b, j) => (
                  <li key={j} className="flex gap-2">
                    <span className="text-accent mt-0.5 shrink-0">&bull;</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* ── Leadership ─────────────────────────────────────────────────── */}
      <section className="mb-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-text mb-3 px-1">
          <Sparkles size={16} className="text-accent" /> Leadership & Activities
        </div>
        <div className="space-y-3">
          {leadership.map((l, i) => (
            <article key={i} className="reddit-card p-4">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span
                  className="px-2 py-0.5 rounded text-[10px] font-bold uppercase"
                  style={{
                    backgroundColor: `${badgeColors[l.badgeColor]}20`,
                    color: badgeColors[l.badgeColor],
                  }}
                >
                  {l.badge}
                </span>
                <span className="text-xs text-text-muted">{l.duration}</span>
              </div>
              <h3 className="text-sm font-semibold text-text">{l.title}</h3>
              <p className="text-xs text-text-muted mb-2">{l.company}</p>
              <ul className="space-y-1.5 text-xs text-text-muted leading-relaxed">
                {l.bullets.map((b, j) => (
                  <li key={j} className="flex gap-2">
                    <span className="text-accent mt-0.5 shrink-0">&bull;</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
