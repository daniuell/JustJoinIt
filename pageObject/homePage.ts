import { Page } from '@playwright/test'
import { CitiesRelatedToSilesia } from '../enums/locationForm';

export default class HomePage {

  //Page body
  pageBody = this.page.locator('[id="__next"]').first();

  //Header
  lightDarkModeSwitch = this.page.locator('//header//label');

  //Search and filter
  searchBar = this.page.locator('[placeholder="Search"]');
  location = this.page.locator('[name="location_filter_button"]');
  moreFiltersButton = this.page.locator('[name="more_filters_button"]');
  selectCategory(category: string) { return this.page.locator(`//div[contains(@class,"MuiBox")]//*[contains(@href,"${category}")]`) };

  //Offers 
  offersWithSalaryButton = this.page.getByRole('button', { name: "Offers with salary" });
  allOffersButton = this.page.locator('//button[contains(@id,"-allOffers")]');
  remoteOnlySwitchOn = this.page.locator('//span[contains(@class,"MuiSwitch-sizeSmall")]//input[@type="checkbox"]');
  remoteOnlySwitchOff = this.page.locator('//span[contains(@class,"Mui-checked")]');

  offerCityCount = this.page.locator('//*[@data-testid="PlaceOutlinedIcon"]//..//div/span[1]');
  offerCity(index: number) { return this.page.locator(`(//*[@data-testid="PlaceOutlinedIcon"]//..//div/span[1])[${index}]`) };
  workInTitle = this.page.locator("//div[contains(@class,'MuiBox-root')]//span[text()='Work: ']")
  workInCity(city: string) { return this.page.locator(`//div[contains(@class,"MuiBox-root")]//span[text()="Work: "]//following-sibling::span[text()="${city}"]`) };

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

  async checkMultiCitiesLocators(counter: number, citiesFromEnum: string[]) {

    const cityValueFromPage: boolean[] = [];

    for (let i = 1; i < counter; i++) {

      const cities = Object.values(citiesFromEnum) as string[];
      const cityFromPage = (await this.offerCity(i).textContent());
      const result = await this.locatorValueContainsCityFromEnum(cityFromPage, cities);
      cityValueFromPage.push(result);
    };
    return this.allElementsAreTrue(cityValueFromPage);
  };

  async locatorValueContainsCityFromEnum(city: string | null, valuesFromEnum: string[]) {
    if (city === null || city === undefined) {
      return false;
    };
    return valuesFromEnum.some(value => city.includes(value));
  };

  async allElementsAreTrue(array: boolean[]) {
    return array.every(value => value === true);
  };
};