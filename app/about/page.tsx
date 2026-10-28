import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SkillMap from "@/components/SkillMap";
import ImpactStrip from "@/components/ImpactStrip";
import HowIWork from "@/components/HowIWork";
import AboutTimeline, { type TimelineEntry } from "@/components/AboutTimeline";
import CommunityList, { type CommunityItem } from "@/components/CommunityList";
import {
  personalInfo,
  education,
  skillCategories,
  alsoFamiliar,
  experiences,
  awards,
  essays,
  notes,
  aboutLine,
  aboutFacts,
  community,
  now,
} from "@/data";

const DESCRIPTION = "ML, AI, and data engineer who builds reliable pipelines, models, and agents.";

export const metadata: Metadata = {
  title: "About",
  description: DESCRIPTION,
  alternates: { canonical: "/about" },
  // Page-level openGraph/twitter replace the layout's, so repeat its shared fields.
  openGraph: {
    type: "website",
    siteName: "Saurabh Dusane",
    url: "/about",
    title: "About Saurabh Dusane",
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "About Saurabh Dusane",
    description: DESCRIPTION,
    creator: "@SaurabhDusane",
  },
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** Sort key from the start of a period like "Nov 2025 – Present" or "2023". */
function startOf(period: string) {
  const m = period.match(/(?:([A-Z][a-z]{2})\s+)?(\d{4})/);
  if (!m) return 0;
  return Number(m[2]) * 12 + (m[1] ? MONTHS.indexOf(m[1]) : 0);
}

function buildTimeline(): TimelineEntry[] {
  const entries: TimelineEntry[] = [
    ...experiences.map((e, i) => ({
      id: `work-${i}`,
      kind: "work" as const,
      period: e.duration,
      title: e.title,
      org: e.company,
      headline: e.headline,
      details: e.bullets,
    })),
    ...education.map((e, i) => ({
      id: `edu-${i}`,
      kind: "education" as const,
      period: e.period,
      title: e.degree,
      org: e.school,
      headline: e.gpa ? `GPA ${e.gpa}` : "",
      details: e.coursework.length ? [`Relevant coursework: ${e.coursework.join(", ")}`] : [],
    })),
    ...awards.map((a, i) => ({
      id: `award-${i}`,
      kind: "award" as const,
      period: a.year,
      title: a.title,
      org: "",
      headline: a.detail,
      details: [],
    })),
  ];
  return entries.sort((a, b) => startOf(b.period) - startOf(a.period));
}

/** Use a community logo only if its file is actually in /public (checked at build time). */
function withLogos(): CommunityItem[] {
  return community.map((c) => ({
    ...c,
    logoSrc: c.logo && fs.existsSync(path.join(process.cwd(), "public", c.logo)) ? c.logo : undefined,
  }));
}

export default function AboutPage() {
  const timeline = buildTimeline();
  const latestEssay = essays[0];

  return (
    <div className="page">
      {/* ─── Opening ───────────────────────────────────────────────────── */}
      <header className="about-hero">
        <Image
          src={personalInfo.avatar ?? "/headshot.png"}
          alt="Portrait of Saurabh Dusane"
          width={112}
          height={112}
          priority
          className="about-photo"
        />
        <div className="min-w-0">
          <p className="t-small">About {personalInfo.shortName}</p>
          <h1 className="about-line mt-2">{aboutLine}</h1>
          <ul className="about-facts mt-5">
            {aboutFacts.map((f) => (
              <li key={f.label} className="about-fact">
                <span style={{ color: "var(--text)" }}>{f.label}</span>
                {f.detail && <span className="t-small"> · {f.detail}</span>}
              </li>
            ))}
            {personalInfo.availability && (
              <li className="about-fact about-fact-roles">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ background: "var(--success)" }} aria-hidden="true" />
                <span style={{ color: "var(--text)" }}>{personalInfo.availability}</span>
              </li>
            )}
          </ul>
        </div>
      </header>

      <div className="mt-10 flex flex-col gap-4 max-w-[640px]">
        {personalInfo.bio.map((para, i) => (
          <p key={i} className="t-body">
            {para.map((part, j) =>
              typeof part === "string" ? (
                part
              ) : part.href.startsWith("/") ? (
                <Link key={j} href={part.href} className="link">
                  {part.text}
                </Link>
              ) : (
                <a key={j} href={part.href} target="_blank" rel="noopener noreferrer" className="link">
                  {part.text}
                </a>
              )
            )}
          </p>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <a href={personalInfo.resumePath} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
          Download resume
        </a>
        <a href={`mailto:${personalInfo.email}`} className="btn btn-secondary">
          Email me
        </a>
      </div>

      {/* ─── Impact numbers ────────────────────────────────────────────── */}
      <section className="mt-16" aria-label="By the numbers">
        <ImpactStrip />
      </section>

      {/* ─── How I work ────────────────────────────────────────────────── */}
      <section id="how-i-work" className="section" aria-labelledby="how-heading">
        <h2 id="how-heading" className="t-h2">How I work</h2>
        <p className="t-body mt-2 max-w-[600px]">
          Three habits, each learned from something that broke or nearly did. They’re interactive, so try them.
        </p>
        <div className="mt-8">
          <HowIWork />
        </div>
      </section>

      {/* ─── Timeline ──────────────────────────────────────────────────── */}
      <section id="experience" className="section" aria-labelledby="experience-heading">
        <h2 id="experience-heading" className="t-h2">Experience &amp; education</h2>
        <span id="education" aria-hidden="true" />
        <AboutTimeline entries={timeline} />
      </section>

      {/* ─── Skills in practice (interactive map) ──────────────────────── */}
      <section id="skills-map" className="section" aria-labelledby="skills-map-heading">
        <h2 id="skills-map-heading" className="t-h2">Skills in practice</h2>
        <SkillMap />
      </section>

      {/* ─── Tools ─────────────────────────────────────────────────────── */}
      <section id="skills" className="section" aria-labelledby="skills-heading">
        <h2 id="skills-heading" className="t-h2">Tools</h2>
        <dl className="mt-8 flex flex-col gap-5">
          {skillCategories.map((cat) => (
            <div key={cat.title} className="timeline-item">
              <dt className="t-h3" style={{ fontWeight: 500 }}>{cat.title}</dt>
              <dd className="t-body">{cat.skills.join(", ")}</dd>
            </div>
          ))}
          {alsoFamiliar.length > 0 && (
            <div className="timeline-item">
              <dt className="t-h3" style={{ fontWeight: 500, color: "var(--text-muted)" }}>Also familiar</dt>
              <dd className="t-body">{alsoFamiliar.join(", ")}</dd>
            </div>
          )}
        </dl>
      </section>

      {/* ─── Outside work ──────────────────────────────────────────────── */}
      <section id="outside-work" className="section" aria-labelledby="outside-heading">
        <h2 id="outside-heading" className="t-h2">Outside work</h2>
        <div className="outside-layout mt-8">
          <article className="outside-card" aria-labelledby="community-heading">
            <h3 id="community-heading" className="t-h3">Community</h3>
            <CommunityList entries={withLogos()} />
          </article>

          <div className="outside-pair">
            <article className="outside-card">
              <h3 className="t-h3">Writing</h3>
              <p className="t-body mt-2">
                {essays.length} essays on technology, ethics, and culture
                {notes.length > 0 && <>, and {notes.length} technical notes on what I’m building</>}.
                {latestEssay && (
                  <>
                    {" "}
                    Most recent essay: <em>{latestEssay.title}</em>.
                  </>
                )}
              </p>
              <Link href="/writing" className="more-link mt-4">
                Read the writing <ArrowRight size={14} />
              </Link>
              <p className="t-small mt-3">
                The essays are also on{" "}
                <a href={personalInfo.medium} target="_blank" rel="noopener noreferrer" className="link">
                  Medium
                </a>
                .
              </p>
            </article>

            <article className="outside-card">
              <h3 className="t-h3">Now</h3>
              <ul className="now-list mt-2">
                {now.map((line) => (
                  <li key={line} className="t-body">
                    {line}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}
