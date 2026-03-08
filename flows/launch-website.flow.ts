import { type Page } from '@playwright/test';
import { HomePage } from '../pages/home.page';

export class LaunchWebsiteFlow {
  private readonly homePage: HomePage;

  constructor(page: Page) {
    this.homePage = new HomePage(page);
  }

  async openDemoWebShop(): Promise<void> {
    await this.homePage.goto();
  }
}
