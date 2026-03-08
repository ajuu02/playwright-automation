import { test as setup, expect } from '@playwright/test';
import fs from 'node:fs/promises';
import path from 'node:path';
import { LoginPage } from '../../pages/login.page';
import { getEnv } from '../../utils/env';

const authFile = 'artifacts/auth/user.json';

setup('authenticate', async ({ page }) => {
  const env = getEnv();
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login(env.e2eUser, env.e2ePass);

  const loginError = page.locator('.validation-summary-errors');
  if (await loginError.isVisible({ timeout: 2000 }).catch(() => false)) {
    const errorText = (await loginError.innerText()).replace(/\s+/g, ' ').trim();
    throw new Error(
      `Login failed in auth setup. Verify E2E_USER/E2E_PASS. Site message: ${errorText}`
    );
  }

  await expect(page.getByRole('link', { name: /log out/i })).toBeVisible();
  await expect(page).not.toHaveURL(/\/login(?:\?|$)/);

  await fs.mkdir(path.dirname(authFile), { recursive: true });
  await page.context().storageState({ path: authFile });
});
