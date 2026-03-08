import { defineConfig, devices } from '@playwright/test';
import { getEnv } from './utils/env';

const env = getEnv();

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [['html', { open: 'never' }], ['list']],
  use: {
    baseURL: env.baseUrl,
    trace: 'on-first-retry',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure'
  },
  projects: [
    {
      name: 'setup',
      testMatch: /.*auth\.setup\.ts/
    },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], storageState: 'artifacts/auth/user.json' },
      dependencies: ['setup']
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'], storageState: 'artifacts/auth/user.json' },
      dependencies: ['setup']
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'], storageState: 'artifacts/auth/user.json' },
      dependencies: ['setup']
    }
  ]
});
