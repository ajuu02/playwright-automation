import { test, expect } from '../../fixtures/test.fixture';
import { AuthFlow } from '../../flows/auth.flow';
import { DashboardPage } from '../../pages/dashboard.page';

test.describe('E2E: Authentication', () => {
  test('user logs in through auth flow', async ({ page }) => {
    const authFlow = new AuthFlow(page);
    const dashboardPage = new DashboardPage(page);

    await authFlow.loginAsDefaultUser();

    await expect(dashboardPage.headingElement()).toBeVisible();
  });
});
