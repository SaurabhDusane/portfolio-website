"use client";

import { useEffect, useRef } from "react";

/**
 * Interactive network graph behind the home-page intro.
 *
 * - Points drift slowly and link to their neighbours.
 * - The cursor joins the graph: nearby points lean toward it, light up, and
 *   link to it.
 * - Clicking or tapping empty space sends a signal from the nearest point
 *   that spreads hop by hop along the links, like a multi-hop graph query.
 *
 * Starts when the browser is idle after load, and only animates while
 * visible and the tab is focused. Under
 * prefers-reduced-motion it draws one static frame and ignores input.
 * Colors come from the theme tokens, so it follows light/dark mode.
 */

const LINK_DISTANCE = 130;
const LINK_DISTANCE_SQ = LINK_DISTANCE * LINK_DISTANCE;
const CURSOR_RADIUS = 170;
const HOP_DELAY = 140; // ms between hops of a signal
const MAX_HOPS = 7;
const SIGNAL_FADE = 650; // ms a node stays lit after the signal reaches it

type Node = { x: number; y: number; vx: number; vy: number; lit: number };

export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    let colors = readColors();
    let nodes: Node[] = [];
    // Pointer in canvas coordinates; null when outside or not a mouse.
    let pointer: { x: number; y: number } | null = null;

    function readColors() {
      const cs = getComputedStyle(document.documentElement);
      return {
        node: cs.getPropertyValue("--text-hint").trim() || "#8c8379",
        accent: cs.getPropertyValue("--accent").trim() || "#e58a57",
      };
    }

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const first = w === 0;
      const sx = first ? 1 : rect.width / w;
      w = rect.width;
      h = rect.height;
      canvas!.width = Math.round(w * dpr);
      canvas!.height = Math.round(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      const target = Math.round(Math.min(110, Math.max(42, (w * h) / 9000)));
      if (first) {
        nodes = Array.from({ length: target }, () => spawn(Math.random() * w, Math.random() * h));
      } else {
        // Keep the existing graph on resize: rescale positions, then top up or trim.
        for (const n of nodes) n.x *= sx;
        while (nodes.length < target) nodes.push(spawn(Math.random() * w, Math.random() * h));
        nodes.length = target;
      }
    }

    function spawn(x: number, y: number): Node {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.08 + Math.random() * 0.14;
      return { x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, lit: -Infinity };
    }

    /** Where a node is drawn: its position, pulled a little toward the cursor. */
    function drawn(n: Node) {
      if (!pointer) return { x: n.x, y: n.y, near: 0 };
      const dx = pointer.x - n.x;
      const dy = pointer.y - n.y;
      const d = Math.hypot(dx, dy);
      const near = Math.max(0, 1 - d / CURSOR_RADIUS);
      const pull = near * near * 18;
      return { x: n.x + (d ? (dx / d) * pull : 0), y: n.y + (d ? (dy / d) * pull : 0), near };
    }

    /** Signal brightness for a node at time t (0..1). */
    function glow(n: Node, t: number) {
      const age = t - n.lit;
      return age >= 0 && age < SIGNAL_FADE ? 1 - age / SIGNAL_FADE : 0;
    }

    function frame(t: number) {
      ctx!.clearRect(0, 0, w, h);

      if (!reduced) {
        for (const n of nodes) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < -20) n.x = w + 20;
          else if (n.x > w + 20) n.x = -20;
          if (n.y < -20) n.y = h + 20;
          else if (n.y > h + 20) n.y = -20;
        }
      }

      const pos = nodes.map(drawn);

      // Links between neighbours
      ctx!.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = pos[i];
          const b = pos[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > LINK_DISTANCE_SQ) continue;
          const base = 1 - Math.sqrt(d2) / LINK_DISTANCE;
          const hot = Math.max((a.near + b.near) / 2, Math.min(glow(nodes[i], t), glow(nodes[j], t)));
          ctx!.globalAlpha = base * (0.32 + hot * 0.6);
          ctx!.strokeStyle = hot > 0.08 ? colors.accent : colors.node;
          ctx!.beginPath();
          ctx!.moveTo(a.x, a.y);
          ctx!.lineTo(b.x, b.y);
          ctx!.stroke();
        }
      }

      // The cursor's own links into the graph
      if (pointer) {
        for (const p of pos) {
          if (p.near <= 0) continue;
          ctx!.globalAlpha = p.near * 0.7;
          ctx!.strokeStyle = colors.accent;
          ctx!.beginPath();
          ctx!.moveTo(pointer.x, pointer.y);
          ctx!.lineTo(p.x, p.y);
          ctx!.stroke();
        }
      }

      // Points
      for (let i = 0; i < nodes.length; i++) {
        const p = pos[i];
        const g = glow(nodes[i], t);
        const hot = Math.max(p.near, g);
        ctx!.globalAlpha = 0.7 + hot * 0.3;
        ctx!.fillStyle = hot > 0.08 ? colors.accent : colors.node;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, 1.8 + hot * 1.8, 0, Math.PI * 2);
        ctx!.fill();
        if (g > 0) {
          // Soft halo while a signal passes through
          ctx!.globalAlpha = g * 0.25;
          ctx!.beginPath();
          ctx!.arc(p.x, p.y, 6 + (1 - g) * 10, 0, Math.PI * 2);
          ctx!.fill();
        }
      }
      ctx!.globalAlpha = 1;

      if (!reduced && visible && !document.hidden) raf = requestAnimationFrame(frame);
    }

    function restart() {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(frame);
    }

    /** Send a signal from the node nearest (x, y), spreading breadth-first along links. */
    function sendSignal(x: number, y: number) {
      const now = performance.now();
      const pos = nodes.map(drawn);
      let start = -1;
      let best = Infinity;
      pos.forEach((p, i) => {
        const d = Math.hypot(p.x - x, p.y - y);
        if (d < best) {
          best = d;
          start = i;
        }
      });
      if (start < 0) return;
      const hops = new Array(nodes.length).fill(-1);
      hops[start] = 0;
      const queue = [start];
      while (queue.length) {
        const i = queue.shift()!;
        if (hops[i] >= MAX_HOPS) continue;
        for (let j = 0; j < nodes.length; j++) {
          if (hops[j] !== -1) continue;
          const dx = pos[i].x - pos[j].x;
          const dy = pos[i].y - pos[j].y;
          if (dx * dx + dy * dy <= LINK_DISTANCE_SQ) {
            hops[j] = hops[i] + 1;
            queue.push(j);
          }
        }
      }
      hops.forEach((hop, i) => {
        if (hop >= 0) nodes[i].lit = now + hop * HOP_DELAY;
      });
    }

    function toCanvas(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      return x >= 0 && y >= 0 && x <= rect.width && y <= rect.height ? { x, y } : null;
    }

    const onMove = (e: PointerEvent) => {
      pointer = e.pointerType === "mouse" ? toCanvas(e) : null;
    };
    const onLeave = () => {
      pointer = null;
    };
    const onDown = (e: PointerEvent) => {
      if (!started) return;
      // Never compete with real controls or text selection.
      if ((e.target as Element).closest("a, button, input, textarea, select, label, [role='button']")) return;
      const p = toCanvas(e);
      if (p) sendSignal(p.x, p.y);
    };

    // Start once the browser is idle after load, so the animation never
    // competes with the page becoming interactive; the canvas fades in then.
    let started = false;
    const begin = () => {
      if (started) return;
      started = true;
      resize();
      restart();
      canvas.dataset.ready = "true";
    };
    const idle = window.requestIdleCallback
      ? window.requestIdleCallback(begin, { timeout: 2500 })
      : window.setTimeout(begin, 1200);

    const ro = new ResizeObserver(() => {
      if (!started) return;
      resize();
      restart();
    });
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && started) restart();
    });
    io.observe(canvas);
    const themeObs = new MutationObserver(() => {
      colors = readColors();
      if (started) restart();
    });
    themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    const onVisibility = () => started && !document.hidden && restart();
    document.addEventListener("visibilitychange", onVisibility);
    if (!reduced) {
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerdown", onDown, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
    }

    return () => {
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      themeObs.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-bg" aria-hidden="true" />;
}
