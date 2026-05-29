/**
 * Bio page — about, education, skills, experience, and leadership.
 * Per-page SEO metadata exported below.
 */
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  User,
  Zap,
  GraduationCap,
  Code,
  Brain,
  BarChart3,
  Database,
  PieChart,
  Target,
  Terminal,
  Briefcase,
  Users,
  Building,
  Calendar,
  MapPin,
  Star,
  Award,
  Cloud,
  Layers,
  Heart,
  Rocket,
} from "lucide-react";
import {
  personalInfo,
  skillCategories,
  proficiency,
  experiences,
  leadership,
  education,
} from "@/data";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";
import PageTransition from "@/components/PageTransition";

/* ── Icon maps ─────────────────────────────────────────────────────────────── */
const skillIcons: Record<string, React.ReactNode> = {
  terminal: <Terminal size={16} />,
  brain: <Brain size={16} />,
  chart: <BarChart3 size={16} />,
  database: <Database size={16} />,
  pieChart: <PieChart size={16} />,
  target: <Target size={16} />,
};

const competencyIcons: Record<string, React.ReactNode> = {
  pipeline: <Layers size={14} className="text-violet-400 shrink-0" />,
  brain: <Brain size={14} className="text-fuchsia-400 shrink-0" />,
  chart: <BarChart3 size={14} className="text-emerald-400 shrink-0" />,
  cloud: <Cloud size={14} className="text-sky-400 shrink-0" />,
  zap: <Zap size={14} className="text-amber-400 shrink-0" />,
  bar: <PieChart size={14} className="text-pink-400 shrink-0" />,
  team: <Users size={14} className="text-teal-400 shrink-0" />,
  mentor: <Star size={14} className="text-yellow-400 shrink-0" />,
};

const badgeColors: Record<string, string> = {
  emerald: "bg-emerald-500/15 text-emerald-300 border-emerald-500/20",
  blue: "bg-blue-500/15 text-blue-300 border-blue-500/20",
  amber: "bg-amber-500/15 text-amber-300 border-amber-500/20",
  purple: "bg-violet-500/15 text-violet-300 border-violet-500/20",
};

/* Shared reveal animation */
const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

/* ══════════════════════════════════════════════════════════════════════════════ */

export default function BioPage() {
  return (
    <PageTransition className="max-w-4xl mx-auto px-6 pb-12">
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-5"
      >
        <h1
          className="text-2xl font-bold text-white/90 inline-flex items-center gap-3"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          <User size={24} className="text-violet-400" aria-hidden="true" /> About Me
        </h1>
      </motion.div>

      {/* ── About section ─────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass p-6 md:p-8 mb-6"
      >
        {/* Top: Avatar + status card + resume */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-6">
          <div className="relative">
            <div className="w-28 h-28 rounded-2xl border-2 border-violet-500/30 p-1 shadow-lg shadow-violet-500/10 overflow-hidden avatar-glow">
              <Image
                src="/headshot.png"
                alt="Saurabh Dusane — headshot"
                width={112}
                height={112}
                className="rounded-xl object-cover"
              />
            </div>
            {/* Online indicator */}
            <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-[3px] border-[#0a0f1e] rounded-full" aria-label="Available for work" />
          </div>

          <div className="flex-1 text-center sm:text-left">
            <h2
              className="text-2xl font-bold gradient-text mb-1"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Hey, I&apos;m Saurabh <span className="inline-block animate-[wave_2s_ease-in-out_infinite]">👋</span>
            </h2>
            <p className="text-white/50 text-sm mb-3" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              AI/ML Engineer · Building intelligent systems that ship
            </p>
            <div className="flex flex-wrap justify-center sm:justify-start gap-2">
              <Button href={personalInfo.resumePath} external>
                <Award size={16} /> Resume
              </Button>
              <Button href="/contact" variant="ghost">
                <Heart size={16} /> Let&apos;s Connect
              </Button>
            </div>
          </div>
        </div>

        {/* Bio paragraphs — conversational tone */}
        <div className="space-y-3 mb-6">
          {personalInfo.bio.map((p, i) => (
            <p
              key={i}
              className="text-white/75 text-sm leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: p
                  .replace(/<strong>/g, '<strong class="text-violet-300 font-semibold">')
                  .replace(/<em>/g, '<em class="text-fuchsia-300 not-italic font-medium">'),
              }}
            />
          ))}
        </div>

        {/* Core competencies — visual grid */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-violet-500/[0.06] to-fuchsia-500/[0.04] border border-violet-500/15">
          <div className="flex items-center gap-2 text-violet-400 font-semibold text-sm mb-3">
            <Rocket size={16} aria-hidden="true" /> What I Bring to the Table
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {personalInfo.coreCompetencies.map((comp) => (
              <div
                key={comp.label}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.06] text-xs text-white/70 font-medium hover:bg-violet-500/10 hover:border-violet-500/20 hover:text-violet-300 transition-all duration-200 cursor-default"
              >
                {competencyIcons[comp.icon]}
                <span className="truncate">{comp.label}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── Education ─────────────────────────────────────────────────── */}
      <motion.div
        variants={reveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="glass p-6 mb-6"
      >
        <SectionHeading icon={<GraduationCap size={20} />} title="Education" iconColor="#8b5cf6" />
        <div className="space-y-4">
          {education.map((edu, i) => (
            <div key={i} className="pl-4 border-l-2" style={{ borderColor: edu.color }}>
              <h3 className="text-base font-semibold text-white/90" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                {edu.degree}
              </h3>
              {edu.sub && <p className="text-sm text-white/60">{edu.sub}</p>}
              <div className="flex items-center gap-2 text-sm text-white/70 mt-1 mb-2">
                <Building size={14} className="text-violet-400" aria-hidden="true" />
                {edu.school} | {edu.period}
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                {edu.gpa && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold">
                    <Star size={12} aria-hidden="true" /> GPA: {edu.gpa}
                  </span>
                )}
                {edu.expected && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-semibold">
                    <Calendar size={12} aria-hidden="true" /> Expected {edu.expected}
                  </span>
                )}
              </div>
              <p className="text-sm text-white/60 italic mb-3">{edu.focus}</p>
              <div className="flex flex-wrap gap-1.5">
                {edu.coursework.map((c) => (
                  <span key={c} className="px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-white/60 text-xs font-medium">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Skills ────────────────────────────────────────────────────── */}
      <motion.div
        variants={reveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="glass p-6 mb-6"
      >
        <SectionHeading icon={<Code size={20} />} title="Skills & Technologies" iconColor="#8b5cf6" />
        <div className="space-y-4">
          {skillCategories.map((cat) => (
            <div key={cat.title} className="pl-4 border-l-2" style={{ borderColor: cat.color }}>
              <div className="flex items-center gap-2 text-sm font-semibold mb-2" style={{ color: cat.color }}>
                {skillIcons[cat.icon]}
                {cat.title}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {cat.skills.map((s) => (
                  <span
                    key={s}
                    className="px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 hover:-translate-y-0.5 cursor-default"
                    style={{ color: cat.color, backgroundColor: `${cat.color}15`, borderColor: `${cat.color}30` }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {/* Proficiency bars */}
          <div className="pt-3 border-t border-white/[0.06]">
            <div className="flex items-center gap-2 text-amber-400 text-sm font-semibold mb-3">
              <BarChart3 size={16} aria-hidden="true" /> Proficiency Overview
            </div>
            <div className="space-y-3">
              {proficiency.map((p) => (
                <div key={p.label}>
                  <div className="flex justify-between text-xs text-white/70 mb-1 font-medium">
                    <span>{p.label}</span>
                    <span>{p.pct}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                    <div
                      className={`skill-bar-fill bg-gradient-to-r ${p.gradient}`}
                      style={{ ["--skill-pct" as string]: `${p.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Experience ────────────────────────────────────────────────── */}
      <motion.div
        variants={reveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="glass p-6 mb-6"
      >
        <SectionHeading icon={<Briefcase size={20} />} title="Professional Experience" iconColor="#10b981" />
        <div className="divide-y divide-white/[0.06]">
          {experiences.map((exp, i) => (
            <article key={i} className="relative pl-4 border-l-2 border-emerald-500/30 py-5 first:pt-0 last:pb-0">
              <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border mb-2 ${badgeColors[exp.badgeColor]}`}>
                {exp.badge}
              </span>
              <h3 className="text-base font-semibold text-white/90 mb-1" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                {exp.title}
              </h3>
              <div className="flex items-center gap-2 text-sm text-white/70 mb-1">
                <Building size={14} className="text-emerald-400" aria-hidden="true" />
                {exp.company}
              </div>
              <div className="flex items-center gap-4 text-xs text-white/50 mb-3">
                <span className="flex items-center gap-1"><Calendar size={12} aria-hidden="true" /> {exp.duration}</span>
                <span className="flex items-center gap-1"><MapPin size={12} aria-hidden="true" /> {exp.location}</span>
              </div>
              <ul className="space-y-2">
                {exp.bullets.map((b, j) => (
                  <li key={j} className="text-sm text-white/70 leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-emerald-500/40">
                    {b}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </motion.div>

      {/* ── Leadership ────────────────────────────────────────────────── */}
      <motion.div
        variants={reveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="glass p-6"
      >
        <SectionHeading icon={<Users size={20} />} title="Leadership & Activities" iconColor="#f59e0b" />
        <div className="divide-y divide-white/[0.06]">
          {leadership.map((item, i) => (
            <article key={i} className="pl-4 border-l-2 border-amber-500/30 py-5 first:pt-0 last:pb-0">
              <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border mb-2 ${badgeColors[item.badgeColor]}`}>
                {item.badge}
              </span>
              <h3 className="text-base font-semibold text-white/90 mb-1" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                {item.title}
              </h3>
              <div className="flex items-center gap-2 text-sm text-white/70 mb-1">
                <Building size={14} className="text-amber-400" aria-hidden="true" />
                {item.company}
              </div>
              <div className="text-xs text-white/50 mb-3 flex items-center gap-1">
                <Calendar size={12} aria-hidden="true" /> {item.duration}
              </div>
              <ul className="space-y-2">
                {item.bullets.map((b, j) => (
                  <li key={j} className="text-sm text-white/70 leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-amber-500/40">
                    {b}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </motion.div>
    </PageTransition>
  );
}
