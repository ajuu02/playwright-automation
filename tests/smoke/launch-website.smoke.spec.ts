import { test, expect } from '../../fixtures/test.fixture';
import { LaunchWebsiteFlow } from '../../flows/launch-website.flow';

test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Smoke: Website Launch', () => {
  test('launches Demo Web Shop home page', async ({ page }, testInfo) => {
    const launchWebsiteFlow = new LaunchWebsiteFlow(page);

    await launchWebsiteFlow.openDemoWebShop();

    await expect(page).toHaveURL(/demowebshop\.tricentis\.com/);
    await expect(page).toHaveTitle(/Demo Web Shop/i);

    const screenshot = await page.screenshot({ fullPage: true });
    await testInfo.attach('launch-homepage', {
      body: screenshot,
      contentType: 'image/png'
    });
  });
});
