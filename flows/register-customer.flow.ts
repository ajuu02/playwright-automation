import { type Page } from '@playwright/test';
import { RegisterPage, type RegistrationInput } from '../pages/register.page';

export class RegisterCustomerFlow {
  private readonly registerPage: RegisterPage;

  constructor(page: Page) {
    this.registerPage = new RegisterPage(page);
  }

  async registerNewCustomer(input: RegistrationInput): Promise<void> {
    await this.registerPage.goto();
    await this.registerPage.register(input);
  }

  successMessage() {
    return this.registerPage.successMessageElement();
  }
}
