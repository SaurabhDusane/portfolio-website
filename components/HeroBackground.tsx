"use client";

import { useEffect, useRef } from "react";

type Variant = "dots" | "graph" | "glow";

/**
 * Interactive background for the home-page hero. Sits behind the intro and
 * fades out before the content below, so reading areas stay calm.
 *
 * - Only animates while visible and the tab is focused.
 * - Under prefers-reduced-motion it draws one static frame and stops.
 * - Colors come from the theme tokens, so it follows light/dark mode.
 */
export default function HeroBackground({ variant: initial = "dots" }: { variant?: Variant }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const variant = (new URLSearchParams(location.search).get("bg") as Variant) || initial; // PROTOTYPE
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    let visible = true;
    let colors = readColors();
    // Pointer in canvas coordinates; null when outside.
    let pointer: { x: number; y: number } | null = null;
    // Smoothed pointer for gentle easing.
    let eased = { x: -9999, y: -9999 };
    const start = performance.now();

    // Graph variant state
    type Node = { x: number; y: number; vx: number; vy: number };
    let nodes: Node[] = [];

    function readColors() {
      const cs = getComputedStyle(document.documentElement);
      return {
        dot: cs.getPropertyValue("--border-strong").trim() || "#3d3530",
        accent: cs.getPropertyValue("--accent").trim() || "#e58a57",
        dark: document.documentElement.getAttribute("data-theme") !== "light",
      };
    }

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas!.width = Math.round(w * dpr);
      canvas!.height = Math.round(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (variant === "graph") {
        const count = Math.round(Math.min(70, (w * h) / 16000));
        nodes = Array.from({ length: count }, () => ({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
        }));
      }
    }

    /** Where the "light" is: the pointer on desktop, a slow drift on touch. */
    function focus(t: number) {
      if (pointer) return pointer;
      if (finePointer) return null;
      const s = t / 1000;
      return { x: w * (0.5 + 0.35 * Math.sin(s * 0.23)), y: h * (0.4 + 0.25 * Math.sin(s * 0.31 + 1)) };
    }

    function drawDots(t: number) {
      const gap = 24;
      const radius = 160;
      const f = focus(t);
      if (f) {
        eased.x += (f.x - eased.x) * 0.12;
        eased.y += (f.y - eased.y) * 0.12;
      }
      for (let y = gap / 2; y < h; y += gap) {
        for (let x = gap / 2; x < w; x += gap) {
          const dx = x - eased.x;
          const dy = y - eased.y;
          const d = Math.hypot(dx, dy);
          const k = f ? Math.max(0, 1 - d / radius) : 0;
          // Dots near the pointer brighten and drift slightly outward.
          const push = k * k * 6;
          const px = x + (d ? (dx / d) * push : 0);
          const py = y + (d ? (dy / d) * push : 0);
          // Capped well below full strength so text over the grid stays easy to read.
          ctx!.globalAlpha = 0.5 + k * 0.3;
          ctx!.fillStyle = k > 0.02 ? colors.accent : colors.dot;
          ctx!.beginPath();
          ctx!.arc(px, py, 1.1 + k * 0.8, 0, Math.PI * 2);
          ctx!.fill();
        }
      }
      ctx!.globalAlpha = 1;
    }

    function drawGraph(t: number) {
      const link = 120;
      const f = focus(t);
      for (const n of nodes) {
        if (!reduced) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > w) n.vx *= -1;
          if (n.y < 0 || n.y > h) n.vy *= -1;
        }
      }
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < link) {
            const near = f ? Math.max(0, 1 - Math.hypot((a.x + b.x) / 2 - f.x, (a.y + b.y) / 2 - f.y) / 180) : 0;
            ctx!.globalAlpha = (1 - d / link) * (0.35 + near * 0.6);
            ctx!.strokeStyle = near > 0.05 ? colors.accent : colors.dot;
            ctx!.lineWidth = 1;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }
      }
      for (const n of nodes) {
        const near = f ? Math.max(0, 1 - Math.hypot(n.x - f.x, n.y - f.y) / 180) : 0;
        ctx!.globalAlpha = 0.6 + near * 0.4;
        ctx!.fillStyle = near > 0.05 ? colors.accent : colors.dot;
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, 1.6 + near * 1.4, 0, Math.PI * 2);
        ctx!.fill();
      }
      ctx!.globalAlpha = 1;
    }

    function drawGlow(t: number) {
      const f = focus(t) ?? { x: w * 0.7, y: h * 0.3 };
      eased.x = eased.x < -1000 ? f.x : eased.x + (f.x - eased.x) * 0.08;
      eased.y = eased.y < -1000 ? f.y : eased.y + (f.y - eased.y) * 0.08;
      const r = Math.max(w, h) * 0.45;
      const g = ctx!.createRadialGradient(eased.x, eased.y, 0, eased.x, eased.y, r);
      g.addColorStop(0, hexToRgba(colors.accent, colors.dark ? 0.16 : 0.12));
      g.addColorStop(1, hexToRgba(colors.accent, 0));
      ctx!.fillStyle = g;
      ctx!.fillRect(0, 0, w, h);
    }

    function frame(now: number) {
      ctx!.clearRect(0, 0, w, h);
      const t = now - start;
      if (variant === "dots") drawDots(t);
      else if (variant === "graph") drawGraph(t);
      else drawGlow(t);
      if (!reduced && visible && !document.hidden) raf = requestAnimationFrame(frame);
    }

    function restart() {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(frame);
    }

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      pointer = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height ? { x, y } : null;
      if (reduced) restart();
    };
    const onLeave = () => {
      pointer = null;
    };

    resize();
    restart();

    const ro = new ResizeObserver(() => {
      resize();
      restart();
    });
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) restart();
    });
    io.observe(canvas);
    const themeObs = new MutationObserver(() => {
      colors = readColors();
      restart();
    });
    themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    const onVisibility = () => !document.hidden && restart();
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      themeObs.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [initial]);

  return <canvas ref={canvasRef} className="hero-bg" aria-hidden="true" />;
}

function hexToRgba(hex: string, alpha: number) {
  const m = hex.replace("#", "").match(/^([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i);
  if (!m) return `rgba(229, 138, 87, ${alpha})`;
  return `rgba(${parseInt(m[1], 16)}, ${parseInt(m[2], 16)}, ${parseInt(m[3], 16)}, ${alpha})`;
}
