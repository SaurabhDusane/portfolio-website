import Image from "next/image";
import Link from "next/link";
import { Calendar, Award, ExternalLink } from "lucide-react";
import AwardBadge from "./AwardBadge";

export default function RightSidebar() {
  return (
    <aside className="hidden xl:block fixed top-12 right-0 w-72 h-[calc(100vh-48px)] overflow-y-auto p-3">
      {/* Profile card */}
      <div className="reddit-card overflow-hidden">
        {/* Banner */}
        <div className="h-16 bg-gradient-to-r from-accent/60 to-accent-2/40" />

        <div className="-mt-6 px-4 pb-4">
          {/* Avatar */}
          <div className="relative w-14 h-14 rounded-full border-4 border-card overflow-hidden">
            <Image src="/headshot.png" alt="Saurabh Dusane" fill className="object-cover" sizes="56px" />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-card online-dot" />
          </div>

          <h2 className="text-base font-bold text-text mt-2">Saurabh Nilesh Dusane</h2>
          <p className="text-xs text-text-muted">u/saurabh &middot; AI/ML Engineer &middot; Data Scientist</p>

          {/* Karma & GPA */}
          <div className="flex items-center gap-4 mt-3 text-xs">
            <div>
              <div className="font-bold text-text">1,500+</div>
              <div className="text-text-muted">Community Reach</div>
            </div>
            <div>
              <div className="font-bold text-text flex items-center gap-1">
                4.00<span className="text-text-muted font-normal">/4.00</span>
              </div>
              <div className="text-text-muted">GPA @ ASU</div>
            </div>
            <div>
              <div className="flex items-center gap-1 text-text-muted">
                <Calendar size={12} /> May 2026
              </div>
              <div className="text-text-muted">Graduated</div>
            </div>
          </div>

          {/* Trophies */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            <AwardBadge
              title="AVEVA EcoTech"
              description="3rd place globally — IoT Smart Agriculture System"
              color="#FFD700"
            />
            <AwardBadge
              title="SIH 2nd"
              description="2nd place — Smart India Hackathon, AI Traffic Optimization"
              color="#C0C0C0"
            />
            <AwardBadge
              title="Phoenix AI"
              description="Co-founder & President — Scaled to 1,500+ members in 3 months"
              color="var(--accent)"
            />
          </div>

          {/* CTAs */}
          <div className="flex gap-2 mt-4">
            <a
              href="/Resume_Saurabh_Nilesh_Dusane.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-full bg-accent text-white text-xs font-bold hover:bg-accent-2 transition-colors"
            >
              Resume <ExternalLink size={12} />
            </a>
            <Link
              href="/contact"
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-full border border-border text-text text-xs font-bold hover:bg-card-hover transition-colors"
            >
              Let\u0027s Connect
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
