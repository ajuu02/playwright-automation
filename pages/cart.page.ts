import { type Page } from '@playwright/test';

export class CartPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(): Promise<void> {
    await this.page.goto('/cart');
  }

  async acceptTermsAndCheckout(): Promise<void> {
    await this.page.locator('#termsofservice').check();
    await this.page.getByRole('button', { name: /checkout/i }).click();
  }

  async checkoutAsGuestIfAvailable(): Promise<void> {
    const checkoutAsGuestButton = this.page.getByRole('button', { name: /checkout as guest/i });
    if (await checkoutAsGuestButton.isVisible().catch(() => false)) {
      await checkoutAsGuestButton.click();
    }
  }
}
