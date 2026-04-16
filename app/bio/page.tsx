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
} from "lucide-react";
import {
  personalInfo,
  skillCategories,
  proficiency,
  experiences,
  leadership,
  education,
} from "@/lib/data";
import SectionHeading from "@/components/SectionHeading";

const skillIcons: Record<string, React.ReactNode> = {
  terminal: <Terminal size={16} />,
  brain: <Brain size={16} />,
  chart: <BarChart3 size={16} />,
  database: <Database size={16} />,
  pieChart: <PieChart size={16} />,
  target: <Target size={16} />,
};

const badgeColors: Record<string, string> = {
  emerald: "bg-emerald-500/15 text-emerald-300 border-emerald-500/20",
  blue: "bg-blue-500/15 text-blue-300 border-blue-500/20",
  amber: "bg-amber-500/15 text-amber-300 border-amber-500/20",
  purple: "bg-purple-500/15 text-purple-300 border-purple-500/20",
};

const sectionAnim = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function BioPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 pb-20">
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <h1
          className="text-2xl font-bold text-white/90 inline-flex items-center gap-3"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          <User size={24} className="text-indigo-400" /> About Me
        </h1>
      </motion.div>

      {/* About section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass p-8 mb-8"
      >
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left: avatar + resume */}
          <div className="flex flex-col items-center gap-4 md:min-w-[180px]">
            <div className="w-36 h-36 rounded-2xl border-2 border-purple-500/30 p-1 shadow-lg shadow-purple-500/10 overflow-hidden">
              <Image
                src="/headshot.png"
                alt="Saurabh Dusane"
                width={144}
                height={144}
                className="rounded-xl object-cover"
              />
            </div>
            <a
              href={personalInfo.resumePath}
              download
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-semibold shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:-translate-y-1"
            >
              <Award size={16} /> Download Resume
            </a>
          </div>

          {/* Right: bio text */}
          <div className="flex-1">
            <h2
              className="text-xl font-bold gradient-text mb-4"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Hello, I&apos;m Saurabh
            </h2>
            {personalInfo.bio.map((p, i) => (
              <p
                key={i}
                className="text-white/80 text-sm leading-relaxed mb-4"
                dangerouslySetInnerHTML={{ __html: p.replace(/<strong>/g, '<strong class="text-purple-300">') }}
              />
            ))}

            {/* Core competencies */}
            <div className="mt-4 p-4 rounded-xl bg-indigo-500/8 border border-indigo-500/15">
              <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm mb-2">
                <Zap size={16} /> Core Competencies
              </div>
              <p className="text-white/70 text-sm leading-relaxed">
                {personalInfo.coreCompetencies}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Education */}
      <motion.div
        variants={sectionAnim}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="glass p-8 mb-8"
      >
        <SectionHeading
          icon={<GraduationCap size={20} />}
          title="Education"
          iconColor="#6366f1"
        />
        <div className="space-y-6">
          {education.map((edu, i) => (
            <div
              key={i}
              className="pl-4 border-l-2 transition-colors"
              style={{ borderColor: edu.color }}
            >
              <h3
                className="text-base font-semibold text-white/90"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {edu.degree}
              </h3>
              {edu.sub && (
                <p className="text-sm text-white/60">{edu.sub}</p>
              )}
              <div className="flex items-center gap-2 text-sm text-white/70 mt-1 mb-2">
                <Building size={14} className="text-indigo-400" />
                {edu.school} | {edu.period}
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                {edu.gpa && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold">
                    <Star size={12} /> GPA: {edu.gpa}
                  </span>
                )}
                {edu.expected && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-semibold">
                    <Calendar size={12} /> Expected {edu.expected}
                  </span>
                )}
              </div>
              <p className="text-sm text-white/60 italic mb-3">
                {edu.focus}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {edu.coursework.map((c) => (
                  <span
                    key={c}
                    className="px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-white/60 text-xs font-medium"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Skills */}
      <motion.div
        variants={sectionAnim}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="glass p-8 mb-8"
      >
        <SectionHeading
          icon={<Code size={20} />}
          title="Skills & Technologies"
          iconColor="#6366f1"
        />
        <div className="space-y-5">
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
                    className="px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 hover:-translate-y-0.5 hover:scale-105 cursor-default"
                    style={{
                      color: cat.color,
                      backgroundColor: `${cat.color}15`,
                      borderColor: `${cat.color}30`,
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {/* Proficiency bars */}
          <div className="pt-4 border-t border-white/[0.06]">
            <div className="flex items-center gap-2 text-amber-400 text-sm font-semibold mb-4">
              <BarChart3 size={16} /> Proficiency Overview
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

      {/* Experience */}
      <motion.div
        variants={sectionAnim}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="glass p-8 mb-8"
      >
        <SectionHeading
          icon={<Briefcase size={20} />}
          title="Professional Experience"
          iconColor="#10b981"
        />
        <div className="space-y-6">
          {experiences.map((exp, i) => (
            <div key={i} className="relative pl-4 border-l-2 border-emerald-500/30">
              <span
                className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border mb-2 ${badgeColors[exp.badgeColor]}`}
              >
                {exp.badge}
              </span>
              <h3
                className="text-base font-semibold text-white/90 mb-1"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {exp.title}
              </h3>
              <div className="flex items-center gap-2 text-sm text-white/70 mb-1">
                <Building size={14} className="text-emerald-400" />
                {exp.company}
              </div>
              <div className="flex items-center gap-4 text-xs text-white/50 mb-3">
                <span className="flex items-center gap-1">
                  <Calendar size={12} /> {exp.duration}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin size={12} /> {exp.location}
                </span>
              </div>
              <ul className="space-y-2">
                {exp.bullets.map((b, j) => (
                  <li
                    key={j}
                    className="text-sm text-white/70 leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-emerald-500/40"
                    dangerouslySetInnerHTML={{ __html: b }}
                  />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Leadership */}
      <motion.div
        variants={sectionAnim}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="glass p-8"
      >
        <SectionHeading
          icon={<Users size={20} />}
          title="Leadership & Activities"
          iconColor="#f59e0b"
        />
        <div className="space-y-6">
          {leadership.map((item, i) => (
            <div key={i} className="pl-4 border-l-2 border-amber-500/30">
              <span
                className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border mb-2 ${badgeColors[item.badgeColor]}`}
              >
                {item.badge}
              </span>
              <h3
                className="text-base font-semibold text-white/90 mb-1"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {item.title}
              </h3>
              <div className="flex items-center gap-2 text-sm text-white/70 mb-1">
                <Building size={14} className="text-amber-400" />
                {item.company}
              </div>
              <div className="text-xs text-white/50 mb-3 flex items-center gap-1">
                <Calendar size={12} /> {item.duration}
              </div>
              <ul className="space-y-2">
                {item.bullets.map((b, j) => (
                  <li
                    key={j}
                    className="text-sm text-white/70 leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-amber-500/40"
                    dangerouslySetInnerHTML={{ __html: b }}
                  />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
