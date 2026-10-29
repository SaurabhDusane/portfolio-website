"use client";

import { useEffect, useRef } from "react";
import { cursorRing } from "@/lib/cursor";

/**
 * Site-wide interactive network graph, fixed behind every page. It lives in
 * the root layout, so the same graph carries across navigation.
 *
 * Each theme has its own look:
 * - dark  "night sky": twinkling star-like points with soft halos and a faint
 *   warm glow near the top
 * - light "engineering sketch": hollow ink points and pencil-thin links on a
 *   faint drafting grid
 *
 * Interaction:
 * - the cursor joins the graph: nearby points lean toward it, light up, and
 *   link to it
 * - clicking or tapping empty space sends a signal from the nearest point
 *   that spreads hop by hop along the links, like a multi-hop graph query
 * - toggling the theme sends a wave out from the toggle (see ThemeToggle)
 * - an element can anchor itself to the graph ("bg-anchor" event): thin
 *   accent lines draw from it to its nearest few points while it's active
 * - every so often a small ambient signal fires on its own
 * - points sit at different depths and drift past at different speeds as
 *   you scroll
 *
 * Starts when the browser is idle after load, renders at most ~40 fps,
 * pauses in background tabs, and draws one static frame (no input, no
 * motion) under prefers-reduced-motion. CSS dims it behind the reading column.
 */

const LINK_DISTANCE = 130;
const LINK_DISTANCE_SQ = LINK_DISTANCE * LINK_DISTANCE;
const CURSOR_RADIUS = 170;
const HOP_DELAY = 140; // ms between hops of a signal
const SIGNAL_FADE = 650; // ms a point stays lit after the signal reaches it
const PARALLAX = 0.18; // how far the deepest points move per pixel scrolled
const NUDGE_DISTANCE = 48; // px the graph drifts during a directional page slide
const NUDGE_MS = 700;
const ANCHOR_LINKS = 3; // points an anchored element links to
const ANCHOR_REACH = 460; // px: farthest point an anchor will link to
const ANCHOR_DRAW_MS = 300; // time for the anchor lines to draw out
const FRAME_MS = 24; // ~40 fps cap

type Node = { x: number; y: number; vx: number; vy: number; z: number; phase: number; lit: number };
type Theme = "dark" | "light";

export type SignalDetail = { x: number; y: number; hops?: number };

export default function SiteBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    let last = 0;
    let nextAmbient = 0;
    let theme: Theme = currentTheme();
    let colors = readColors();
    let nodes: Node[] = [];
    // Static per-theme layer (grid or glow), redrawn only on resize/theme change.
    const layer = document.createElement("canvas");
    // Pointer in viewport coordinates; null when outside or not a mouse.
    let pointer: { x: number; y: number } | null = null;
    // Horizontal drift that follows a directional page slide (see SiteHeader).
    let nudgeFrom = 0;
    let nudgeAt = -Infinity;
    // An element (e.g. a Community badge on the About page) that links into the
    // graph while hovered. Its position is re-read every frame, so scrolling is fine.
    let anchorEl: HTMLElement | null = null;
    let anchorAt = 0;

    function currentTheme(): Theme {
      return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
    }

    function readColors() {
      const cs = getComputedStyle(document.documentElement);
      const v = (name: string, fallback: string) => cs.getPropertyValue(name).trim() || fallback;
      return {
        bg: v("--bg", "#12100e"),
        line: v("--text-hint", "#8c8379"),
        star: v("--text-muted", "#aba299"),
        grid: v("--border", "#e6dfd6"),
        gridMajor: v("--border-strong", "#d3c9bd"),
        accent: v("--accent", "#e58a57"),
      };
    }

    function drawLayer() {
      layer.width = Math.round(w * dpr);
      layer.height = Math.round(h * dpr);
      const l = layer.getContext("2d")!;
      l.setTransform(dpr, 0, 0, dpr, 0, 0);
      l.clearRect(0, 0, w, h);
      if (theme === "light") {
        // Drafting grid: fine lines every 32px, slightly stronger every 160px.
        for (let x = 0.5; x < w; x += 32) {
          l.strokeStyle = Math.round(x - 0.5) % 160 === 0 ? colors.gridMajor : colors.grid;
          l.globalAlpha = Math.round(x - 0.5) % 160 === 0 ? 0.42 : 0.3;
          l.beginPath();
          l.moveTo(x, 0);
          l.lineTo(x, h);
          l.stroke();
        }
        for (let y = 0.5; y < h; y += 32) {
          l.strokeStyle = Math.round(y - 0.5) % 160 === 0 ? colors.gridMajor : colors.grid;
          l.globalAlpha = Math.round(y - 0.5) % 160 === 0 ? 0.42 : 0.3;
          l.beginPath();
          l.moveTo(0, y);
          l.lineTo(w, y);
          l.stroke();
        }
      } else {
        // Night sky: a faint warm glow near the top.
        const g = l.createRadialGradient(w * 0.5, -h * 0.15, 0, w * 0.5, -h * 0.15, Math.max(w, h) * 0.8);
        g.addColorStop(0, rgba(colors.accent, 0.1));
        g.addColorStop(1, rgba(colors.accent, 0));
        l.fillStyle = g;
        l.fillRect(0, 0, w, h);
      }
      l.globalAlpha = 1;
    }

    function spawn(): Node {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.06 + Math.random() * 0.12;
      return {
        x: Math.random() * w,
        y: Math.random() * (h + 40) - 20,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        z: 0.3 + Math.random() * 0.7,
        phase: Math.random() * Math.PI * 2,
        lit: -Infinity,
      };
    }

    function resize() {
      const first = w === 0;
      const sx = first ? 1 : window.innerWidth / w;
      w = window.innerWidth;
      h = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.round(w * dpr);
      canvas!.height = Math.round(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      const target = Math.round(Math.min(120, Math.max(42, (w * h) / 10000)));
      if (first) {
        nodes = Array.from({ length: target }, spawn);
      } else {
        for (const n of nodes) n.x *= sx;
        while (nodes.length < target) nodes.push(spawn());
        nodes.length = target;
      }
      drawLayer();
    }

    /** Screen position of a node: scroll parallax by depth, wrapped, then pulled toward the cursor. */
    /** Current drift offset: starts at nudgeFrom and eases out to 0. */
    function nudgeOffset() {
      const k = Math.min(1, (performance.now() - nudgeAt) / NUDGE_MS);
      return k >= 1 ? 0 : nudgeFrom * Math.pow(1 - k, 3);
    }

    /** The cursor's point in the graph: the cursor ring's centre when it's shown, else the raw pointer. */
    function cursorPoint() {
      if (!pointer) return null;
      return cursorRing.active ? { x: cursorRing.x, y: cursorRing.y } : pointer;
    }

    function project(n: Node, scrollY: number, drift = nudgeOffset(), cur = cursorPoint()) {
      const span = h + 40;
      const y = ((((n.y - scrollY * PARALLAX * n.z + 20) % span) + span) % span) - 20;
      // Nearer points (higher z) drift further, like the scroll parallax.
      let x = n.x + drift * (0.4 + n.z * 0.6);
      let py = y;
      let near = 0;
      if (cur && !anchorEl) {
        const dx = cur.x - x;
        const dy = cur.y - y;
        const d = Math.hypot(dx, dy);
        near = Math.max(0, 1 - d / CURSOR_RADIUS);
        const pull = near * near * 18;
        if (d) {
          x += (dx / d) * pull;
          py += (dy / d) * pull;
        }
      }
      return { x, y: py, near };
    }

    function glow(n: Node, t: number) {
      const age = t - n.lit;
      return age >= 0 && age < SIGNAL_FADE ? 1 - age / SIGNAL_FADE : 0;
    }

    function frame(t: number) {
      if (!reduced) raf = requestAnimationFrame(frame);
      if (!reduced && t - last < FRAME_MS) return;
      const dt = last ? Math.min(3, (t - last) / 16.7) : 1;
      last = t;

      if (!reduced) {
        for (const n of nodes) {
          n.x += n.vx * dt;
          n.y += n.vy * dt;
          if (n.x < -20) n.x = w + 20;
          else if (n.x > w + 20) n.x = -20;
        }
        if (t > nextAmbient) {
          if (nextAmbient) {
            const n = nodes[Math.floor(Math.random() * nodes.length)];
            const p = project(n, window.scrollY);
            sendSignal(p.x, p.y, 4);
          }
          nextAmbient = t + 6000 + Math.random() * 6000;
        }
      }

      ctx!.clearRect(0, 0, w, h);
      ctx!.drawImage(layer, 0, 0, w, h);

      const scrollY = reduced ? 0 : window.scrollY;
      const drift = reduced ? 0 : nudgeOffset();
      const pos = nodes.map((n) => project(n, scrollY, drift));
      const light = theme === "light";

      // Links between neighbours
      ctx!.lineWidth = light ? 0.8 : 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = pos[i];
          const b = pos[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > LINK_DISTANCE_SQ) continue;
          const base = 1 - Math.sqrt(d2) / LINK_DISTANCE;
          const depth = (nodes[i].z + nodes[j].z) / 2;
          const hot = Math.max((a.near + b.near) / 2, Math.min(glow(nodes[i], t), glow(nodes[j], t)));
          ctx!.globalAlpha = base * (light ? 0.38 : 0.3) * (0.5 + depth * 0.5) + base * hot * 0.6;
          ctx!.strokeStyle = hot > 0.08 ? colors.accent : colors.line;
          ctx!.beginPath();
          ctx!.moveTo(a.x, a.y);
          ctx!.lineTo(b.x, b.y);
          ctx!.stroke();
        }
      }

      // An anchored element draws thin lines out to its nearest few points,
      // favouring points to its left (toward the margin, where the graph is
      // shown at full strength). Lines grow from the element over ANCHOR_DRAW_MS.
      if (anchorEl) {
        const r = anchorEl.getBoundingClientRect();
        const ax = r.left + r.width / 2;
        const ay = r.top + r.height / 2;
        const grow = Math.min(1, (t - anchorAt) / ANCHOR_DRAW_MS);
        const k = 1 - Math.pow(1 - grow, 3);
        const targets = pos
          .map((p) => ({ p, d: Math.hypot(p.x - ax, p.y - ay) }))
          .filter(({ d }) => d < ANCHOR_REACH)
          .sort((a, b) => a.d + (a.p.x > ax ? 220 : 0) - (b.d + (b.p.x > ax ? 220 : 0)))
          .slice(0, ANCHOR_LINKS);
        ctx!.strokeStyle = colors.accent;
        ctx!.fillStyle = colors.accent;
        ctx!.lineWidth = 1;
        for (const { p } of targets) {
          ctx!.globalAlpha = 0.9;
          ctx!.beginPath();
          ctx!.moveTo(ax, ay);
          ctx!.lineTo(ax + (p.x - ax) * k, ay + (p.y - ay) * k);
          ctx!.stroke();
          if (grow >= 1) {
            ctx!.beginPath();
            ctx!.arc(p.x, p.y, 3.2, 0, Math.PI * 2);
            ctx!.fill();
          }
        }
      }

      // The cursor's own links into the graph (skipped while an element is
      // anchored, so the two effects don't pile up)
      const cur = cursorPoint();
      if (cur && !anchorEl) {
        ctx!.strokeStyle = colors.accent;
        for (const p of pos) {
          if (p.near <= 0) continue;
          ctx!.globalAlpha = p.near * 0.7;
          ctx!.beginPath();
          ctx!.moveTo(cur.x, cur.y);
          ctx!.lineTo(p.x, p.y);
          ctx!.stroke();
        }
      }

      // Points
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const p = pos[i];
        const g = glow(n, t);
        const hot = Math.max(p.near, g);
        const r = (1.4 + n.z * 1.2) + hot * 1.8;
        if (light) {
          // Hollow ink ring; filled with accent when active.
          ctx!.globalAlpha = 0.55 + n.z * 0.35 + hot * 0.1;
          ctx!.fillStyle = hot > 0.08 ? colors.accent : colors.bg;
          ctx!.strokeStyle = hot > 0.08 ? colors.accent : colors.line;
          ctx!.lineWidth = 1;
          ctx!.beginPath();
          ctx!.arc(p.x, p.y, r + 0.4, 0, Math.PI * 2);
          ctx!.fill();
          ctx!.stroke();
          if (g > 0) {
            // Expanding ink ripple while a signal passes through
            ctx!.globalAlpha = g * 0.5;
            ctx!.beginPath();
            ctx!.arc(p.x, p.y, r + 3 + (1 - g) * 12, 0, Math.PI * 2);
            ctx!.stroke();
          }
        } else {
          // Twinkling star with a soft halo.
          const twinkle = reduced ? 0.8 : 0.65 + 0.35 * Math.sin(t * 0.0018 + n.phase);
          ctx!.globalAlpha = (0.35 + n.z * 0.45) * twinkle + hot * 0.4;
          ctx!.fillStyle = hot > 0.08 ? colors.accent : colors.star;
          ctx!.beginPath();
          ctx!.arc(p.x, p.y, r, 0, Math.PI * 2);
          ctx!.fill();
          const halo = Math.max(g, p.near * 0.6, n.z > 0.85 ? 0.25 * twinkle : 0);
          if (halo > 0) {
            ctx!.globalAlpha = halo * 0.22;
            ctx!.beginPath();
            ctx!.arc(p.x, p.y, r + 4 + g * (1 - g) * 16, 0, Math.PI * 2);
            ctx!.fill();
          }
        }
      }
      ctx!.globalAlpha = 1;
    }

    function restart() {
      cancelAnimationFrame(raf);
      last = 0;
      raf = requestAnimationFrame(frame);
    }

    /** Send a signal from the point nearest (x, y), spreading breadth-first along links. */
    function sendSignal(x: number, y: number, maxHops = 7) {
      const now = performance.now();
      const pos = nodes.map((n) => project(n, window.scrollY));
      let start = -1;
      let best = Infinity;
      pos.forEach((p, i) => {
        if (p.y < -10 || p.y > h + 10) return;
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
        if (hops[i] >= maxHops) continue;
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
        // Never cut short a signal that is still passing through a point.
        if (hop >= 0 && !(glow(nodes[i], now) > 0.3)) nodes[i].lit = now + hop * HOP_DELAY;
      });
    }

    const onMove = (e: PointerEvent) => {
      pointer = e.pointerType === "mouse" ? { x: e.clientX, y: e.clientY } : null;
    };
    const onLeave = () => {
      pointer = null;
    };
    const onDown = (e: PointerEvent) => {
      // Never compete with real controls.
      if ((e.target as Element).closest("a, button, input, textarea, select, label, [role='button']")) return;
      sendSignal(e.clientX, e.clientY);
    };
    const onNudge = (e: Event) => {
      const dir = (e as CustomEvent<{ dir: number }>).detail?.dir;
      if (!dir) return;
      // Points start offset to the side the page comes from, then glide back,
      // so the graph moves the same way as the sliding content.
      nudgeFrom = dir * NUDGE_DISTANCE;
      nudgeAt = performance.now();
    };
    const onAnchor = (e: Event) => {
      const el = (e as CustomEvent<{ el: HTMLElement | null }>).detail?.el ?? null;
      if (el !== anchorEl) anchorAt = performance.now();
      anchorEl = el;
    };
    const onSignal = (e: Event) => {
      const d = (e as CustomEvent<SignalDetail>).detail;
      if (d) sendSignal(d.x, d.y, d.hops ?? 7);
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
      if (!reduced) {
        window.addEventListener("pointermove", onMove, { passive: true });
        window.addEventListener("pointerdown", onDown, { passive: true });
        window.addEventListener("bg-signal", onSignal);
        window.addEventListener("bg-nudge", onNudge);
        window.addEventListener("bg-anchor", onAnchor);
        document.documentElement.addEventListener("pointerleave", onLeave);
      }
    };
    const idle = window.requestIdleCallback
      ? window.requestIdleCallback(begin, { timeout: 2500 })
      : window.setTimeout(begin, 1200);

    const onResize = () => {
      if (!started) return;
      resize();
      if (reduced) restart();
    };
    window.addEventListener("resize", onResize);
    const themeObs = new MutationObserver(() => {
      theme = currentTheme();
      colors = readColors();
      if (!started) return;
      drawLayer();
      if (reduced) restart();
    });
    themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    const onVisibility = () => {
      if (!started || reduced) return;
      if (document.hidden) cancelAnimationFrame(raf);
      else restart();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
      cancelAnimationFrame(raf);
      themeObs.disconnect();
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("bg-signal", onSignal);
      window.removeEventListener("bg-nudge", onNudge);
      window.removeEventListener("bg-anchor", onAnchor);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="site-bg" aria-hidden="true" />;
}

function rgba(hex: string, alpha: number) {
  const m = hex.replace("#", "").match(/^([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i);
  if (!m) return `rgba(229, 138, 87, ${alpha})`;
  return `rgba(${parseInt(m[1], 16)}, ${parseInt(m[2], 16)}, ${parseInt(m[3], 16)}, ${alpha})`;
}
