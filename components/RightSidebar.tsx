import Image from "next/image";
import Link from "next/link";
import { Trophy, Award, ExternalLink } from "lucide-react";

export default function RightSidebar() {
  return (
    <div className="sticky top-16 py-5">
      <div className="reddit-card overflow-hidden">
        {/* Orange banner */}
        <div style={{ height: 42, background: "var(--accent)" }} />

        <div style={{ marginTop: -24, padding: "0 16px 16px" }}>
          {/* Avatar */}
          <div className="relative" style={{ width: 48, height: 48 }}>
            <div
              className="rounded-full overflow-hidden"
              style={{ width: 48, height: 48, border: "3px solid var(--card)" }}
            >
              <Image src="/headshot.png" alt="Saurabh Dusane" width={48} height={48} className="object-cover" />
            </div>
            <span
              className="absolute bottom-0 right-0 w-3 h-3 rounded-full online-dot"
              style={{ background: "var(--success)", border: "2px solid var(--card)" }}
            />
          </div>

          {/* Name */}
          <h2 className="text-[14px] font-medium mt-2" style={{ color: "var(--text)" }}>Saurabh Nilesh Dusane</h2>
          <p className="text-[11px]" style={{ color: "var(--text-hint)" }}>u/saurabh &middot; AI/ML Engineer</p>

          {/* Stats — 2 tiles */}
          <div className="grid grid-cols-2 gap-2 mt-3">
            <div className="rounded-lg p-2.5" style={{ background: "var(--rail)" }}>
              <div className="text-[14px] font-medium" style={{ color: "var(--text)" }}>1,500+</div>
              <div className="text-[10px]" style={{ color: "var(--text-hint)" }}>community reach</div>
            </div>
            <div className="rounded-lg p-2.5" style={{ background: "var(--rail)" }}>
              <div className="text-[14px] font-medium" style={{ color: "var(--text)" }}>4.00</div>
              <div className="text-[10px]" style={{ color: "var(--text-hint)" }}>GPA at ASU</div>
            </div>
          </div>

          <p className="text-[10px] mt-2" style={{ color: "var(--text-hint)" }}>Graduated May 2026</p>

          {/* Trophies */}
          <div className="mt-3 space-y-1.5">
            <div className="flex items-center gap-2 text-[11px]">
              <Trophy size={13} style={{ color: "#D4A017" }} />
              <span style={{ color: "var(--text-muted)" }}>AVEVA EcoTech &mdash; 3rd</span>
            </div>
            <div className="flex items-center gap-2 text-[11px]">
              <Award size={13} style={{ color: "#8A8A8E" }} />
              <span style={{ color: "var(--text-muted)" }}>Smart India Hackathon &mdash; 2nd</span>
            </div>
            <div className="flex items-center gap-2 text-[11px]">
              <Trophy size={13} style={{ color: "var(--accent)" }} />
              <span style={{ color: "var(--text-muted)" }}>Phoenix AI Club &mdash; Founder</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-4 space-y-2">
            <a
              href="/Resume_Saurabh_Nilesh_Dusane.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 w-full py-2 rounded-full text-white text-[12px] font-medium transition-colors"
              style={{ background: "var(--accent)" }}
            >
              Resume <ExternalLink size={11} />
            </a>
            <Link
              href="/contact"
              className="flex items-center justify-center w-full py-2 rounded-full text-[12px] font-medium transition-colors"
              style={{ border: "1px solid var(--border)", color: "var(--text)" }}
            >
              Let's connect
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
