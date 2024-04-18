import { Page } from '@playwright/test'
import { request } from 'http';

export default class HomePage {

  //Page body
  pageBody = this.page.locator('[id="__next"]').first();

  //Header
  lightDarkModeSwitch = this.page.locator('//header//label');

  //Search and filter
  searchBar = this.page.locator('[placeholder="Search"]');
  location = this.page.getByRole('button', { name: "Location" });
  moreFiltersButton = this.page.locator('[name="more_filters_button"]');
  selectCategory(category: string) { return this.page.locator(`//div[contains(@class,"MuiBox")]//*[contains(@href,"${category}")]`) };

  //Offers 
  offersWithSalaryButton = this.page.getByRole('button', { name: "Offers with salary" });
  allOffersButton = this.page.locator('//button[contains(@id,"-allOffers")]');
  remoteOnlySwitchOn = this.page.locator('//span[contains(@class,"MuiSwitch-sizeSmall")]//input[@type="checkbox"]');
  remoteOnlySwitchOff = this.page.locator('//span[contains(@class,"Mui-checked")]');

  //Drop-down filter 
  sortOffersDropDownButton = this.page.locator('[name="sort_filter_button"]');
  dropDownDefault = this.page.locator('//*[@role="menuitem"]').nth(0);
  dropDownLatest = this.page.locator('//*[@role="menuitem"]').nth(1);
  dropDownHighestSalary = this.page.locator('//*[@role="menuitem"]').nth(2);
  dropDownLowestSalary = this.page.locator('//*[@role="menuitem"]').nth(3);
  dropDownCurrentValue = this.page.locator('//*[@name="sort_filter_button"]/div');

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