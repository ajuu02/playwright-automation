import { type Locator, type Page } from '@playwright/test';

export type RegistrationInput = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export class RegisterPage {
  private readonly page: Page;
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly confirmPasswordInput: Locator;
  private readonly registerButton: Locator;
  private readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.getByLabel(/first name/i);
    this.lastNameInput = page.getByLabel(/last name/i);
    this.emailInput = page.getByLabel(/^email/i);
    this.passwordInput = page.getByLabel(/^password/i);
    this.confirmPasswordInput = page.getByLabel(/confirm password/i);
    this.registerButton = page.getByRole('button', { name: /^register$/i });
    this.successMessage = page.locator('.result');
  }

  async goto(): Promise<void> {
    await this.page.goto('/register');
  }

  async register(input: RegistrationInput): Promise<void> {
    await this.firstNameInput.fill(input.firstName);
    await this.lastNameInput.fill(input.lastName);
    await this.emailInput.fill(input.email);
    await this.passwordInput.fill(input.password);
    await this.confirmPasswordInput.fill(input.password);
    await this.registerButton.click();
  }

  successMessageElement(): Locator {
    return this.successMessage;
  }
}
