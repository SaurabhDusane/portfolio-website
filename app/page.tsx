/**
 * Home page — hero card with avatar, role badges, focus domains, and explore grid.
 * Staggered Framer Motion entrance with compact vertical spacing.
 */
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
  Sparkles,
} from "lucide-react";
import { personalInfo, focusDomains } from "@/data";
import Button from "@/components/Button";
import PageTransition from "@/components/PageTransition";

/* ── Icon map for focus domain pills ───────────────────────────────────────── */
const domainIcons: Record<string, React.ReactNode> = {
  brain: <Brain size={16} />,
  chart: <BarChart3 size={16} />,
  bot: <Bot size={16} />,
  eye: <Eye size={16} />,
};

/* ── Explore grid cards ────────────────────────────────────────────────────── */
const exploreCards = [
  {
    href: "/bio",
    icon: <User size={22} />,
    title: "About Me",
    desc: "Education, skills & experience",
    gradient: "from-violet-500 to-fuchsia-500",
  },
  {
    href: "/projects",
    icon: <FolderGit2 size={22} />,
    title: "Projects",
    desc: "ML, NLP & AI solutions",
    gradient: "from-fuchsia-500 to-pink-500",
  },
  {
    href: "/writing",
    icon: <PenLine size={22} />,
    title: "Writing",
    desc: "Essays on AI, ethics & strategy",
    gradient: "from-teal-500 to-blue-500",
  },
  {
    href: "/contact",
    icon: <Mail size={22} />,
    title: "Contact",
    desc: "Let's connect & collaborate",
    gradient: "from-amber-500 to-pink-500",
  },
];

/* ── Time-of-day greeting ──────────────────────────────────────────────────── */
function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return { icon: <Sun size={16} />, text: "Good Morning" };
  if (hour < 17) return { icon: <CloudSun size={16} />, text: "Good Afternoon" };
  if (hour < 21) return { icon: <Moon size={16} />, text: "Good Evening" };
  return { icon: <Star size={16} />, text: "Hello, Night Owl" };
}

/* ── Stagger animation variant ─────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

/* ══════════════════════════════════════════════════════════════════════════════ */

export default function Home() {
  const greeting = getGreeting();

  return (
    <PageTransition className="max-w-4xl mx-auto px-6 pb-12">
      {/* Hero Card */}
      <motion.div
        initial="hidden"
        animate="visible"
        className="glass p-6 sm:p-10 text-center mt-4 sm:mt-8"
      >
        {/* Badges — stack vertically */}
        <div className="flex flex-col items-center gap-2 mb-5">
          <motion.span
            custom={0}
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-semibold tracking-wide"
          >
            {greeting.icon} {greeting.text} — Welcome to My Portfolio
          </motion.span>
          <motion.span
            custom={1}
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-300 text-xs font-semibold"
          >
            <GraduationCap size={14} aria-hidden="true" />
            M.S. Computer Engineering @ Arizona State University
          </motion.span>
        </div>

        {/* Avatar */}
        <motion.div custom={2} variants={fadeUp} className="mb-7">
          <div className="w-28 h-28 mx-auto rounded-full border-2 border-violet-500/30 p-1 shadow-lg shadow-violet-500/10 avatar-glow">
            <Image
              src="/headshot.png"
              alt="Saurabh Dusane — headshot"
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
          className="text-white/70 text-sm sm:text-base mb-5"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          {personalInfo.role}
        </motion.p>

        {/* Description */}
        <motion.p
          custom={5}
          variants={fadeUp}
          className="text-white/60 text-sm leading-relaxed max-w-xl mx-auto mb-6"
        >
          Passionate about building{" "}
          <span className="text-violet-300 font-semibold">intelligent ML systems</span>{" "}
          that transform real-world data into{" "}
          <span className="text-violet-300 font-semibold">meaningful outcomes</span>.
          Exploring the intersection of predictive analytics, NLP, and scalable AI.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          custom={6}
          variants={fadeUp}
          className="flex flex-wrap justify-center gap-4"
        >
          <Button href="/bio">
            <Sparkles size={16} /> Explore My Work
          </Button>
          <Button href="/contact" variant="ghost">
            <Mail size={16} /> Get In Touch
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="flex justify-center mt-6 mb-8"
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
        className="flex flex-wrap justify-center gap-3 mb-10"
      >
        {focusDomains.map((d, i) => (
          <motion.div
            key={d.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9 + i * 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 text-white/70 text-xs font-semibold tracking-wide hover:bg-white/[0.06] hover:text-white/90 transition-all duration-200 cursor-default"
          >
            {domainIcons[d.icon]}
            {d.label}
          </motion.div>
        ))}
      </motion.div>

      {/* Section Divider */}
      <div className="flex items-center justify-center gap-4 mb-10" aria-hidden="true">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
        <div className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-white/30">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z" />
          </svg>
        </div>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
      </div>

      {/* Explore label */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.95 }}
        className="text-center text-xs text-white/30 uppercase tracking-widest font-semibold mb-4"
      >
        Explore
      </motion.p>

      {/* Explore Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {exploreCards.map((card, i) => (
          <motion.div
            key={card.href}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 + i * 0.1, duration: 0.4 }}
          >
            <Link
              href={card.href}
              className="group block glass p-5 text-center transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-violet-500/[0.08]"
            >
              <div
                className={`w-11 h-11 mx-auto mb-3 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center text-white shadow-lg transition-transform duration-300 group-hover:scale-110`}
                aria-hidden="true"
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
    </PageTransition>
  );
}
