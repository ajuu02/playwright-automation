import { type Page } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { getEnv } from '../utils/env';

export class AuthFlow {
  private readonly page: Page;
  private readonly loginPage: LoginPage;

  constructor(page: Page) {
    this.page = page;
    this.loginPage = new LoginPage(page);
  }

  async loginAsDefaultUser(): Promise<void> {
    const env = getEnv();
    await this.loginPage.goto();
    await this.loginPage.login(env.e2eUser, env.e2ePass);
    await this.page.goto('/customer/info');
  }
}
