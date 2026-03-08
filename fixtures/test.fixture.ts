import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { getEnv } from '../utils/env';

type AppFixtures = {
  authenticatedPage: void;
};

export const test = base.extend<AppFixtures>({
  page: async ({ page }, use, testInfo) => {
    let screenshotIndex = 0;

    const capture = async (label: string): Promise<void> => {
      try {
        if (page.isClosed()) {
          return;
        }

        screenshotIndex += 1;
        const name = `${String(screenshotIndex).padStart(2, '0')}-${label}`;
        const body = await page.screenshot({ fullPage: true });
        await testInfo.attach(name, {
          body,
          contentType: 'image/png'
        });
      } catch {
        // Ignore capture failures to avoid breaking test flow.
      }
    };

    const toLabel = (url: string): string => {
      if (!url || url === 'about:blank') {
        return 'about-blank';
      }

      try {
        const parsed = new URL(url);
        const path = parsed.pathname === '/' ? 'home' : parsed.pathname.slice(1);
        return `nav-${path.replace(/[^a-zA-Z0-9_-]/g, '-')}`.slice(0, 80);
      } catch {
        return 'nav-unknown';
      }
    };

    page.on('framenavigated', frame => {
      if (frame === page.mainFrame()) {
        void capture(toLabel(frame.url()));
      }
    });

    await use(page);
    await capture('final-page');
  },
  authenticatedPage: async ({ page }, use) => {
    const env = getEnv();
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(env.e2eUser, env.e2ePass);

    await use();
  }
});

export { expect };
