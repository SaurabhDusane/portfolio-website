"use client";

import { useEffect, useId, useRef, useState } from "react";

interface MermaidDiagramProps {
  /** Mermaid source string. */
  chart: string;
}

/**
 * Client-side mermaid renderer. Reacts to `data-theme` changes on <html>
 * (the theme toggle) and re-renders. No animation flourishes \u2014 reduced-motion safe.
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
        mermaid.initialize({
          startOnLoad: false,
          theme: isDark ? "dark" : "default",
          securityLevel: "strict",
          fontFamily: "var(--font-inter), system-ui, sans-serif",
          themeVariables: {
            primaryColor: isDark ? "#272729" : "#FFFFFF",
            primaryTextColor: isDark ? "#D7DADC" : "#1A1A1B",
            primaryBorderColor: isDark ? "#343536" : "#E4E5E8",
            lineColor: isDark ? "#818384" : "#7C7C7E",
            secondaryColor: isDark ? "#1A1A1B" : "#F6F7F8",
            tertiaryColor: isDark ? "#0E0E0F" : "#FFFFFF",
            background: "transparent",
          },
        });
        const { svg: out } = await mermaid.render(`m-${id}`, chart);
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

    render();

    // Re-render on theme change
    const obs = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.attributeName === "data-theme") {
          render();
          break;
        }
      }
    });
    obs.observe(document.documentElement, { attributes: true });

    return () => {
      cancelled = true;
      obs.disconnect();
    };
  }, [chart, id]);

  if (error) {
    return (
      <div
        className="text-[12px] p-3 rounded-lg"
        style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text-hint)" }}
      >
        Diagram failed to render: {error}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className="rounded-lg p-4 overflow-x-auto"
      style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
