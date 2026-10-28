import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { personalInfo, projects, experiences, articlesByDate } from "@/data";
import ProjectRow from "@/components/ProjectRow";
import ArticleRow from "@/components/ArticleRow";
import Reveal from "@/components/Reveal";
import { SITE_URL } from "@/lib/site";

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
  image: `${SITE_URL}${personalInfo.avatar ?? "/headshot.png"}`,
  jobTitle: personalInfo.role,
  email: `mailto:${personalInfo.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Tempe", addressRegion: "AZ", addressCountry: "US" },
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "Arizona State University" },
    { "@type": "CollegeOrUniversity", name: "Savitribai Phule Pune University" },
  ],
  sameAs: [personalInfo.github, personalInfo.linkedin, personalInfo.medium, personalInfo.twitter],
};

export default function HomePage() {
  const selected = projects.filter((p) => p.featured).slice(0, 4);
  // Lead with the technical essays, then fill with the most recent other piece.
  const technical = articlesByDate.filter((a) => a.category === "Technical Essay");
  const writing = [...technical, ...articlesByDate.filter((a) => a.category !== "Technical Essay")].slice(0, 3);

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
          src={personalInfo.avatar ?? "/headshot.png"}
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
          {personalInfo.role} · {personalInfo.location}
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
          <a href={`mailto:${personalInfo.email}`} className="btn btn-primary">
            <Mail size={16} /> Email me
          </a>
          <a href={personalInfo.resumePath} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
            Resume
          </a>
          <div className="flex items-center">
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label="GitHub" title="GitHub">
              <FaGithub size={20} />
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label="LinkedIn" title="LinkedIn">
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* ─── Selected work ─────────────────────────────────────────────── */}
      <section className="section" aria-labelledby="work-heading">
        <div className="section-head">
          <h2 id="work-heading" className="t-h2">Selected work</h2>
          <Link href="/projects" className="more-link">
            All projects <ArrowRight size={14} />
          </Link>
        </div>
        <div className="row-list">
          {selected.map((project, i) => (
            <Reveal key={project.id} delay={i * 60}>
              <ProjectRow project={project} />
            </Reveal>
          ))}
        </div>
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
                <p className="t-body" style={{ fontSize: 16 }}>{exp.companyShort}</p>
              </div>
            </li>
          ))}
        </ol>
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
          {writing.map((article, i) => (
            <Reveal key={article.id} delay={i * 60}>
              <ArticleRow article={article} showExcerpt={false} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ─── Contact ───────────────────────────────────────────────────── */}
      <section className="section" aria-labelledby="contact-heading">
        <h2 id="contact-heading" className="t-h2">Get in touch</h2>
        <p className="t-body mt-3 max-w-[560px]">
          The quickest way to reach me is email. You can also use the{" "}
          <Link href="/contact" className="link">contact form</Link>.
        </p>
        <p className="mt-4 text-[20px] font-medium break-words">
          <a href={`mailto:${personalInfo.email}`} className="link">
            {personalInfo.email}
          </a>
        </p>
      </section>
    </div>
  );
}
