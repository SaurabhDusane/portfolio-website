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
import { projects } from "@/lib/data";

const iconMap: Record<string, React.ReactNode> = {
  bot: <Bot size={32} className="text-white/80" />,
  droplets: <Droplets size={32} className="text-white/80" />,
  leaf: <Leaf size={32} className="text-white/80" />,
  trendingUp: <TrendingUp size={32} className="text-white/80" />,
  shield: <Shield size={32} className="text-white/80" />,
  traffic: <TrafficCone size={32} className="text-white/80" />,
};

const gradients = [
  "from-indigo-500/30 to-purple-500/20",
  "from-purple-500/30 to-pink-500/20",
  "from-teal-500/30 to-blue-500/20",
  "from-amber-500/30 to-red-500/20",
  "from-blue-500/30 to-cyan-500/20",
  "from-pink-500/30 to-orange-500/20",
];

export default function ProjectsPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 pb-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <h1
          className="text-2xl font-bold text-white/90 inline-flex items-center gap-3 mb-3"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          <FolderGit2 size={24} className="text-indigo-400" /> Projects &amp;
          Impact
        </h1>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold mt-2">
          <Layers size={14} /> {projects.length} Featured Projects — ML, NLP,
          Computer Vision, IoT
        </div>
      </motion.div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="group glass flex flex-col"
          >
            {/* Icon header */}
            <div
              className={`h-44 flex items-center justify-center bg-gradient-to-br ${gradients[i % gradients.length]} transition-all duration-500 group-hover:scale-[1.02]`}
            >
              <div className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-5deg] drop-shadow-lg">
                {iconMap[project.icon] || <Bot size={32} className="text-white/80" />}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 flex-1 flex flex-col">
              <h3
                className="text-lg font-semibold text-white/90 mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-300 group-hover:to-pink-300 group-hover:bg-clip-text transition-all duration-300"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {project.title}
              </h3>

              <p className="text-sm text-white/70 leading-relaxed mb-4 flex-1">
                {project.description}
              </p>

              {/* Tech pills */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:scale-105"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex gap-3 pt-4 border-t border-white/[0.06]">
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-bold shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                  >
                    <FaGithub size={16} /> GitHub
                  </a>
                )}
                {project.demoLink && (
                  <a
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 text-white text-sm font-bold shadow-lg shadow-teal-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                  >
                    <ExternalLink size={16} /> Demo
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass p-8 text-center mt-10"
      >
        <h3
          className="text-lg font-bold text-white/90 mb-2"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          <span className="text-amber-400 mr-2">
            <svg
              className="inline w-5 h-5"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </span>
          Want to see more?
        </h3>
        <p className="text-white/60 text-sm">
          Check out my GitHub profile for more projects and contributions.
        </p>
      </motion.div>
    </div>
  );
}
