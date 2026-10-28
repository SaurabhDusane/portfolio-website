import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

interface OgCardProps {
  eyebrow: string;
  title: string;
  /** Accent line under the title (role, key result). */
  highlight?: string;
  body?: string;
  footer: string;
}

/** Social preview card (LinkedIn, X, Slack). Mirrors the site's light palette. */
export function ogCard({ eyebrow, title, highlight, body, footer }: OgCardProps) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#fbf9f6",
          borderTop: "12px solid #b04e1a",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, fontWeight: 600, color: "#72695f" }}>{eyebrow}</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: title.length > 32 ? 60 : 72, fontWeight: 700, color: "#1e1a16", letterSpacing: -1.5, lineHeight: 1.1 }}>
            {title}
          </div>
          {highlight && <div style={{ fontSize: 36, color: "#b04e1a", marginTop: 16 }}>{highlight}</div>}
          {body && (
            <div style={{ fontSize: 28, color: "#574f47", marginTop: 24, maxWidth: 980, lineHeight: 1.4 }}>{body}</div>
          )}
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#72695f" }}>{footer}</div>
      </div>
    ),
    { ...ogSize }
  );
}
