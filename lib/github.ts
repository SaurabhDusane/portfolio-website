/**
 * Build-time GitHub lookups. Static export: these run once per build, never
 * in the browser. Every failure (no network, rate limit, renamed repo)
 * returns null, so the page falls back to what the data file says.
 */

const API = process.env.GITHUB_API_URL || "https://api.github.com";

/** Date of the latest commit on a repo's default branch ("owner/name"), or null. */
export async function lastCommitDate(repo: string): Promise<Date | null> {
  try {
    const headers: Record<string, string> = { accept: "application/vnd.github+json" };
    if (process.env.GITHUB_TOKEN) headers.authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    const res = await fetch(`${API}/repos/${repo}/commits?per_page=1`, {
      headers,
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return null;
    const [latest] = (await res.json()) as { commit?: { committer?: { date?: string } } }[];
    const date = new Date(latest?.commit?.committer?.date ?? "");
    return Number.isNaN(date.getTime()) ? null : date;
  } catch {
    return null;
  }
}
