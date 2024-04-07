import { Page } from '@playwright/test'

export default class HomePage {

  //Header
  lightDarkModeSwitch = this.page.locator('//header//label');

  //Search and filter
  searchBar = this.page.locator('[placeholder="Search"]');
  location = this.page.getByRole('button', { name: "Location" });
  selectCategory(category: string) { return this.page.locator(`//div[contains(@class,"MuiBox")]//*[contains(@href,"${category}")]`) };

  constructor(private page: Page) {
    this.page = page;
  };

};