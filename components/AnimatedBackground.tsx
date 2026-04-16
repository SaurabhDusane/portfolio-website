"use client";

import { useMemo } from "react";

const blobs = [
  { color: "rgba(99,102,241,0.12)", w: 500, h: 500, top: "5%", left: "-5%", dur: 18 },
  { color: "rgba(168,85,247,0.10)", w: 400, h: 400, top: "60%", left: "70%", dur: 22 },
  { color: "rgba(236,72,153,0.08)", w: 350, h: 350, top: "30%", left: "50%", dur: 26 },
  { color: "rgba(20,184,166,0.07)", w: 300, h: 300, top: "70%", left: "10%", dur: 20 },
];

const geoColors = [
  "rgba(99,102,241,0.5)",
  "rgba(168,85,247,0.4)",
  "rgba(236,72,153,0.35)",
  "rgba(139,92,246,0.45)",
];
const geoShapes = ["geo-cross", "geo-ring", "geo-diamond"];

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export default function AnimatedBackground() {
  const particles = useMemo(() => {
    return Array.from({ length: 14 }, (_, i) => ({
      left: seededRandom(i * 7 + 1) * 96 + 2,
      size: seededRandom(i * 7 + 2) * 8 + 6,
      duration: seededRandom(i * 7 + 3) * 17 + 18,
      delay: seededRandom(i * 7 + 4) * 20,
      color: geoColors[i % geoColors.length],
      shape: geoShapes[i % geoShapes.length],
    }));
  }, []);

  return (
    <>
      {/* Aurora mesh */}
      <div className="aurora-mesh">
        {blobs.map((b, i) => (
          <div
            key={i}
            className="aurora-blob"
            style={{
              background: b.color,
              width: b.w,
              height: b.h,
              top: b.top,
              left: b.left,
              animation: `aurora ${b.dur}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      {/* Dot grid */}
      <div className="dot-grid" />

      {/* Geometric particles */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {particles.map((p, i) => (
          <div
            key={i}
            className={`geo-particle ${p.shape}`}
            style={{
              left: `${p.left.toFixed(1)}%`,
              width: p.size,
              height: p.size,
              color: p.color,
              animationDuration: `${p.duration.toFixed(0)}s`,
              animationDelay: `${p.delay.toFixed(0)}s`,
            }}
          />
        ))}
      </div>
    </>
  );
}
