import { test, expect } from '../../fixtures/test.fixture';
import { RegisterCustomerFlow } from '../../flows/register-customer.flow';
import { users } from '../../utils/test-data';
import { uniqueEmail } from '../../utils/data-generator';

test.use({ storageState: { cookies: [], origins: [] } });

test.describe('E2E: Customer Registration', () => {
  test('new customer can register successfully', async ({ page }, testInfo) => {
    const registerCustomerFlow = new RegisterCustomerFlow(page);
    const registrationTemplate = users.registrationTemplate;

    const registrationInput = {
      firstName: registrationTemplate.firstName,
      lastName: registrationTemplate.lastName,
      password: registrationTemplate.password,
      email: uniqueEmail('demowebshop.auto')
    };

    await registerCustomerFlow.registerNewCustomer(registrationInput);

    await expect(registerCustomerFlow.successMessage()).toHaveText(/your registration completed/i);
    await expect(page.getByRole('link', { name: /log out/i })).toBeVisible();

    const screenshot = await page.screenshot({ fullPage: true });
    await testInfo.attach('register-customer-success', {
      body: screenshot,
      contentType: 'image/png'
    });
  });
});
