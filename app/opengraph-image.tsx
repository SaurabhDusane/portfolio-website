import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Saurabh Nilesh Dusane — AI/ML Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Social preview card (LinkedIn, X, Slack). Mirrors the site's light palette.
export default function OpengraphImage() {
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
          background: "#F5F0EA",
          borderTop: "12px solid #C2571E",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 32, fontWeight: 700, color: "#C2571E" }}>SD</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 72, fontWeight: 700, color: "#1C1815", letterSpacing: -1.5 }}>
            Saurabh Nilesh Dusane
          </div>
          <div style={{ fontSize: 36, color: "#C2571E", marginTop: 12 }}>AI/ML Engineer</div>
          <div style={{ fontSize: 28, color: "#5C534B", marginTop: 28, maxWidth: 960, lineHeight: 1.4 }}>
            Agents built from scratch, and data pipelines that survive captchas, rate limits, and silent failures.
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#8A8077" }}>saurabhdusane.com</div>
      </div>
    ),
    { ...size }
  );
}
