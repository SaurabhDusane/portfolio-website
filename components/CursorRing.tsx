"use client";

import { useEffect, useRef } from "react";
import { cursorRing } from "@/lib/cursor";

/** Things the ring reacts to. */
const INTERACTIVE = "a[href], button:not(:disabled), [role='button'], label, summary, select, [data-cursor]";
/** Where the ring steps aside so the text cursor is all you see. */
const TEXT_ENTRY = "input:not([type='radio']):not([type='checkbox']), textarea, [contenteditable='true']";
/** Targets up to this size get wrapped by the ring; bigger ones (whole rows, cards) just make it grow. */
const WRAP_MAX = { w: 320, h: 72 };
const DOT = 22;
const PAD = 5;
const FOLLOW = 0.28;

/**
 * A ring that follows the cursor like a point in the background graph (whose
 * links meet it, via lib/cursor), plus a small label for targets that carry
 * data-cursor="…". The system cursor is never hidden. Small controls are
 * wrapped by the ring; larger ones make it grow. A press sends a pulse.
 * Only for a real mouse, and never under reduced motion.
 */
export default function CursorRing() {
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!ring || !label) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduced.matches) return;

    let px = 0;
    let py = 0;
    let shown = false;
    let target: Element | null = null;
    // Drawn box (centre + size), eased toward the goal each frame.
    const box = { x: 0, y: 0, w: DOT, h: DOT };
    let raf = 0;

    const hide = () => {
      shown = false;
      cursorRing.active = false;
      ring.dataset.state = "hidden";
      label.dataset.show = "false";
    };

    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (!shown) return;
      let gx = px;
      let gy = py;
      let gw = DOT;
      let gh = DOT;
      let radius = "999px";
      let state = "idle";
      if (target && target.isConnected) {
        const r = target.getBoundingClientRect();
        if (r.width <= WRAP_MAX.w && r.height <= WRAP_MAX.h) {
          gx = r.left + r.width / 2;
          gy = r.top + r.height / 2;
          gw = r.width + PAD * 2;
          gh = r.height + PAD * 2;
          const br = parseFloat(getComputedStyle(target).borderTopLeftRadius) || 0;
          radius = `${Math.min(br + PAD, gh / 2)}px`;
          state = "wrap";
        } else {
          gw = gh = DOT * 1.8;
          state = "hover";
        }
      }
      box.x += (gx - box.x) * FOLLOW;
      box.y += (gy - box.y) * FOLLOW;
      box.w += (gw - box.w) * FOLLOW;
      box.h += (gh - box.h) * FOLLOW;
      ring.style.transform = `translate3d(${box.x - box.w / 2}px, ${box.y - box.h / 2}px, 0)`;
      ring.style.width = `${box.w}px`;
      ring.style.height = `${box.h}px`;
      ring.style.borderRadius = radius;
      ring.dataset.state = state;
      cursorRing.x = box.x;
      cursorRing.y = box.y;
      cursorRing.active = true;

      // Label sits just below-right of the pointer, kept inside the window.
      if (label.dataset.show === "true") {
        const lw = label.offsetWidth;
        const lx = Math.min(px + 16, window.innerWidth - lw - 8);
        const ly = Math.min(py + 22, window.innerHeight - label.offsetHeight - 8);
        label.style.transform = `translate3d(${lx}px, ${ly}px, 0)`;
      }
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return hide();
      px = e.clientX;
      py = e.clientY;
      const el = e.target instanceof Element ? e.target : null;
      if (el?.closest(TEXT_ENTRY)) {
        target = null;
        hide();
        return;
      }
      if (!shown) {
        shown = true;
        box.x = px;
        box.y = py;
      }
      target = el?.closest(INTERACTIVE) ?? null;
      const text = el?.closest("[data-cursor]")?.getAttribute("data-cursor");
      if (text) {
        if (label.textContent !== text) label.textContent = text;
        label.dataset.show = "true";
      } else {
        label.dataset.show = "false";
      }
    };

    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || !shown) return;
      ring.classList.remove("cursor-ring-pulse");
      void ring.offsetWidth; // restart the animation
      ring.classList.add("cursor-ring-pulse");
    };

    hide();
    raf = requestAnimationFrame(frame);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    document.documentElement.addEventListener("pointerleave", hide);
    window.addEventListener("blur", hide);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      document.documentElement.removeEventListener("pointerleave", hide);
      window.removeEventListener("blur", hide);
      cursorRing.active = false;
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" data-state="hidden" aria-hidden="true" />
      <div ref={labelRef} className="cursor-label" data-show="false" aria-hidden="true" />
    </>
  );
}
