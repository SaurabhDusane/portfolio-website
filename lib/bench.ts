/**
 * Benchmark results read from the project repos at build time, so the numbers
 * on a case study always match what the code produced. Static export: this
 * runs once per build. Any failure (no file yet, no network) returns null and
 * the page simply shows no results section.
 */

const API = process.env.GITHUB_API_URL || "https://api.github.com";
const RAW = process.env.GITHUB_RAW_URL || "https://raw.githubusercontent.com";

export type BenchSource =
  /** Guardian's bench/results.json (schema 1, written by bench/run_bench.py). */
  | { kind: "guardian-results"; repo: string; path: string }
  /** A folder of summary files (fp8-kvcache's bench/results/summary). */
  | { kind: "summary-folder"; repo: string; path: string };

export interface BenchFigure {
  value: string;
  label: string;
}

export interface BenchResults {
  figures: BenchFigure[];
  /** Summary files to link to, newest first. */
  files: { name: string; url: string }[];
  /** "Run on …, Nov 20, 2026, commit abc1234" */
  provenance?: string;
  /** Where the numbers come from, on GitHub. */
  sourceUrl: string;
}

function headers() {
  const h: Record<string, string> = { accept: "application/vnd.github+json" };
  if (process.env.GITHUB_TOKEN) h.authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  return h;
}

async function getJson<T>(url: string, withAuth = false): Promise<T | null> {
  try {
    const res = await fetch(url, { headers: withAuth ? headers() : undefined, signal: AbortSignal.timeout(8000) });
    return res.ok ? ((await res.json()) as T) : null;
  } catch {
    return null;
  }
}

async function defaultBranch(repo: string): Promise<string> {
  const info = await getJson<{ default_branch?: string }>(`${API}/repos/${repo}`, true);
  return info?.default_branch ?? "main";
}

// ─── Guardian ──────────────────────────────────────────────────────────────

interface GuardianResults {
  schema: number;
  meta: {
    quick?: boolean;
    complete?: boolean;
    finished?: string | null;
    git_commit?: string | null;
    machine?: { cpu?: string; processor?: string; platform?: string; memory_gb?: number | null };
  };
  series: { measurement: string; scale: number; config: string; median?: number; unit: string }[];
  derived: { measurement: string; scale: number; config: string; metric: string; value: number }[];
}

const rows = (n: number) => (n >= 1_000_000 ? `${n / 1_000_000}M` : n >= 1_000 ? `${n / 1_000}k` : String(n));
const pct = (v: number) => `${v >= 0 && v < 10 ? v.toFixed(1) : Math.round(v)}%`;
const secs = (v: number) => (v < 10 ? `${v.toFixed(1)} s` : `${Math.round(v)} s`);

function guardianFigures(r: GuardianResults): BenchFigure[] {
  const scale = Math.max(...r.series.map((s) => s.scale));
  const d = (measurement: string, config: string, metric: string) =>
    r.derived.find((x) => x.measurement === measurement && x.scale === scale && x.config === config && x.metric === metric)
      ?.value;
  const median = (measurement: string, config: string) =>
    r.series.find((x) => x.measurement === measurement && x.scale === scale && x.config === config)?.median;

  const out: BenchFigure[] = [];
  const overhead = d("overhead", "core", "added_pct");
  if (overhead !== undefined) out.push({ value: `+${pct(overhead)}`, label: `run time added by Guardian's core at ${rows(scale)} rows` });
  const outage = d("throughput", "protected_crash", "pct_of_clean");
  if (outage !== undefined) out.push({ value: pct(outage), label: "of clean throughput while a protected stage is down" });
  const recovery = median("recovery", "50%");
  if (recovery !== undefined) out.push({ value: secs(recovery), label: `to recover with 50% of a stage's rows quarantined` });
  const shadow = d("shadow", "one", "added_pct");
  if (shadow !== undefined) out.push({ value: `+${pct(shadow)}`, label: "run time with a new version in shadow" });
  return out;
}

// ─── Entry point ───────────────────────────────────────────────────────────

export async function loadBench(source: BenchSource): Promise<BenchResults | null> {
  if (process.env.SITE_OFFLINE === "1") return null; // see lib/github.ts
  const branch = await defaultBranch(source.repo);
  const sourceUrl = `https://github.com/${source.repo}/tree/${branch}/${source.path}`;

  if (source.kind === "guardian-results") {
    const r = await getJson<GuardianResults>(`${RAW}/${source.repo}/${branch}/${source.path}`);
    // Only complete, full runs are quoted; --quick runs are a sanity check, not results.
    if (!r || r.schema !== 1 || r.meta?.quick || r.meta?.complete === false) return null;
    const figures = guardianFigures(r);
    if (!figures.length) return null;
    const m = r.meta.machine ?? {};
    const when = r.meta.finished
      ? new Date(r.meta.finished).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" })
      : undefined;
    const provenance = [
      m.cpu || m.processor ? `Run on ${m.cpu || m.processor}${m.memory_gb ? `, ${m.memory_gb} GB RAM` : ""}` : undefined,
      when,
      r.meta.git_commit ? `commit ${r.meta.git_commit.slice(0, 7)}` : undefined,
    ]
      .filter(Boolean)
      .join(" · ");
    return { figures, files: [], provenance: provenance || undefined, sourceUrl: `https://github.com/${source.repo}/blob/${branch}/${source.path}` };
  }

  // A folder of summaries: link the newest few.
  const listing = await getJson<{ name: string; type: string; html_url: string }[]>(
    `${API}/repos/${source.repo}/contents/${source.path}?ref=${branch}`,
    true
  );
  const files = (listing ?? [])
    .filter((f) => f.type === "file" && /\.(md|csv)$/i.test(f.name))
    .sort((a, b) => b.name.localeCompare(a.name))
    .slice(0, 5)
    .map((f) => ({ name: f.name, url: f.html_url }));
  if (!files.length) return null;
  return { figures: [], files, sourceUrl };
}
