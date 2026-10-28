import type { Metadata } from "next";
import { FileText } from "lucide-react";
import { FaGithub, FaLinkedin, FaMedium, FaXTwitter } from "react-icons/fa6";
import { contactInfo, personalInfo } from "@/data";
import ContactForm from "./ContactForm";
import CopyEmail from "@/components/CopyEmail";
import LocalTime from "@/components/LocalTime";
import { resumeUpdated } from "@/lib/assets";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Saurabh Dusane about ML, AI, and data engineering roles (full-time, part-time, or contract) or a project.",
  alternates: { canonical: "/contact" },
};

const elsewhere = [
  { label: "GitHub", href: personalInfo.github, icon: FaGithub, detail: "Guardian, miniagent, and the FP8 kernel" },
  { label: "LinkedIn", href: personalInfo.linkedin, icon: FaLinkedin, detail: "Experience and background" },
  { label: "Medium", href: personalInfo.medium, icon: FaMedium, detail: "The essays" },
  { label: "X", href: personalInfo.twitter, icon: FaXTwitter, detail: "Occasional posts" },
];

export default function ContactPage() {
  const resumeDate = resumeUpdated(personalInfo.resumePath);
  return (
    <div className="page">
      <h1 className="t-h1">Contact</h1>
      <p className="t-body mt-3 max-w-[600px]">
        Email is the quickest way to reach me:{" "}
        <a href={`mailto:${personalInfo.email}`} className="link break-words">
          {personalInfo.email}
        </a>
        . You can also send a note with the form below, and I’ll reply by email.
      </p>
      <div className="mt-4">
        <CopyEmail email={personalInfo.email} variant="inline" />
      </div>
      <p className="t-small mt-4">
        {contactInfo.replyTime} <LocalTime timeZone={contactInfo.timeZone} label={contactInfo.timeZoneLabel} />
      </p>

      {/* ─── At a glance (for recruiters) ──────────────────────────────── */}
      <aside className="glance mt-8 max-w-[600px]" aria-labelledby="glance-heading">
        <h2 id="glance-heading" className="t-small">At a glance</h2>
        <ul className="glance-list mt-3">
          <li>
            <span className="w-2 h-2 rounded-full shrink-0" style={{ background: "var(--success)" }} aria-hidden="true" />
            {contactInfo.roles}
          </li>
          <li>{contactInfo.roleTypes}</li>
          <li>{contactInfo.degree}</li>
        </ul>
        <div className="mt-4 flex flex-wrap gap-3">
          <a href={personalInfo.resumePath} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">
            <FileText size={14} /> Download resume
          </a>
          {resumeDate && <span className="t-small self-center">Updated {resumeDate}</span>}
          <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">
            <FaLinkedin size={14} /> LinkedIn
          </a>
        </div>
      </aside>

      <section className="mt-12 max-w-[600px]" aria-label="Contact form">
        <ContactForm
          formspreeId={personalInfo.formspreeId}
          email={personalInfo.email}
          resumePath={personalInfo.resumePath}
          replyTime={contactInfo.replyTime}
        />
      </section>

      <section className="section" aria-labelledby="elsewhere-heading">
        <h2 id="elsewhere-heading" className="t-h2">Elsewhere</h2>
        <ul className="elsewhere mt-4">
          {elsewhere.map(({ label, href, icon: Icon, detail }) => (
            <li key={label}>
              <a href={href} target="_blank" rel="noopener noreferrer" className="elsewhere-link group">
                <Icon size={18} className="elsewhere-icon" aria-hidden="true" />
                <span className="min-w-0">
                  <span className="elsewhere-label">{label}</span>
                  <span className="t-small block">{detail}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
