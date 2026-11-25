import { test, expect } from "@playwright/test";

/** The pages worth guarding; each is captured in every project (see playwright.config.ts). */
const PAGES: [name: string, path: string][] = [
  ["home", "/"],
  ["work", "/projects"],
  ["project-guardian", "/projects/guardian"],
  ["writing", "/writing"],
  ["note", "/writing/why-guardian-quarantines"],
  ["about", "/about"],
  ["contact", "/contact"],
  ["resume", "/resume"],
];

// Things that differ run to run but aren't layout: the moving background, the
// cursor ring, and anything marked data-volatile (e.g. the live clock).
const STABILIZE = `
  .site-bg, .cursor-ring, .cursor-label { display: none !important; }
`;

for (const [name, path] of PAGES) {
  test(name, async ({ page }) => {
    await page.goto(path, { waitUntil: "networkidle" });
    await page.addStyleTag({ content: STABILIZE });
    // Scroll through once so lazy parts (Mermaid diagrams, reveals) render.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 400) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 40));
      }
      window.scrollTo(0, 0);
    });
    if (await page.locator("[data-diagram]").count()) {
      await page.waitForSelector("[data-diagram='rendered']", { timeout: 15_000 });
    }
    await page.evaluate(() => document.fonts.ready);
    await expect(page).toHaveScreenshot(`${name}.png`, {
      fullPage: true,
      mask: [page.locator("[data-volatile]")],
    });
  });
}
