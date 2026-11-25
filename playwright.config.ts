import { defineConfig } from "@playwright/test";

/**
 * Screenshot tests (npm run test:screens): full-page images of the main pages,
 * compared with the saved ones in tests/screens/__screenshots__. Run on the
 * static export, so build first, with SITE_OFFLINE=1 like CI does.
 *
 * To accept intended changes: npm run test:screens:update (or run the
 * "Update screenshots" workflow on the branch), then commit the new images.
 */
export default defineConfig({
  testDir: "tests/screens",
  snapshotPathTemplate: "{testDir}/__screenshots__/{projectName}/{arg}{ext}",
  fullyParallel: true,
  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : "list",
  expect: {
    toHaveScreenshot: { maxDiffPixelRatio: 0.01, animations: "disabled", caret: "hide" },
  },
  use: {
    baseURL: "http://localhost:3100",
    reducedMotion: "reduce",
  },
  projects: [
    { name: "desktop-dark", use: { viewport: { width: 1280, height: 900 }, colorScheme: "dark" } },
    { name: "desktop-light", use: { viewport: { width: 1280, height: 900 }, colorScheme: "light" } },
    {
      name: "phone-light",
      use: { viewport: { width: 390, height: 844 }, colorScheme: "light", isMobile: true, hasTouch: true, deviceScaleFactor: 1 },
    },
  ],
  webServer: {
    command: "node scripts/serve-out.mjs",
    url: "http://localhost:3100",
    reuseExistingServer: !process.env.CI,
  },
});
