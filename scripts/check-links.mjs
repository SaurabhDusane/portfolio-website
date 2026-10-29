#!/usr/bin/env node
/**
 * External link check for the static export in ./out (run `npm run build` first).
 *
 * Collects every outside link (Medium essays, GitHub repos, LinkedIn, X, ...)
 * from the exported HTML and checks each one:
 *   - GitHub profiles and repos through the GitHub API (uses $GITHUB_TOKEN if set)
 *   - Medium posts against the author's RSS feed (Medium often blocks direct checks)
 *   - everything else with a plain request
 * Fails on links that are gone (404/410, other 4xx, or still failing after one
 * retry). Sites that refuse automated requests (401/403/429, LinkedIn's 999)
 * are reported as "couldn't verify" without failing, since that says nothing
 * about the link itself.
 *
 * Writes a Markdown report to $LINK_REPORT when set.
 * Usage: npm run check:links
 */
import fs from "node:fs";
import path from "node:path";

const OUT = path.resolve("out");
const SKIP_HOSTS = new Set(["vercel.com", "vercel.link", "schema.org", "www.w3.org"]);
const BLOCKED = new Set([401, 403, 429, 999]);
const TIMEOUT_MS = 15_000;
const UA = "Mozilla/5.0 (compatible; portfolio-link-check; +https://github.com/SaurabhDusane/portfolio-website)";

if (!fs.existsSync(path.join(OUT, "index.html"))) {
  console.error("No ./out/index.html — run `npm run build` first.");
  process.exit(1);
}

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : p.endsWith(".html") ? [p] : [];
  });
}

/** url → pages it appears on */
const links = new Map();
for (const file of walk(OUT)) {
  const page = "/" + path.relative(OUT, file).replace(/(index)?\.html$/, "");
  const html = fs.readFileSync(file, "utf8");
  for (const m of html.matchAll(/<a\b[^>]*\bhref="(https?:\/\/[^"]+)"/g)) {
    const url = m[1].replace(/&amp;/g, "&");
    if (SKIP_HOSTS.has(new URL(url).hostname)) continue;
    if (!links.has(url)) links.set(url, new Set());
    links.get(url).add(page.replace(/\/$/, "") || "/");
  }
}

async function request(url, headers = {}, readBody = false) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, { redirect: "follow", signal: ctrl.signal, headers: { "user-agent": UA, ...headers } });
    if (readBody) return { status: res.status, body: await res.text() };
    res.body?.cancel();
    return { status: res.status };
  } catch (err) {
    return { status: 0, error: err.name === "AbortError" ? "timed out" : err.cause?.code ?? err.message };
  } finally {
    clearTimeout(timer);
  }
}

/** github.com/<owner>[/<repo>] → the matching GitHub API URL. */
function githubApi(url) {
  const u = new URL(url);
  if (u.hostname !== "github.com") return null;
  const [owner, repo] = u.pathname.split("/").filter(Boolean);
  if (!owner) return null;
  return repo ? `https://api.github.com/repos/${owner}/${repo}` : `https://api.github.com/users/${owner}`;
}

/** Medium feeds by author, fetched once each: the set of post ids they list. */
const feeds = new Map();
async function mediumPostIds(author) {
  if (!feeds.has(author)) {
    feeds.set(
      author,
      request(`https://medium.com/feed/@${author}`, {}, true).then((r) =>
        r.status === 200 ? new Set([...r.body.matchAll(/-([0-9a-f]{10,16})(?:\?|<|")/g)].map((m) => m[1])) : null
      )
    );
  }
  return feeds.get(author);
}

async function check(url) {
  const api = githubApi(url);
  if (api) {
    const headers = { accept: "application/vnd.github+json" };
    if (process.env.GITHUB_TOKEN) headers.authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    const r = await request(api, headers);
    if (r.status === 200) return { kind: "ok" };
    if (r.status === 404) return { kind: "broken", detail: "not found on GitHub (renamed, deleted or private?)" };
    // Rate-limited or blocked: fall through to a plain request.
  }

  const medium = url.match(/^https:\/\/medium\.com\/@([^/]+)\/.+-([0-9a-f]{10,16})$/);
  if (medium) {
    const ids = await mediumPostIds(medium[1]);
    if (ids?.has(medium[2])) return { kind: "ok" };
    // Not in the feed (it only lists recent posts) or feed unavailable: try the page itself.
  }

  let r = await request(url);
  if (r.status === 0 || r.status >= 500) {
    await new Promise((res) => setTimeout(res, 3000));
    r = await request(url);
  }
  if (r.status >= 200 && r.status < 400) return { kind: "ok" };
  if (BLOCKED.has(r.status)) return { kind: "unverified", detail: `HTTP ${r.status}` };
  return { kind: "broken", detail: r.status ? `HTTP ${r.status}` : r.error };
}

const results = [];
const urls = [...links.keys()];
for (let i = 0; i < urls.length; i += 6) {
  const batch = urls.slice(i, i + 6);
  results.push(...(await Promise.all(batch.map(async (url) => ({ url, ...(await check(url)) })))));
}

const broken = results.filter((r) => r.kind === "broken");
const unverified = results.filter((r) => r.kind === "unverified");
const where = (url) => [...links.get(url)].sort().slice(0, 3).join(", ") + (links.get(url).size > 3 ? ", …" : "");
const lines = [
  `Checked ${results.length} outside links: ${results.length - broken.length - unverified.length} fine, ${broken.length} broken, ${unverified.length} couldn't be verified.`,
];
if (broken.length) {
  lines.push("", "**Broken**", "", ...broken.map((r) => `- ${r.url} (${r.detail}), on ${where(r.url)}`));
}
if (unverified.length) {
  lines.push("", "**Couldn't verify** (the site blocks automated checks; open them by hand if in doubt)", "");
  lines.push(...unverified.map((r) => `- ${r.url} (${r.detail})`));
}
const report = lines.join("\n");
console.log(report);
if (process.env.LINK_REPORT) fs.writeFileSync(process.env.LINK_REPORT, report + "\n");
process.exit(broken.length ? 1 : 0);
