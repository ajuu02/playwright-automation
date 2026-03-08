import { test, expect } from '../../fixtures/test.fixture';
import { DashboardPage } from '../../pages/dashboard.page';

test.describe('Smoke: Login', () => {
  test('default user can reach dashboard', async ({ page, authenticatedPage }) => {
    const dashboardPage = new DashboardPage(page);

    await dashboardPage.goto();
    await expect(dashboardPage.headingElement()).toBeVisible();
  });
});
