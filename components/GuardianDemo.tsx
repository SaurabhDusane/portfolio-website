"use client";

import { useEffect, useState } from "react";
import { RotateCcw } from "lucide-react";

/**
 * A playable version of Guardian's demo pipeline (README, "Walkthrough: heavy
 * corruption in one block"). Every number comes from that walkthrough; nothing
 * is computed here. Step through: clean run, corrupt one stage, replay it,
 * refresh the stage below.
 */

type BlockId = "b1" | "b2" | "b3" | "b4" | "b5" | "b6" | "b7" | "b8";
type Status = "pass" | "rollback" | "replayed" | "idle";

interface BlockState {
  status: Status;
  /** Rows promoted to the new snapshot. */
  out?: number;
  /** Rows sent to quarantine by this run. */
  q?: number;
  note?: string;
}

interface Step {
  id: string;
  button: string;
  title: string;
  text: string;
  blocks: Record<BlockId, BlockState>;
  /** Edges carrying data in this step, as "from-to". */
  active: string[];
  fallback?: boolean;
  log: string[];
}

const NAMES: Record<BlockId, string> = {
  b1: "ingest",
  b2: "parse",
  b3: "standardize",
  b4: "clean",
  b5: "normalize",
  b6: "enrich",
  b7: "customers",
  b8: "aggregate",
};

type Layout = "wide" | "tall";

/** Node centres. "wide" reads left to right; "tall" (phones) top to bottom, so nothing needs scrolling. */
const LAYOUTS: Record<Layout, { view: string; pos: Record<BlockId, [number, number]> }> = {
  wide: {
    view: "0 0 720 240",
    pos: {
      b1: [52, 130],
      b2: [148, 130],
      b3: [244, 130],
      b4: [340, 130],
      b5: [436, 130],
      b6: [552, 70],
      b7: [552, 190],
      b8: [668, 70],
    },
  },
  tall: {
    view: "0 0 340 560",
    pos: {
      b1: [130, 35],
      b2: [130, 105],
      b3: [130, 175],
      b4: [130, 245],
      b5: [130, 315],
      b6: [130, 405],
      b7: [270, 315],
      b8: [130, 505],
    },
  },
};

const EDGES: [BlockId, BlockId][] = [
  ["b1", "b2"],
  ["b2", "b3"],
  ["b3", "b4"],
  ["b4", "b5"],
  ["b5", "b6"],
  ["b5", "b7"],
  ["b6", "b8"],
];

const MAIN = ["b1-b2", "b2-b3", "b3-b4", "b4-b5", "b5-b7"];
const UPSTREAM: Pick<Record<BlockId, BlockState>, "b1" | "b2" | "b3" | "b4" | "b5" | "b7"> = {
  b1: { status: "pass", out: 498, q: 2 },
  b2: { status: "pass", out: 475, q: 23 },
  b3: { status: "pass", out: 462, q: 13 },
  b4: { status: "pass", out: 443, q: 19 },
  b5: { status: "pass", out: 443 },
  b7: { status: "pass", out: 115 },
};
const IDLE = { status: "idle" } as const;

const STEPS: Step[] = [
  {
    id: "start",
    button: "Run the pipeline",
    title: "A pipeline of eight stages",
    text: "Messy e-commerce orders go in; daily revenue by region and customer segment, and a per-customer summary, come out. The dashed line is a declared fallback: if enrich breaks, aggregate may read normalize's output through an adapter.",
    blocks: { b1: IDLE, b2: IDLE, b3: IDLE, b4: IDLE, b5: IDLE, b6: IDLE, b7: IDLE, b8: IDLE },
    active: [],
    log: [],
  },
  {
    id: "clean",
    button: "Corrupt enrich",
    title: "Run r1: everything passes",
    text: "The raw data is messy on purpose: 57 bad rows are quarantined in the first four stages, but each stage stays under its threshold, so every stage passes and promotes a snapshot.",
    blocks: { ...UPSTREAM, b6: { status: "pass", out: 443 }, b8: { status: "pass", out: 130 } },
    active: [...MAIN, "b5-b6", "b6-b8"],
    log: ["run r1: 8 blocks, 57 rows quarantined"],
  },
  {
    id: "corrupt",
    button: "Fix and replay enrich",
    title: "Run r2: enrich goes bad",
    text: "A fault corrupts the region and segment columns in half of enrich's output, far past its 10% threshold. Nothing is promoted: enrich rolls back to r1, all 443 rows are kept in quarantine, and aggregate reroutes through the fallback so revenue stays current. Only the segment breakdown is lost (98 rows instead of 130). Customers doesn't depend on enrich and is untouched.",
    blocks: {
      ...UPSTREAM,
      b6: { status: "rollback", out: 0, q: 443, note: "rolled back to r1" },
      b8: { status: "pass", out: 98, note: "via fallback" },
    },
    active: [...MAIN],
    fallback: true,
    log: [
      "ROLLBACK b6_enrich: bad-row fraction 0.5011 exceeds threshold 0.1",
      "QUARANTINE b6_enrich: 443 rows (222 region:isin, 221 rollback)",
      "REROUTE b8_aggregate: reads b5_normalize through b5_to_b6_shape",
    ],
  },
  {
    id: "replay",
    button: "Refresh aggregate",
    title: "Replay: enrich recovers",
    text: "With the stage fixed, replay re-runs it on its 443 quarantined rows. All of them pass and are upserted by order_id into enrich's last good snapshot, so there are 443 rows, not 886. The records stay in quarantine, marked replayed. A second replay finds nothing to do.",
    blocks: {
      ...UPSTREAM,
      b6: { status: "replayed", out: 443, note: "replayed 443" },
      b8: { status: "pass", out: 98, note: "still on fallback" },
    },
    active: [],
    fallback: true,
    log: ["replay b6_enrich: replayed 443, still failing 0, upserted into new last-good snapshot"],
  },
  {
    id: "refresh",
    button: "Start over",
    title: "Run r3: back to normal",
    text: "Re-running only aggregate reads the recovered enrich snapshot. The result is identical to the clean run: the same 130 rows with the same values. No row was lost at any point.",
    blocks: {
      ...UPSTREAM,
      b6: { status: "pass", out: 443, note: "healthy" },
      b8: { status: "pass", out: 130 },
    },
    active: ["b6-b8"],
    log: ["run r3: b8_aggregate reads b6_enrich@replay, 130 rows, 0 quarantined"],
  },
];

const W = 84;
const H = 46;

/** Where an edge leaves `a` and enters `b`: sides for mostly-horizontal edges, top/bottom otherwise. */
function edgePoints([x1, y1]: [number, number], [x2, y2]: [number, number]) {
  if (Math.abs(x2 - x1) >= Math.abs(y2 - y1)) {
    const d = Math.sign(x2 - x1);
    return { x1: x1 + (d * W) / 2, y1, x2: x2 - (d * W) / 2, y2 };
  }
  const d = Math.sign(y2 - y1);
  return { x1, y1: y1 + (d * H) / 2, x2, y2: y2 - (d * H) / 2 };
}

function StatusWord({ s }: { s: Status }) {
  if (s === "idle") return null;
  return <>{s === "rollback" ? "ROLLBACK" : s === "replayed" ? "REPLAYED" : "PASS"}</>;
}

export default function GuardianDemo() {
  const [i, setI] = useState(0);
  const [log, setLog] = useState<string[]>([]);
  const [layout, setLayout] = useState<Layout>("wide");
  const step = STEPS[i];
  const { view, pos: POS } = LAYOUTS[layout];
  const tall = layout === "tall";

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 600px)");
    const apply = () => setLayout(mq.matches ? "tall" : "wide");
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const next = () => {
    const n = (i + 1) % STEPS.length;
    setI(n);
    setLog((prev) => (n === 0 ? [] : [...prev, ...STEPS[n].log]));
  };
  const reset = () => {
    setI(0);
    setLog([]);
  };

  return (
    <div className="gd">
      <div className="gd-head">
        <div>
          <p className="t-small">
            Step {i + 1} of {STEPS.length}
          </p>
          <h3 className="t-h3 mt-1">{step.title}</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" className="btn btn-primary btn-sm" onClick={next}>
            {step.button}
          </button>
          {i > 0 && (
            <button type="button" className="btn btn-secondary btn-sm" onClick={reset} aria-label="Reset the demo">
              <RotateCcw size={14} aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      <p className="t-body mt-3" aria-live="polite">
        {step.text}
      </p>

      <div className="gd-canvas mt-5" data-layout={layout}>
        <svg viewBox={view} role="img" aria-label={`Pipeline diagram: ${step.title}`}>
          {EDGES.map(([a, b]) => {
            const { x1, y1, x2, y2 } = edgePoints(POS[a], POS[b]);
            const on = step.active.includes(`${a}-${b}`);
            const cut = step.id === "corrupt" && a === "b6";
            return (
              <line
                key={`${a}-${b}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                className="gd-edge"
                data-on={on ? "true" : undefined}
                data-cut={cut ? "true" : undefined}
              />
            );
          })}
          {/* Declared fallback: normalize → aggregate through an adapter */}
          <path
            d={
              tall
                ? `M ${POS.b5[0] - W / 2} ${POS.b5[1]} C 20 ${POS.b5[1] + 30}, 20 ${POS.b8[1] - 30}, ${POS.b8[0] - W / 2} ${POS.b8[1]}`
                : `M ${POS.b5[0]} ${POS.b5[1] - H / 2} C ${POS.b5[0] + 40} 8, ${POS.b8[0] - 20} 8, ${POS.b8[0]} ${POS.b8[1] - H / 2}`
            }
            className="gd-edge gd-fallback"
            data-on={step.fallback ? "true" : undefined}
          />
          <text
            x={tall ? 22 : (POS.b5[0] + POS.b8[0]) / 2 + 10}
            y={tall ? (POS.b5[1] + POS.b8[1]) / 2 : 22}
            transform={tall ? `rotate(-90 22 ${(POS.b5[1] + POS.b8[1]) / 2})` : undefined}
            className="gd-edge-label"
          >
            fallback (adapter)
          </text>

          {(Object.keys(POS) as BlockId[]).map((id) => {
            const [x, y] = POS[id];
            const b = step.blocks[id];
            return (
              <g key={id} className="gd-node" data-status={b.status} transform={`translate(${x - W / 2} ${y - H / 2})`}>
                <rect width={W} height={H} rx={10} />
                <text x={W / 2} y={17} className="gd-name">
                  {NAMES[id]}
                </text>
                <text x={W / 2} y={34} className="gd-meta">
                  {b.status === "idle" ? id : (
                    <>
                      <StatusWord s={b.status} /> · {b.out}
                    </>
                  )}
                </text>
                {/* Wide: notes under the stage. Tall: to its right, clear of the edge below. */}
                {b.q ? (
                  <text x={tall ? W + 8 : W / 2} y={tall ? 19 : H + 14} className="gd-q" data-side={tall ? "right" : undefined}>
                    {b.q} quarantined
                  </text>
                ) : null}
                {b.note ? (
                  <text
                    x={tall ? W + 8 : W / 2}
                    y={tall ? (b.q ? 34 : 27) : b.q ? H + 28 : H + 14}
                    className="gd-note"
                    data-side={tall ? "right" : undefined}
                  >
                    {b.note}
                  </text>
                ) : null}
              </g>
            );
          })}
        </svg>
      </div>
      <p className="t-small mt-2">Each stage shows its outcome and the rows it promoted.</p>

      {log.length > 0 && (
        <ol className="gd-log mt-4" aria-label="Event log">
          {log.map((l, k) => (
            <li key={k}>{l}</li>
          ))}
        </ol>
      )}
    </div>
  );
}
