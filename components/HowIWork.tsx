"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Play, RotateCcw, Search } from "lucide-react";

/**
 * "How I work": three principles, each shown as a small interactive
 * simulation of a real incident or decision from a project, rather than
 * described in adjectives. Simulations are simplified and labelled as such.
 */

const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ─── 1. Assume the run will die (checkpoint vs. restart) ─────────────────── */

const TOTAL = 10000;
const SPEED = TOTAL / 3000; // filings per ms
const PAUSE = 350;
const INTERRUPTIONS = [
  { at: 3500, label: "WAF block" },
  { at: 7200, label: "rate limit" },
];

type Seg = { kind: "run"; from: number; to: number } | { kind: "stop"; at: number; label: string };

function buildLane(resume: boolean): Seg[] {
  const segs: Seg[] = [];
  let pos = 0;
  for (const i of INTERRUPTIONS) {
    segs.push({ kind: "run", from: pos, to: i.at }, { kind: "stop", at: i.at, label: i.label });
    pos = resume ? i.at : 0;
  }
  segs.push({ kind: "run", from: pos, to: TOTAL });
  return segs;
}

function segMs(s: Seg) {
  return s.kind === "run" ? (s.to - s.from) / SPEED : PAUSE;
}

/** Lane state at `elapsed` ms: progress, current interruption (if any), restarts so far, done. */
function laneAt(segs: Seg[], elapsed: number) {
  let t = elapsed;
  let restarts = 0;
  for (let i = 0; i < segs.length; i++) {
    const s = segs[i];
    const d = segMs(s);
    if (t < d) {
      if (s.kind === "run") return { value: s.from + t * SPEED, stop: null as string | null, restarts, done: false };
      return { value: s.at, stop: s.label, restarts, done: false };
    }
    t -= d;
    const next = segs[i + 1];
    if (s.kind === "stop" && next?.kind === "run" && next.from === 0) restarts++;
  }
  return { value: TOTAL, stop: null, restarts, done: true };
}

const RESTART_LANE = buildLane(false);
const RESUME_LANE = buildLane(true);
const RESTART_MS = RESTART_LANE.reduce((a, s) => a + segMs(s), 0);
const REWORK = INTERRUPTIONS.reduce((a, i) => a + i.at, 0);

function CheckpointDemo() {
  const [elapsed, setElapsed] = useState<number | null>(null);
  const raf = useRef(0);

  const run = () => {
    cancelAnimationFrame(raf.current);
    if (reducedMotion()) {
      setElapsed(RESTART_MS);
      return;
    }
    const start = performance.now();
    const tick = (now: number) => {
      const e = now - start;
      setElapsed(Math.min(e, RESTART_MS));
      if (e < RESTART_MS) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  };
  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const lanes = [
    { name: "Restart from scratch", segs: RESTART_LANE },
    { name: "Checkpoint and resume", segs: RESUME_LANE },
  ];
  const finished = elapsed !== null && elapsed >= RESTART_MS;

  return (
    <div className="lab">
      <div className="flex flex-col gap-5">
        {lanes.map((lane, li) => {
          const s = elapsed === null ? { value: 0, stop: null, restarts: 0, done: false } : laneAt(lane.segs, elapsed);
          return (
            <div key={lane.name}>
              <div className="flex items-baseline justify-between gap-3 text-[14px]">
                <span style={{ color: "var(--text)" }} className="font-medium">
                  {lane.name}
                </span>
                <span className="t-small tabular-nums">
                  {s.stop ? (
                    <span style={{ color: "var(--accent)" }}>{s.stop}{li === 0 ? ", starting over" : ", resuming"}</span>
                  ) : s.done ? (
                    "done"
                  ) : (
                    `${Math.round(s.value).toLocaleString("en-US")} / ${TOTAL.toLocaleString("en-US")}`
                  )}
                </span>
              </div>
              <div className="lab-bar mt-2" aria-hidden="true">
                <div className="lab-bar-fill" data-stopped={s.stop ? "true" : undefined} style={{ width: `${(s.value / TOTAL) * 100}%` }} />
                {INTERRUPTIONS.map((i) => (
                  <span key={i.at} className="lab-bar-mark" style={{ left: `${(i.at / TOTAL) * 100}%` }} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
        <button type="button" className="btn btn-secondary btn-sm" onClick={run}>
          {elapsed === null ? <Play size={14} /> : <RotateCcw size={14} />}
          {elapsed === null ? "Run 10,000 filings" : "Run again"}
        </button>
        <p className="t-small" aria-live="polite">
          {finished
            ? `Two interruptions: starting over re-collected ${REWORK.toLocaleString("en-US")} filings; resuming re-collected none.`
            : "Both runs hit the same two interruptions."}
        </p>
      </div>
    </div>
  );
}

/* ─── 2. Don't trust a green checkmark (verify "success") ─────────────────── */

type Line = { text: string; tone?: "ok" | "bad" | "muted" | "cmd" };

const RUN_LINES: Line[] = [
  { text: "$ run extraction", tone: "cmd" },
  { text: "  parse filings ............ ok", tone: "muted" },
  { text: "  extract entities ......... ok", tone: "muted" },
  { text: "  extract citations ........ ok", tone: "muted" },
  { text: "  write records ............ ok", tone: "muted" },
  { text: "status: SUCCESS", tone: "ok" },
];
const CHECK_LINES: Line[] = [
  { text: "$ inspect records", tone: "cmd" },
  { text: "  citations extracted: 0", tone: "bad" },
  { text: "  reported success, wrote empty fields", tone: "bad" },
  { text: "$ run recovery layer", tone: "cmd" },
  { text: "  re-extract citations ..... repaired", tone: "ok" },
  { text: "  check: citations > 0 ..... ok", tone: "ok" },
];

function VerifyDemo() {
  const [lines, setLines] = useState<Line[]>([]);
  const [stage, setStage] = useState<"idle" | "ran" | "checked">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const play = (add: Line[], next: "ran" | "checked", from: Line[]) => {
    clearTimeout(timer.current);
    if (reducedMotion()) {
      setLines([...from, ...add]);
      setStage(next);
      return;
    }
    let i = 0;
    const step = () => {
      i++;
      setLines([...from, ...add.slice(0, i)]);
      if (i < add.length) timer.current = setTimeout(step, 170);
      else setStage(next);
    };
    step();
  };
  useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <div className="lab">
      <pre className="lab-log" aria-live="polite">
        {lines.length === 0 ? (
          <span className="lab-log-muted">Pipeline idle.</span>
        ) : (
          lines.map((l, i) => (
            <span key={i} className={`lab-log-line lab-log-${l.tone ?? "muted"}`}>
              {l.text}
              {"\n"}
            </span>
          ))
        )}
      </pre>
      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
        {stage === "idle" && (
          <button type="button" className="btn btn-secondary btn-sm" onClick={() => play(RUN_LINES, "ran", [])}>
            <Play size={14} /> Run the pipeline
          </button>
        )}
        {stage === "ran" && (
          <button type="button" className="btn btn-primary btn-sm" onClick={() => play(CHECK_LINES, "checked", RUN_LINES)}>
            <Search size={14} /> Check the output
          </button>
        )}
        {stage === "checked" && (
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => {
              setLines([]);
              setStage("idle");
            }}
          >
            <RotateCcw size={14} /> Reset
          </button>
        )}
        <p className="t-small">
          {stage === "ran"
            ? "Every step says ok. Most dashboards would stop here."
            : stage === "checked"
              ? "The bug never raised an error; only looking at the data caught it."
              : "Simplified from the SEC pipeline."}
        </p>
      </div>
    </div>
  );
}

/* ─── 3. Open the black box first (framework call vs. the loop it hides) ──── */

const TRACE: { tag: string; text: string }[] = [
  { tag: "Thought", text: "I need to multiply two numbers. Use the calculator." },
  { tag: "Action", text: "calculator(17 * 23)" },
  { tag: "Observation", text: "391" },
  { tag: "Thought", text: "That answers the question." },
  { tag: "Answer", text: "391" },
];

function BlackBoxDemo() {
  const [view, setView] = useState<"framework" | "scratch">("framework");
  const [shown, setShown] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  const open = (v: "framework" | "scratch") => {
    setView(v);
    clearInterval(timer.current);
    if (v === "framework") return;
    if (reducedMotion()) {
      setShown(TRACE.length);
      return;
    }
    setShown(0);
    let n = 0;
    timer.current = setInterval(() => {
      n++;
      setShown(n);
      if (n >= TRACE.length) clearInterval(timer.current);
    }, 380);
  };
  useEffect(() => () => clearInterval(timer.current), []);

  return (
    <div className="lab">
      <div role="radiogroup" aria-label="View" className="lab-switch">
        {(["framework", "scratch"] as const).map((v) => (
          <button key={v} type="button" role="radio" aria-checked={view === v} className="lab-switch-btn" onClick={() => open(v)}>
            {v === "framework" ? "With a framework" : "From scratch"}
          </button>
        ))}
      </div>
      {view === "framework" ? (
        <pre className="lab-log mt-4">
          <span className="lab-log-line lab-log-cmd">{'answer = agent.invoke("What is 17 × 23?")\n'}</span>
          <span className="lab-log-line lab-log-ok">{"391\n"}</span>
          <span className="lab-log-line lab-log-muted">{"# Which tool ran? Why? What did it see? The call doesn't say."}</span>
        </pre>
      ) : (
        <ol className="lab-log mt-4 flex flex-col gap-1.5" aria-live="polite">
          {TRACE.slice(0, shown).map((s, i) => (
            <li key={i} className="lab-trace">
              <span className="lab-trace-tag" data-tag={s.tag}>
                {s.tag}
              </span>
              <span>{s.text}</span>
            </li>
          ))}
          {shown < TRACE.length && <li className="lab-log-muted">…</li>}
        </ol>
      )}
      <p className="t-small mt-4">
        {view === "framework"
          ? "Switch views to see the loop the call hides."
          : "Every step is logged, so a wrong answer can be traced to the step that caused it."}
      </p>
    </div>
  );
}

/* ─── Section ─────────────────────────────────────────────────────────────── */

const PRINCIPLES = [
  {
    id: "interruptions",
    title: "Assume the run will die",
    body: "Long jobs get interrupted: blocks, captchas, rate limits, preempted cluster jobs. I design so an interruption costs seconds, not the whole run.",
    demo: <CheckpointDemo />,
    source: { label: "SEC litigation pipeline", href: "/projects/sec-litigation-scraper" },
  },
  {
    id: "verify",
    title: "Don’t trust a green checkmark",
    body: "“Success” is a claim, not a result. I check what actually landed, because the failures that hurt most are the ones that don’t raise an error.",
    demo: <VerifyDemo />,
    source: { label: "SEC litigation pipeline", href: "/projects/sec-litigation-scraper" },
  },
  {
    id: "black-box",
    title: "Open the black box first",
    body: "Before I lean on an abstraction, I build the thing it hides, so I know what it adds, what it costs, and where it breaks.",
    demo: <BlackBoxDemo />,
    source: { label: "miniagent and agent-compare", href: "/projects/miniagent" },
  },
];

export default function HowIWork() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const n = PRINCIPLES.length;
    const to = e.key === "ArrowRight" || e.key === "ArrowDown" ? (i + 1) % n : e.key === "ArrowLeft" || e.key === "ArrowUp" ? (i - 1 + n) % n : null;
    if (to === null) return;
    e.preventDefault();
    setActive(to);
    tabs.current[to]?.focus();
  };

  const p = PRINCIPLES[active];
  return (
    <div className="how">
      <div role="tablist" aria-label="Principles" className="how-tabs">
        {PRINCIPLES.map((pr, i) => (
          <button
            key={pr.id}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`how-tab-${pr.id}`}
            aria-selected={i === active}
            aria-controls={`how-panel-${pr.id}`}
            tabIndex={i === active ? 0 : -1}
            className="how-tab"
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKey(e, i)}
          >
            <span className="how-tab-num tabular-nums">0{i + 1}</span>
            <span>{pr.title}</span>
          </button>
        ))}
      </div>
      <div role="tabpanel" id={`how-panel-${p.id}`} aria-labelledby={`how-tab-${p.id}`} className="how-panel">
        <p className="t-body" style={{ color: "var(--text)" }}>
          {p.body}
        </p>
        <div key={p.id} className="mt-5">
          {p.demo}
        </div>
        <Link href={p.source.href} className="more-link mt-5">
          From: {p.source.label} <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
