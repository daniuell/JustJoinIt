import { Page } from '@playwright/test'

export default class CookiesViews {

  acceptCookiesButton = this.page.getByRole('button', { name: 'Accept all' });
  customizeCookiesButton = this.page.getByRole('button', { name: 'Customize' });

  constructor(private page: Page) {
    this.page = page;
  };

  async acceptCookies() {
    await this.acceptCookiesButton.click();
  };

};