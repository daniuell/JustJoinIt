import { Page } from '@playwright/test'

export default class HomePage {

  //Page body
  pageBody = this.page.locator('[id="__next"]').first();

  //Header
  lightDarkModeSwitch = this.page.locator('//header//label');

  //Search and filter
  searchBar = this.page.locator('[placeholder="Search"]');
  location = this.page.getByRole('button', { name: "Location" });

  selectCategory(category: string) { return this.page.locator(`//div[contains(@class,"MuiBox")]//*[contains(@href,"${category}")]`) };

  moreFiltersButton = this.page.locator('[name="more_filters_button"]');

  constructor(private page: Page) {
    this.page = page;
  };

  async changeSiteModeDarkLight() {
    await this.lightDarkModeSwitch.click();
  };

  async openMoreFilterViews() {
    await this.moreFiltersButton.click();
  };
};