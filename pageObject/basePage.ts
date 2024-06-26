import { Page, Browser } from '@playwright/test'

export default class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  };

  async isLoaded(elements): Promise<boolean> {
    await this.page.waitForLoadState('networkidle');

    const locators = elements;
    const areAllVisible = await Promise.all(locators.map(async (locator) => await locator.isVisible()));
    return areAllVisible.every((isVisible) => isVisible);
  };

  async getAuthorizationFromUser(url) {
    const response = await this.page.waitForRequest(response => response.url() === url && response.method() === 'GET');
    const authorizationBearer = await response.headerValue('Authorization');
    const authorizationSubscriptionKey = await response.headerValue('Ocp-Apim-Subscription-Key');
    return [authorizationBearer, authorizationSubscriptionKey];
  };

  async waitForPageToLoad() {
    await this.page.waitForLoadState('networkidle');
  };
};
