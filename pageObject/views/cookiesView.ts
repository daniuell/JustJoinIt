import { Page } from '@playwright/test'
import BasePage from '../basePage';

export default class CookiesView extends BasePage {

  acceptCookiesButton = this.page.getByRole('button', { name: 'Accept all' });
  customizeCookiesButton = this.page.getByRole('button', { name: 'Customize' });

  constructor(page: Page) {
    super(page);
  };

  async acceptCookies() {
    await this.acceptCookiesButton.click();
  };

};