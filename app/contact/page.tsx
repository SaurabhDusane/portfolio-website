import type { Metadata } from "next";
import { personalInfo } from "@/data";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Saurabh Dusane by email or through the contact form.",
};

const elsewhere = [
  { label: "LinkedIn", href: personalInfo.linkedin },
  { label: "GitHub", href: personalInfo.github },
  { label: "Medium", href: personalInfo.medium },
  { label: "X", href: personalInfo.twitter },
];

export default function ContactPage() {
  return (
    <div className="page">
      <h1 className="t-h1">Contact</h1>
      <p className="t-body mt-3 max-w-[600px]">
        Email is the quickest way to reach me:{" "}
        <a href={`mailto:${personalInfo.email}`} className="link break-words">
          {personalInfo.email}
        </a>
        . Or send a note with the form below and I’ll reply by email.
      </p>

      <section className="mt-12 max-w-[600px]" aria-label="Contact form">
        <ContactForm formspreeId={personalInfo.formspreeId} />
      </section>

      <section className="section" aria-labelledby="elsewhere-heading">
        <h2 id="elsewhere-heading" className="t-h2">Elsewhere</h2>
        <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
          {elsewhere.map((l) => (
            <li key={l.label}>
              <a href={l.href} target="_blank" rel="noopener noreferrer" className="link">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
