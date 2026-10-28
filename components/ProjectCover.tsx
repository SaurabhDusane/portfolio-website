/**
 * Generated cover art for a project: a small network graph seeded from the
 * project's slug, so every project gets its own stable image without any
 * image files. One path through the graph is drawn in the accent color.
 *
 * Pure SVG rendered on the server. Colors come from CSS (see .cover-* in
 * globals.css), so it switches between the dark "night sky" and the light
 * "engineering sketch" looks with the theme, with no JavaScript.
 */

const W = 640;
const H = 360;

function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Small deterministic PRNG (mulberry32). */
function rng(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface Graph {
  nodes: { x: number; y: number; r: number }[];
  edges: [number, number][];
  path: number[];
}

const cache = new Map<string, Graph>();

function buildGraph(slug: string): Graph {
  const hit = cache.get(slug);
  if (hit) return hit;
  const rand = rng(hash(slug));
  // Jittered grid keeps points spread out and never overlapping.
  const cols = 6;
  const rows = 4;
  const nodes: Graph["nodes"] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (rand() < 0.18) continue;
      nodes.push({
        x: ((c + 0.5 + (rand() - 0.5) * 0.7) / cols) * W,
        y: ((r + 0.5 + (rand() - 0.5) * 0.7) / rows) * H,
        r: 5 + rand() * 5,
      });
    }
  }
  // Link each point to its two nearest neighbours.
  const key = (a: number, b: number) => (a < b ? `${a}-${b}` : `${b}-${a}`);
  const seen = new Set<string>();
  const edges: [number, number][] = [];
  nodes.forEach((n, i) => {
    nodes
      .map((m, j) => ({ j, d: Math.hypot(m.x - n.x, m.y - n.y) }))
      .filter((o) => o.j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, 2)
      .forEach(({ j }) => {
        if (!seen.has(key(i, j))) {
          seen.add(key(i, j));
          edges.push([i, j]);
        }
      });
  });
  // Accent path: walk from the left-most point, always to the nearest unvisited point to its right.
  const path: number[] = [];
  let cur = nodes.reduce((best, n, i) => (n.x < nodes[best].x ? i : best), 0);
  path.push(cur);
  for (let step = 0; step < 4; step++) {
    const next = edges
      .filter(([a, b]) => a === cur || b === cur)
      .map(([a, b]) => (a === cur ? b : a))
      .filter((j) => !path.includes(j) && nodes[j].x > nodes[cur].x - 20)
      .sort((a, b) => nodes[a].x - nodes[b].x)[0];
    if (next === undefined) break;
    path.push(next);
    cur = next;
  }
  const g = { nodes, edges, path };
  cache.set(slug, g);
  return g;
}

export default function ProjectCover({ slug, variant = "cover" }: { slug: string; variant?: "cover" | "thumb" }) {
  const { nodes, edges, path } = buildGraph(slug);
  const onPath = new Set(path);
  const pathEdges = new Set(path.slice(1).map((n, i) => `${Math.min(n, path[i])}-${Math.max(n, path[i])}`));
  const thumb = variant === "thumb";
  const id = `cover-${slug}-${variant}`;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={`cover cover-${variant}`}
      role="img"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id={`${id}-grid`} width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M 32 0 L 0 0 0 32" className="cover-grid" />
        </pattern>
        <radialGradient id={`${id}-glow`} cx="50%" cy="0%" r="90%">
          <stop offset="0%" className="cover-glow-from" />
          <stop offset="100%" className="cover-glow-to" />
        </radialGradient>
      </defs>
      <rect width={W} height={H} className="cover-bg" />
      <rect width={W} height={H} fill={`url(#${id}-grid)`} className="cover-grid-layer" />
      <rect width={W} height={H} fill={`url(#${id}-glow)`} className="cover-glow-layer" />
      {edges.map(([a, b]) => {
        const hot = pathEdges.has(`${Math.min(a, b)}-${Math.max(a, b)}`);
        return (
          <line
            key={`${a}-${b}`}
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
            className={hot ? "cover-edge cover-edge-hot" : "cover-edge"}
            strokeWidth={thumb ? 4 : 1.5}
          />
        );
      })}
      {nodes.map((n, i) => (
        <circle
          key={i}
          cx={n.x}
          cy={n.y}
          r={thumb ? n.r * 1.8 : n.r}
          className={onPath.has(i) ? "cover-node cover-node-hot" : "cover-node"}
          strokeWidth={thumb ? 4 : 1.5}
        />
      ))}
    </svg>
  );
}
