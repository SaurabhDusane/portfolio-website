"use client";

import { useEffect, useId, useRef, useState } from "react";

interface MermaidDiagramProps {
  /** Mermaid source string. */
  chart: string;
}

/**
 * Client-side mermaid renderer, loaded only on pages that include a diagram.
 * Re-renders on `data-theme` changes (the theme toggle) and on large width
 * changes; left-to-right flowcharts that would shrink too far are stacked. No animation flourishes \u2014 reduced-motion safe.
 */
export default function MermaidDiagram({ chart }: MermaidDiagramProps) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const ref = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function render() {
      try {
        const mermaid = (await import("mermaid")).default;
        const isDark = document.documentElement.getAttribute("data-theme") !== "light";
        // "base" is the only Mermaid theme that honours themeVariables, so both
        // palettes are spelled out here to match the site tokens.
        mermaid.initialize({
          startOnLoad: false,
          theme: "base",
          securityLevel: "strict",
          fontFamily: "var(--font-inter), system-ui, sans-serif",
          themeVariables: {
            fontSize: "14px",
            primaryColor: isDark ? "#12100e" : "#ffffff",
            primaryTextColor: isDark ? "#eee8e1" : "#1e1a16",
            primaryBorderColor: isDark ? "#3d3530" : "#d3c9bd",
            lineColor: isDark ? "#8c8379" : "#72695f",
            secondaryColor: isDark ? "#1b1815" : "#f3eee8",
            tertiaryColor: isDark ? "#1b1815" : "#f3eee8",
            background: "transparent",
          },
        });
        let { svg: out } = await mermaid.render(`m-${id}`, chart);

        // A wide left-to-right flowchart gets scaled down until its labels are
        // unreadable. If it would shrink below 80% of its natural size in this
        // container, render it top-to-bottom instead.
        const isLR = /^\s*(?:flowchart|graph)\s+LR\b/.test(chart);
        const naturalWidth = Number(out.match(/viewBox="[-\d.]+ [-\d.]+ ([\d.]+)/)?.[1] ?? 0);
        const available = (ref.current?.clientWidth ?? 0) - 48; // minus padding
        if (isLR && naturalWidth > 0 && available > 0 && available / naturalWidth < 0.8) {
          ({ svg: out } = await mermaid.render(`m-${id}-td`, chart.replace(/^(\s*(?:flowchart|graph))\s+LR\b/, "$1 TD")));
        }
        if (!cancelled) {
          setSvg(out);
          setError(null);
        }
      } catch (e: unknown) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Failed to render diagram");
        }
      }
    }

    // Mermaid can't run two renders at once (they share element ids), so
    // every trigger goes through one queue.
    let queue = Promise.resolve();
    const schedule = () => {
      queue = queue.then(render);
    };

    // Mermaid is a large library: load and render it only when the diagram
    // is about to scroll into view, so it never competes with page load.
    let started = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true;
          io.disconnect();
          schedule();
        }
      },
      { rootMargin: "400px 0px" }
    );
    if (ref.current) io.observe(ref.current);

    // Re-render on theme change
    const obs = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.attributeName === "data-theme" && started) {
          schedule();
          break;
        }
      }
    });
    obs.observe(document.documentElement, { attributes: true });

    // Re-check the fit when the layout width changes (rotation, resize).
    // The first callback only records the starting width.
    let lastWidth: number | null = null;
    const ro = new ResizeObserver(([entry]) => {
      const w = Math.round(entry.contentRect.width);
      if (lastWidth === null) {
        lastWidth = w;
        return;
      }
      if (started && Math.abs(w - lastWidth) > 40) {
        lastWidth = w;
        schedule();
      }
    });
    if (ref.current) ro.observe(ref.current);

    return () => {
      cancelled = true;
      io.disconnect();
      obs.disconnect();
      ro.disconnect();
    };
  }, [chart, id]);

  if (error) {
    return (
      <div
        className="t-small p-4 rounded-xl"
        style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text-hint)" }}
      >
        Diagram failed to render: {error}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      data-diagram={svg ? "rendered" : "pending"}
      className="rounded-xl p-4 sm:p-6 overflow-x-auto flex justify-center min-h-[120px]"
      style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
