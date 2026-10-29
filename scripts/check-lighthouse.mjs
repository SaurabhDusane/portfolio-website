#!/usr/bin/env node
/**
 * Lighthouse check for the static export in ./out (run `npm run build` first).
 *
 * Serves ./out with gzip (like the real host), runs Lighthouse's mobile audit
 * on the main pages with the Playwright Chromium, and fails if any category
 * drops below its threshold. Writes a Markdown table to $LIGHTHOUSE_REPORT
 * when set.
 * Usage: npm run check:lighthouse
 */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import zlib from "node:zlib";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { chromium } from "playwright";

const OUT = path.resolve("out");
const PAGES = ["/", "/projects", "/projects/guardian", "/writing", "/about", "/contact"];
const THRESHOLDS = { performance: 0.85, accessibility: 0.95, "best-practices": 0.95, seo: 0.95 };
const LIGHTHOUSE = "lighthouse@12.8.2";
const TYPES = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css",
  ".png": "image/png",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".json": "application/json",
  ".txt": "text/plain",
  ".xml": "application/xml",
  ".pdf": "application/pdf",
};

if (!fs.existsSync(path.join(OUT, "index.html"))) {
  console.error("No ./out/index.html — run `npm run build` first.");
  process.exit(1);
}

function resolveFile(urlPath) {
  const p = path.join(OUT, decodeURIComponent(urlPath));
  if (!p.startsWith(OUT)) return null;
  for (const c of [p, `${p}.html`, path.join(p, "index.html")]) {
    try {
      if (fs.statSync(c).isFile()) return c;
    } catch {}
  }
  return null;
}

const server = http
  .createServer((req, res) => {
    const file = resolveFile(req.url.split("?")[0]) ?? path.join(OUT, "404.html");
    const type = TYPES[path.extname(file)] ?? (path.extname(file) ? "application/octet-stream" : "image/png");
    const gzip = /text|javascript|json|xml|svg/.test(type) && /gzip/.test(req.headers["accept-encoding"] ?? "");
    res.writeHead(file.endsWith("404.html") && !req.url.startsWith("/404") ? 404 : 200, {
      "content-type": type,
      ...(gzip ? { "content-encoding": "gzip" } : {}),
    });
    const stream = fs.createReadStream(file);
    (gzip ? stream.pipe(zlib.createGzip()) : stream).pipe(res);
  })
  .listen(0);
const base = `http://localhost:${server.address().port}`;

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "lh-"));
const rows = [];
let failed = false;
try {
  for (const page of PAGES) {
    const out = path.join(tmp, "report.json");
    // Async on purpose: a blocking call would stall the server above, which runs in this process.
    await promisify(execFile)(
      "npx",
      [
        "--yes",
        LIGHTHOUSE,
        base + page,
        "--quiet",
        "--output=json",
        `--output-path=${out}`,
        "--only-categories=performance,accessibility,best-practices,seo",
        "--chrome-flags=--headless=new --no-sandbox",
      ],
      { env: { ...process.env, CHROME_PATH: chromium.executablePath() }, maxBuffer: 64 * 1024 * 1024 }
    );
    const lhr = JSON.parse(fs.readFileSync(out, "utf8"));
    const scores = Object.fromEntries(Object.keys(THRESHOLDS).map((k) => [k, lhr.categories[k]?.score ?? 0]));
    const low = Object.entries(scores).filter(([k, v]) => v < THRESHOLDS[k]);
    if (low.length) failed = true;
    rows.push({ page, scores, low: low.map(([k]) => k) });
    console.log(page, Object.entries(scores).map(([k, v]) => `${k} ${Math.round(v * 100)}`).join(", "));
  }
} finally {
  server.close();
  fs.rmSync(tmp, { recursive: true, force: true });
}

const pct = (v) => Math.round(v * 100);
const report = [
  `Lighthouse (mobile). Minimums: ${Object.entries(THRESHOLDS).map(([k, v]) => `${k} ${pct(v)}`).join(", ")}.`,
  "",
  "| Page | Performance | Accessibility | Best practices | SEO |",
  "| --- | --- | --- | --- | --- |",
  ...rows.map(
    (r) =>
      `| ${r.page} | ${Object.keys(THRESHOLDS)
        .map((k) => (r.low.includes(k) ? `**${pct(r.scores[k])}** ⚠️` : pct(r.scores[k])))
        .join(" | ")} |`
  ),
].join("\n");
console.log("\n" + report);
if (process.env.LIGHTHOUSE_REPORT) fs.writeFileSync(process.env.LIGHTHOUSE_REPORT, report + "\n");
process.exit(failed ? 1 : 0);
