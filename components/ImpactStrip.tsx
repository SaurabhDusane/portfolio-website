"use client";

import { useEffect, useRef } from "react";
import { impactNumbers } from "@/data/about";

const DURATION = 1100;

function format(n: number) {
  return Math.round(n).toLocaleString("en-US");
}

/**
 * Row of headline numbers that count up the first time they're in view
 * (straight away if the strip is visible on load). The final values are
 * server-rendered, so the strip reads correctly without JavaScript and with
 * reduced motion; CSS hides them only for the instant before counting
 * starts. Updates text directly instead of re-rendering.
 */
export default function ImpactStrip() {
  const root = useRef<HTMLDListElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.dataset.ready = "true";
      return;
    }

    const targets = [...el.querySelectorAll<HTMLElement>("[data-count]")];
    targets.forEach((t) => (t.textContent = "0"));
    el.dataset.ready = "true";
    let raf = 0;
    const count = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const k = Math.min(1, (now - start) / DURATION);
        const eased = 1 - Math.pow(1 - k, 3);
        targets.forEach((t) => (t.textContent = format(Number(t.dataset.count) * eased)));
        if (k < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    // Count when the strip comes into view (immediately, if it already is).
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        count();
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      targets.forEach((t) => (t.textContent = format(Number(t.dataset.count))));
    };
  }, []);

  return (
    <dl ref={root} className="impact-strip">
      {impactNumbers.map((n) => (
        <div key={n.label} className="impact-item">
          <dt className="t-small">{n.label}</dt>
          <dd className="impact-value">
            {n.value !== undefined ? (
              <>
                <span data-count={n.value}>{format(n.value)}</span>
                {n.suffix}
              </>
            ) : (
              n.text
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}
