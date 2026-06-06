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

function SkillSection({ title, icon, skills }: {
  title: string; icon: string; skills: string[];
}) {
  const [open, setOpen] = useState(true);
  return (
    <div className="reddit-card overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-[12px] font-medium text-left transition-colors"
        style={{ color: "var(--text)" }}
      >
        <span style={{ color: "var(--text-hint)" }}>{groupIcons[icon] || <Code2 size={14} />}</span>
        <span className="flex-1">{title}</span>
        {open ? <ChevronDown size={13} style={{ color: "var(--text-hint)" }} /> : <ChevronRight size={13} style={{ color: "var(--text-hint)" }} />}
      </button>
      {open && (
        <div className="px-3.5 pb-3 flex flex-wrap gap-1.5">
          {skills.map((s) => (
            <FlairPill key={s} label={s} />
          ))}
        </div>
      )}
    </div>
  );
}

const badgeColors: Record<string, string> = {
  emerald: "var(--success)",
  blue: "var(--link)",
  amber: "#D97706",
  purple: "#A855F7",
};

export default function AboutPage() {
  return (
    <>
      {/* Profile banner */}
      <div className="reddit-card overflow-hidden mb-3">
        <div style={{ height: 80, background: "linear-gradient(135deg, var(--accent) 0%, #cc3700 100%)" }} />
        <div style={{ marginTop: -28, padding: "0 16px 16px" }}>
          <div className="relative" style={{ width: 56, height: 56 }}>
            <div className="rounded-full overflow-hidden" style={{ width: 56, height: 56, border: "3px solid var(--card)" }}>
              <Image src="/headshot.png" alt="Saurabh Dusane" width={56} height={56} className="object-cover" />
            </div>
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full online-dot" style={{ background: "var(--success)", border: "2px solid var(--card)" }} />
          </div>
          <h1 className="text-[16px] font-medium mt-2" style={{ color: "var(--text)" }}>u/saurabh</h1>
          <p className="text-[11px]" style={{ color: "var(--text-hint)" }}>Saurabh Nilesh Dusane &middot; AI/ML Engineer &middot; Data Scientist &middot; Full-Stack AI Builder</p>
          <div className="flex items-center gap-3 mt-2 text-[11px]" style={{ color: "var(--text-hint)" }}>
            <span className="flex items-center gap-1"><Sparkles size={11} style={{ color: "var(--accent)" }} /> 1,500+ community reach</span>
            <span>&middot;</span>
            <span>Graduated May 2026</span>
          </div>
        </div>
      </div>

      {/* Overview */}
      <section className="reddit-card p-4 mb-3">
        <div className="flex items-center gap-2 text-[12px] font-medium mb-3" style={{ color: "var(--text)" }}>
          <User size={14} style={{ color: "var(--accent)" }} /> Overview
        </div>
        <div className="space-y-2.5 text-[12px] leading-[1.55]" style={{ color: "var(--text-muted)" }}>
          {personalInfo.bio.map((p: string, i: number) => (
            <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
          ))}
        </div>
      </section>

      {/* What I Bring */}
      <section className="reddit-card p-4 mb-3">
        <div className="flex items-center gap-2 text-[12px] font-medium mb-3" style={{ color: "var(--text)" }}>
          <Trophy size={14} style={{ color: "var(--accent)" }} /> What I bring to the table
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
          {personalInfo.coreCompetencies.map((comp: { label: string; icon: string }) => (
            <div
              key={comp.label}
              className="flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-[11px] font-medium transition-colors cursor-default"
              style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text-muted)" }}
            >
              {compIcons[comp.icon] || <Award size={13} />}
              <span className="truncate">{comp.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Trophies */}
      <section className="reddit-card p-4 mb-3">
        <div className="flex items-center gap-2 text-[12px] font-medium mb-3" style={{ color: "var(--text)" }}>
          <Award size={14} style={{ color: "var(--accent)" }} /> Trophies
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2.5 text-[12px]">
            <Trophy size={14} style={{ color: "#B8860B" }} />
            <div>
              <span style={{ color: "var(--text)" }}>AVEVA EcoTech</span>
              <span style={{ color: "var(--text-hint)" }}> &mdash; 3rd place globally, IoT Smart Agriculture</span>
            </div>
          </div>
          <div className="flex items-center gap-2.5 text-[12px]">
            <Award size={14} style={{ color: "#808080" }} />
            <div>
              <span style={{ color: "var(--text)" }}>Smart India Hackathon</span>
              <span style={{ color: "var(--text-hint)" }}> &mdash; 2nd place, AI Traffic Optimization</span>
            </div>
          </div>
          <div className="flex items-center gap-2.5 text-[12px]">
            <Trophy size={14} style={{ color: "var(--accent)" }} />
            <div>
              <span style={{ color: "var(--text)" }}>Phoenix AI Club</span>
              <span style={{ color: "var(--text-hint)" }}> &mdash; Co-founder, scaled to 1,500+ members</span>
            </div>
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="reddit-card p-4 mb-3">
        <div className="flex items-center gap-2 text-[12px] font-medium mb-3" style={{ color: "var(--text)" }}>
          <GraduationCap size={14} style={{ color: "var(--accent)" }} /> Education
        </div>
        <div className="space-y-3">
          {education.map((edu, i) => (
            <div key={i} className="p-3 rounded-lg" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
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
              <div className="flex flex-wrap gap-1 mt-2">
                {edu.coursework.map((c) => (
                  <FlairPill key={c} label={c} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="mb-3">
        <div className="flex items-center gap-2 text-[12px] font-medium mb-2.5 px-1" style={{ color: "var(--text)" }}>
          <Code2 size={14} style={{ color: "var(--accent)" }} /> Skills & technologies
        </div>
        <div className="space-y-1.5">
          {skillCategories.map((cat) => (
            <SkillSection key={cat.title} title={cat.title} icon={cat.icon} skills={cat.skills} />
          ))}
        </div>
      </section>

      {/* Proficiency */}
      <section className="reddit-card p-4 mb-3">
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
      </section>

      {/* Experience */}
      <section className="mb-3">
        <div className="flex items-center gap-2 text-[12px] font-medium mb-2.5 px-1" style={{ color: "var(--text)" }}>
          <Briefcase size={14} style={{ color: "var(--accent)" }} /> Experience
        </div>
        <div className="space-y-2">
          {experiences.map((exp, i) => (
            <article key={i} className="reddit-card p-3.5">
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
      </section>

      {/* Leadership */}
      <section className="mb-3">
        <div className="flex items-center gap-2 text-[12px] font-medium mb-2.5 px-1" style={{ color: "var(--text)" }}>
          <Sparkles size={14} style={{ color: "var(--accent)" }} /> Leadership & activities
        </div>
        <div className="space-y-2">
          {leadership.map((l, i) => (
            <article key={i} className="reddit-card p-3.5">
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
    </>
  );
}
