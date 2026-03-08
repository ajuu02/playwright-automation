import { type Locator, type Page } from '@playwright/test';

export class HeaderComponent {
  private readonly profileMenuButton: Locator;
  private readonly logoutButton: Locator;

  constructor(page: Page) {
    this.profileMenuButton = page.getByRole('button', { name: /profile|account/i });
    this.logoutButton = page.getByRole('menuitem', { name: /logout|sign out/i });
  }

  async logout(): Promise<void> {
    await this.profileMenuButton.click();
    await this.logoutButton.click();
  }
}
