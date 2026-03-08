import { type Locator, type Page } from '@playwright/test';

export class BooksPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(): Promise<void> {
    await this.page.goto('/books');
  }

  async addBookToCart(bookName: string): Promise<void> {
    const bookCard = this.page
      .locator('.product-item')
      .filter({ has: this.page.getByRole('link', { name: new RegExp(`^${bookName}$`, 'i') }) })
      .first();

    await bookCard.getByRole('button', { name: /add to cart/i }).click();
    await this.page.locator('#bar-notification').waitFor({ state: 'visible' });
  }

  cartQuantityLabel(): Locator {
    return this.page.locator('.cart-qty');
  }
}
