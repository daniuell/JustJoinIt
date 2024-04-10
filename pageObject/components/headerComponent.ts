import { Page } from '@playwright/test'

export default class HeaderComponent {

  headerBackground = this.page.locator("//header");

  constructor(private page: Page) {
    this.page = page;
  };


};