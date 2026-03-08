import { expect, type Locator, type Page } from '@playwright/test';

export type BillingAddress = {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  city: string;
  address1: string;
  zipPostalCode: string;
  phoneNumber: string;
};

export class CheckoutPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async waitForCheckout(): Promise<void> {
    await this.page.waitForURL('**/onepagecheckout');
  }

  async fillBillingAddress(address: BillingAddress): Promise<void> {
    await this.page.locator('#BillingNewAddress_FirstName').fill(address.firstName);
    await this.page.locator('#BillingNewAddress_LastName').fill(address.lastName);
    await this.page.locator('#BillingNewAddress_Email').fill(address.email);
    await this.page.locator('#BillingNewAddress_CountryId').selectOption({ label: address.country });
    await this.page.locator('#BillingNewAddress_City').fill(address.city);
    await this.page.locator('#BillingNewAddress_Address1').fill(address.address1);
    await this.page.locator('#BillingNewAddress_ZipPostalCode').fill(address.zipPostalCode);
    await this.page.locator('#BillingNewAddress_PhoneNumber').fill(address.phoneNumber);
    await this.page.locator('#billing-buttons-container input.button-1.new-address-next-step-button').click();
  }

  async completeOrder(): Promise<void> {
    await this.clickContinueIfVisible('#shipping-buttons-container input.button-1.new-address-next-step-button');
    await this.clickContinueIfVisible('#shipping-method-buttons-container input.button-1.shipping-method-next-step-button');
    await this.clickContinueIfVisible('#payment-method-buttons-container input.button-1.payment-method-next-step-button');
    await this.clickContinueIfVisible('#payment-info-buttons-container input.button-1.payment-info-next-step-button');

    const confirmButton = this.page.locator('#confirm-order-buttons-container input.button-1.confirm-order-next-step-button');
    await expect(confirmButton).toBeVisible();
    await confirmButton.click();
  }

  orderSuccessMessage(): Locator {
    return this.page.locator('.section.order-completed .title');
  }

  private async clickContinueIfVisible(selector: string): Promise<void> {
    const button = this.page.locator(selector);
    try {
      await button.waitFor({ state: 'visible', timeout: 5000 });
      await button.click();
    } catch {
      // Some checkout steps are optional for specific products.
    }
  }
}
