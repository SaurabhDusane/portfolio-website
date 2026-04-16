"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  User,
  FolderGit2,
  PenLine,
  Mail,
  Brain,
  BarChart3,
  Bot,
  Eye,
  GraduationCap,
  Sun,
  CloudSun,
  Moon,
  Star,
} from "lucide-react";
import { personalInfo, focusDomains } from "@/lib/data";

const domainIcons: Record<string, React.ReactNode> = {
  brain: <Brain size={16} />,
  chart: <BarChart3 size={16} />,
  bot: <Bot size={16} />,
  eye: <Eye size={16} />,
};

const exploreCards = [
  {
    href: "/bio",
    icon: <User size={22} />,
    title: "About Me",
    desc: "Education, skills & experience",
    gradient: "from-indigo-500 to-purple-500",
    border: "border-indigo-500/30",
    shadow: "hover:shadow-indigo-500/15",
  },
  {
    href: "/projects",
    icon: <FolderGit2 size={22} />,
    title: "Projects",
    desc: "ML, NLP & AI solutions",
    gradient: "from-purple-500 to-pink-500",
    border: "border-purple-500/30",
    shadow: "hover:shadow-purple-500/15",
  },
  {
    href: "/writing",
    icon: <PenLine size={22} />,
    title: "Writing",
    desc: "Essays on AI, ethics & strategy",
    gradient: "from-teal-500 to-blue-500",
    border: "border-teal-500/30",
    shadow: "hover:shadow-teal-500/15",
  },
  {
    href: "/contact",
    icon: <Mail size={22} />,
    title: "Contact",
    desc: "Let's connect & collaborate",
    gradient: "from-amber-500 to-pink-500",
    border: "border-amber-500/30",
    shadow: "hover:shadow-amber-500/15",
  },
];

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return { icon: <Sun size={16} />, text: "Good Morning" };
  if (hour < 17) return { icon: <CloudSun size={16} />, text: "Good Afternoon" };
  if (hour < 21) return { icon: <Moon size={16} />, text: "Good Evening" };
  return { icon: <Star size={16} />, text: "Hello, Night Owl" };
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6 },
  }),
};

export default function Home() {
  const greeting = getGreeting();

  return (
    <div className="max-w-4xl mx-auto px-6 pb-20">
      {/* Hero Card */}
      <motion.div
        initial="hidden"
        animate="visible"
        className="glass p-8 sm:p-12 text-center mt-8 sm:mt-16"
      >
        {/* Greeting badge */}
        <motion.div
          custom={0}
          variants={fadeUp}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold tracking-wide mb-6"
        >
          {greeting.icon} {greeting.text} — Welcome to My Portfolio
        </motion.div>

        {/* University badge */}
        <motion.div
          custom={1}
          variants={fadeUp}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold mb-8"
        >
          <GraduationCap size={14} />
          M.S. Computer Engineering @ Arizona State University
        </motion.div>

        {/* Avatar */}
        <motion.div custom={2} variants={fadeUp} className="mb-8">
          <div className="w-28 h-28 mx-auto rounded-full border-2 border-purple-500/30 p-1 shadow-lg shadow-purple-500/10">
            <Image
              src="/headshot.png"
              alt="Saurabh Dusane"
              width={112}
              height={112}
              className="rounded-full object-cover"
              priority
            />
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1
          custom={3}
          variants={fadeUp}
          className="text-3xl sm:text-4xl font-bold mb-3 gradient-text"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          {personalInfo.name}
        </motion.h1>

        {/* Role */}
        <motion.p
          custom={4}
          variants={fadeUp}
          className="text-white/70 text-sm sm:text-base mb-6"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          <strong className="text-white/90">AI/ML Engineer</strong> &nbsp;/&nbsp;
          Data Scientist &nbsp;/&nbsp; Full-Stack AI Builder
        </motion.p>

        {/* Description */}
        <motion.p
          custom={5}
          variants={fadeUp}
          className="text-white/70 text-sm leading-relaxed max-w-xl mx-auto mb-8"
        >
          Passionate about building{" "}
          <span className="text-purple-300 font-semibold">
            intelligent ML systems
          </span>{" "}
          that transform real-world data into{" "}
          <span className="text-purple-300 font-semibold">
            meaningful outcomes
          </span>
          . Exploring the intersection of predictive analytics, NLP, and
          scalable AI solutions.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          custom={6}
          variants={fadeUp}
          className="flex flex-wrap justify-center gap-4"
        >
          <Link
            href="/bio"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold text-sm shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/30"
          >
            <User size={16} /> Explore My Work
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/15 text-white/80 font-semibold text-sm transition-all duration-300 hover:bg-white/5 hover:-translate-y-1 hover:text-white"
          >
            <Mail size={16} /> Get In Touch
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="flex justify-center mt-10 mb-12"
      >
        <div className="scroll-indicator">
          <div className="scroll-dot" />
        </div>
      </motion.div>

      {/* Focus Domain Pills */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="flex flex-wrap justify-center gap-3 mb-16"
      >
        {focusDomains.map((d, i) => (
          <motion.div
            key={d.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9 + i * 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 text-white/70 text-xs font-semibold tracking-wide hover:bg-white/[0.08] hover:text-white/90 transition-all duration-300 cursor-default"
          >
            {domainIcons[d.icon]}
            {d.label}
          </motion.div>
        ))}
      </motion.div>

      {/* Section Divider */}
      <div className="flex items-center justify-center gap-4 mb-16">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
        <div className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-white/40">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" /><path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z" />
          </svg>
        </div>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
      </div>

      {/* Explore Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {exploreCards.map((card, i) => (
          <motion.div
            key={card.href}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 + i * 0.1 }}
          >
            <Link
              href={card.href}
              className={`group block glass p-5 text-center transition-all duration-300 hover:scale-[1.03] ${card.shadow}`}
            >
              <div
                className={`w-11 h-11 mx-auto mb-3 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-5deg]`}
              >
                {card.icon}
              </div>
              <div
                className="text-sm font-semibold text-white/90 mb-1 group-hover:text-white transition-colors"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {card.title}
              </div>
              <div className="text-xs text-white/50">{card.desc}</div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
