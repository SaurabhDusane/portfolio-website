"use client";

import { useEffect, useRef } from "react";

/**
 * Thin accent bar at the top of the viewport showing how far the reader is
 * through the element with id `targetId`. Updates the DOM directly (no React
 * re-renders on scroll).
 */
export default function ReadingProgress({ targetId }: { targetId: string }) {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target || !bar.current) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = target.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 1;
      bar.current!.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [targetId]);

  return <div ref={bar} className="reading-progress" aria-hidden="true" />;
}
