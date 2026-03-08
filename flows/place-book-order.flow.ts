import { type Page } from '@playwright/test';
import { BooksPage } from '../pages/books.page';
import { CartPage } from '../pages/cart.page';
import { CheckoutPage, type BillingAddress } from '../pages/checkout.page';

export class PlaceBookOrderFlow {
  private readonly booksPage: BooksPage;
  private readonly cartPage: CartPage;
  private readonly checkoutPage: CheckoutPage;

  constructor(page: Page) {
    this.booksPage = new BooksPage(page);
    this.cartPage = new CartPage(page);
    this.checkoutPage = new CheckoutPage(page);
  }

  async addBookToCart(bookName: string): Promise<void> {
    await this.booksPage.goto();
    await this.booksPage.addBookToCart(bookName);
  }

  async checkoutAsGuest(address: BillingAddress): Promise<void> {
    await this.cartPage.goto();
    await this.cartPage.acceptTermsAndCheckout();
    await this.cartPage.checkoutAsGuestIfAvailable();
    await this.checkoutPage.waitForCheckout();
    await this.checkoutPage.fillBillingAddress(address);
    await this.checkoutPage.completeOrder();
  }

  orderSuccessMessage() {
    return this.checkoutPage.orderSuccessMessage();
  }

  cartQuantityLabel() {
    return this.booksPage.cartQuantityLabel();
  }
}
