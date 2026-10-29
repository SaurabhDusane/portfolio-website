import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { personalInfo, projects, experiences, awards, notes, essays, currentlyBuilding } from "@/data";
import SelectedWork from "@/components/SelectedWork";
import ArticleRow from "@/components/ArticleRow";
import Reveal from "@/components/Reveal";
import CopyEmail from "@/components/CopyEmail";
import { SITE_URL } from "@/lib/site";
import { resumeUpdated } from "@/lib/assets";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

// schema.org Person — helps search engines connect this site to the same
// person on GitHub, LinkedIn, Medium and X.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: personalInfo.name,
  url: SITE_URL,
  image: `${SITE_URL}${personalInfo.avatar}`,
  jobTitle: personalInfo.role,
  email: `mailto:${personalInfo.email}`,
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "Arizona State University" },
    { "@type": "CollegeOrUniversity", name: "Savitribai Phule Pune University" },
  ],
  sameAs: [personalInfo.github, personalInfo.linkedin, personalInfo.medium, personalInfo.twitter],
};

export default function HomePage() {
  const selected = projects.filter((p) => p.featured);
  const latestNote = notes[0];
  const resumeDate = resumeUpdated(personalInfo.resumePath);
  const recentEssays = essays.slice(0, 2);

  return (
    <div className="page">
      <script
        type="application/ld+json"
        // JSON.stringify output is safe here: all values come from our own data file.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
      />
      {/* ─── Intro ─────────────────────────────────────────────────────── */}
      <section aria-labelledby="intro-name">
        <Image
          src={personalInfo.avatar}
          alt="Portrait of Saurabh Dusane"
          width={72}
          height={72}
          priority
          className="rounded-full object-cover mb-6"
          style={{ width: 72, height: 72, border: "1px solid var(--border)" }}
        />
        <h1 id="intro-name" className="t-display">
          {personalInfo.name}
        </h1>
        <p className="t-small mt-2" style={{ fontSize: 16 }}>
          {personalInfo.role}
        </p>

        <p className="t-lead mt-6 max-w-[640px]" style={{ color: "var(--text)" }}>
          {personalInfo.tagline}
        </p>
        <p className="t-body mt-4 max-w-[640px]">{personalInfo.now}</p>

        {personalInfo.availability && (
          <p className="mt-6 inline-flex items-center gap-2 text-[14px]" style={{ color: "var(--text-muted)" }}>
            <span className="w-2 h-2 rounded-full" style={{ background: "var(--success)" }} aria-hidden="true" />
            {personalInfo.availability}
          </p>
        )}

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2">
            <Link href="/contact" className="btn btn-primary">
              Get in touch
            </Link>
            <CopyEmail email={personalInfo.email} />
          </span>
          <a
            href={personalInfo.resumePath}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
            title={resumeDate ? `Resume, updated ${resumeDate}` : undefined}
          >
            Resume
          </a>
        </div>
        <p className="t-small mt-4">
          Hiring?{" "}
          <Link href="/contact?intent=hiring" className="link">
            Start here
          </Link>
          : roles, availability, and a form that reaches me directly.
        </p>
      </section>

      {/* ─── Currently building ────────────────────────────────────────── */}
      <section className="mt-14" aria-labelledby="building-heading">
        <h2 id="building-heading" className="t-small">Currently building</h2>
        <ul className="building mt-3">
          {currentlyBuilding.map((b) => (
            <li key={b.title}>
              <Link href={b.href} className="building-card group" data-cursor="Open project →">
                <span className="building-status t-small" data-tone={b.tone}>
                  <span className="building-dot" aria-hidden="true" />
                  {b.status}
                </span>
                <span className="building-title">{b.title}</span>
                <span className="t-small block mt-1">{b.detail}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ─── Selected work ─────────────────────────────────────────────── */}
      <section className="section" aria-labelledby="work-heading">
        <div className="section-head">
          <h2 id="work-heading" className="t-h2">Selected work</h2>
          <Link href="/projects" className="more-link">
            All projects <ArrowRight size={14} />
          </Link>
        </div>
        <SelectedWork projects={selected} />
      </section>

      {/* ─── Experience ────────────────────────────────────────────────── */}
      <section className="section" aria-labelledby="experience-heading">
        <div className="section-head">
          <h2 id="experience-heading" className="t-h2">Experience</h2>
          <Link href="/about#experience" className="more-link">
            Full background <ArrowRight size={14} />
          </Link>
        </div>
        <ol className="flex flex-col gap-6 mt-6">
          {experiences.map((exp) => (
            <li key={exp.title + exp.duration} className="timeline-item">
              <p className="t-small tabular-nums">{exp.duration}</p>
              <div>
                <h3 className="t-h3">{exp.title}</h3>
                <p className="t-small" style={{ color: "var(--text-muted)" }}>{exp.companyShort}</p>
                <p className="t-body mt-1">{exp.headline}</p>
              </div>
            </li>
          ))}
        </ol>
        {awards.length > 0 && (
          <p className="t-small mt-6">
            <span style={{ color: "var(--text)" }}>Recognition:</span>{" "}
            {awards.map((a) => `${a.title} (${a.year})`).join(" · ")}
          </p>
        )}
      </section>

      {/* ─── Writing ───────────────────────────────────────────────────── */}
      <section className="section" aria-labelledby="writing-heading">
        <div className="section-head">
          <h2 id="writing-heading" className="t-h2">Writing</h2>
          <Link href="/writing" className="more-link">
            All writing <ArrowRight size={14} />
          </Link>
        </div>
        <div className="row-list">
          {latestNote && (
            <Reveal>
              <ArticleRow article={latestNote} />
            </Reveal>
          )}
          {recentEssays.map((article, i) => (
            <Reveal key={article.slug} delay={(i + 1) * 60}>
              <ArticleRow article={article} showExcerpt={false} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ─── Contact ───────────────────────────────────────────────────── */}
      <section className="section" aria-labelledby="contact-heading">
        <h2 id="contact-heading" className="t-h2">Get in touch</h2>
        <p className="t-body mt-3 max-w-[560px]">
          Hiring, collaborating, or curious about one of the projects? Email is the quickest way to reach me, or
          use the <Link href="/contact" className="link">contact form</Link>.
        </p>
        <p className="mt-4 flex flex-wrap items-center gap-3 text-[20px] font-medium">
          <a href={`mailto:${personalInfo.email}`} className="link break-all">
            {personalInfo.email}
          </a>
          <CopyEmail email={personalInfo.email} variant="inline" />
        </p>
      </section>
    </div>
  );
}
