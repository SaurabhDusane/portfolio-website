import { FaGithub, FaLinkedin, FaMedium, FaXTwitter } from "react-icons/fa6";
import { Mail } from "lucide-react";
import { personalInfo } from "@/data";

const socials = [
  { label: "Email", href: `mailto:${personalInfo.email}`, icon: <Mail size={18} /> },
  { label: "GitHub", href: personalInfo.github, icon: <FaGithub size={18} /> },
  { label: "LinkedIn", href: personalInfo.linkedin, icon: <FaLinkedin size={18} /> },
  { label: "Medium", href: personalInfo.medium, icon: <FaMedium size={18} /> },
  { label: "X", href: personalInfo.twitter, icon: <FaXTwitter size={18} /> },
];

export default function SiteFooter() {
  return (
    <footer className="mt-24 sm:mt-32 border-t border-border">
      <div className="page flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-4 py-8">
        <p className="t-small">© {new Date().getFullYear()} {personalInfo.name}</p>
        <ul className="flex items-center gap-1 -ml-2.5 sm:ml-0 sm:-mr-2.5">
          {socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={s.label}
                title={s.label}
                className="icon-btn"
              >
                {s.icon}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
