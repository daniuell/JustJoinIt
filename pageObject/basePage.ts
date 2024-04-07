import { Page } from '@playwright/test'

export default class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  };

  async verifyUrl(expectedUrl) {
    const currentUrl = await this.page.url();
    if (currentUrl.includes(expectedUrl)) {
      console.log('is present in the url')
    } else {
      console.log("is not present in the url");
    }
  };
};
