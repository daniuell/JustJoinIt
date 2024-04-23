import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  timeout: 45 * 1000,
  expect: { timeout: 15_000 },

  use: {

    trace: 'on-first-retry',
    baseURL: "https://justjoin.it",
    headless: true,
    viewport: { width: 1920, height: 1080 },
    screenshot: 'only-on-failure'
  },


  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1024 },
      },
    }
  ],
});
