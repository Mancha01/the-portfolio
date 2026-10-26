import { defineConfig, devices } from "@playwright/test"

// Runs against the production build: `npm run build` first, then `npm run test:e2e`.
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  // gatsby serve is single-process; too many parallel browsers starve it on a laptop.
  workers: 2,
  timeout: 60_000,
  // Generous assertion window: reveal/scroll checks run alongside other browsers on a laptop.
  expect: { timeout: 10_000 },
  retries: process.env.CI ? 1 : 0,
  reporter: [["list"]],
  use: {
    baseURL: "http://localhost:9000",
    trace: "retain-on-failure",
    // Uses the locally installed browser; set PW_CHANNEL="" to use Playwright's bundled Chromium.
    channel: process.env.PW_CHANNEL ?? "msedge",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], channel: process.env.PW_CHANNEL ?? "msedge" } },
    { name: "mobile", use: { ...devices["Pixel 7"], channel: process.env.PW_CHANNEL ?? "msedge" } },
  ],
  webServer: {
    command: "npx gatsby serve --port 9000",
    url: "http://localhost:9000",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
})
