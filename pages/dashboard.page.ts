import { type Locator, type Page } from '@playwright/test';

export class DashboardPage {
  private readonly page: Page;
  private readonly heading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: /my account/i });
  }

  async goto(): Promise<void> {
    await this.page.goto('/customer/info');
  }

  headingElement(): Locator {
    return this.heading;
  }
}
