/**
 * Projects page — grid of project cards with tech tags and links.
 */
"use client";

import { motion } from "framer-motion";
import {
  FolderGit2,
  Bot,
  Droplets,
  Leaf,
  TrendingUp,
  Shield,
  TrafficCone,
  ExternalLink,
  Layers,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { projects, personalInfo } from "@/data";
import Button from "@/components/Button";
import PageTransition from "@/components/PageTransition";

/* ── Icon map keyed by project.icon ────────────────────────────────────────── */
const iconMap: Record<string, React.ReactNode> = {
  bot: <Bot size={32} className="text-white/80" />,
  droplets: <Droplets size={32} className="text-white/80" />,
  leaf: <Leaf size={32} className="text-white/80" />,
  trendingUp: <TrendingUp size={32} className="text-white/80" />,
  shield: <Shield size={32} className="text-white/80" />,
  traffic: <TrafficCone size={32} className="text-white/80" />,
};

const gradients = [
  "from-violet-500/30 to-fuchsia-500/20",
  "from-fuchsia-500/30 to-pink-500/20",
  "from-teal-500/30 to-blue-500/20",
  "from-amber-500/30 to-red-500/20",
  "from-blue-500/30 to-cyan-500/20",
  "from-pink-500/30 to-orange-500/20",
];

/* ══════════════════════════════════════════════════════════════════════════════ */

export default function ProjectsPage() {
  return (
    <PageTransition className="max-w-5xl mx-auto px-6 pb-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <h1
          className="text-2xl font-bold text-white/90 inline-flex items-center gap-3 mb-1"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          <FolderGit2 size={24} className="text-violet-400" aria-hidden="true" /> Projects &amp; Impact
        </h1>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-semibold mt-1">
          <Layers size={14} aria-hidden="true" /> {projects.length} Featured Projects — ML, NLP, Computer Vision, IoT
        </div>
      </motion.div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {projects.map((project, i) => (
          <motion.article
            key={project.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.45 }}
            className="group glass glass-accent relative overflow-hidden flex flex-col hover:shadow-lg hover:shadow-violet-500/[0.06]"
          >
            {/* Icon header */}
            <div
              className={`h-32 flex items-center justify-center bg-gradient-to-br ${gradients[i % gradients.length]}`}
              aria-hidden="true"
            >
              <div className="transition-transform duration-300 group-hover:scale-110 drop-shadow-lg">
                {iconMap[project.icon] || <Bot size={32} className="text-white/80" />}
              </div>
            </div>

            {/* Content */}
            <div className="p-5 flex-1 flex flex-col">
              <h3
                className="text-base font-semibold text-white/90 mb-2 group-hover:text-violet-300 transition-colors duration-200"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {project.title}
              </h3>

              <p className="text-sm text-white/60 leading-relaxed mb-4 flex-1">
                {project.description}
              </p>

              {/* Tech pills */}
              <div className="flex flex-wrap gap-1.5 mb-4 mt-auto">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-semibold"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex gap-3 pt-3 border-t border-white/[0.06]">
                {project.githubLink && (
                  <Button href={project.githubLink} external>
                    <FaGithub size={16} /> GitHub
                  </Button>
                )}
                {project.demoLink && (
                  <Button href={project.demoLink} external variant="ghost">
                    <ExternalLink size={16} /> Demo
                  </Button>
                )}
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass p-6 text-center mt-8"
      >
        <h3
          className="text-lg font-bold text-white/90 mb-2"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Want to see more?
        </h3>
        <p className="text-white/50 text-sm mb-4">
          Check out my GitHub profile for additional projects and contributions.
        </p>
        <Button href={personalInfo.github} external variant="ghost">
          <FaGithub size={16} /> View GitHub Profile
        </Button>
      </motion.div>
    </PageTransition>
  );
}
