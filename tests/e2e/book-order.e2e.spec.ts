import { test, expect } from '../../fixtures/test.fixture';
import { PlaceBookOrderFlow } from '../../flows/place-book-order.flow';
import { uniqueEmail } from '../../utils/data-generator';
import { orders } from '../../utils/test-data';

test.use({ storageState: { cookies: [], origins: [] } });

test.describe('E2E: Books Order', () => {
  test('books -> add fiction book to cart -> complete order', async ({ page }) => {
    const placeBookOrderFlow = new PlaceBookOrderFlow(page);
    const guestBilling = orders.guestBilling;

    await placeBookOrderFlow.addBookToCart('Fiction');
    await expect(placeBookOrderFlow.cartQuantityLabel()).toContainText('(1)');

    await placeBookOrderFlow.checkoutAsGuest({
      ...guestBilling,
      email: uniqueEmail('demowebshop.order')
    });

    await expect(placeBookOrderFlow.orderSuccessMessage()).toHaveText(/your order has been successfully processed/i);
  });
});
