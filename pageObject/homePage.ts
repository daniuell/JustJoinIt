import { Page } from '@playwright/test'

export default class HomePage {

  //Page body
  pageBody = this.page.locator('[id="__next"]').first();

  //Search and filter
  searchBar = this.page.locator('[placeholder="Search"]');
  location = this.page.locator('[name="location_filter_button"]');
  moreFiltersButton = this.page.locator('[name="more_filters_button"]');
  selectCategory(category: string) { return this.page.locator(`//div[contains(@class,"MuiBox")]//a[contains(@href,"${category}") and contains(@class,"offer_list_category_link")]`).last() };
  countCategory = this.page.locator('//a[contains(@class,"offer_list_category_link")]');

  //Offers 
  offersWithSalaryButton = this.page.getByRole('button', { name: "Offers with salary" });
  allOffersButton = this.page.locator('//button[contains(@id,"-allOffers")]');
  remoteOnlySwitchOn = this.page.locator('//span[contains(@class,"MuiSwitch-sizeSmall")]//input[@type="checkbox"]');
  remoteOnlySwitchOff = this.page.locator('//span[contains(@class,"Mui-checked")]');

  offerCityCount = this.page.locator('//*[@data-testid="PlaceOutlinedIcon"]//..//div/span[1]');
  offerCity(index: number) { return this.page.locator(`(//*[@data-testid="PlaceOutlinedIcon"]//..//div/span[1])[${index}]`) };
  offerMenuWorkTitle = this.page.locator("//div[contains(@class,'MuiBox-root')]//span[text()='Work: ']")
  offerMenuWorkInCity(city: string) { return this.page.locator(`//div[contains(@class,"MuiBox-root")]//span[text()="Work: "]//following-sibling::span[text()="${city}"]`) };

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

  async openMoreFilterViews() {
    await this.moreFiltersButton.click();
  };

  async checkSingleCitiesFromOffers(count: number, randomCity: string) {

    const cityValueFromPage: boolean[] = [];

    for (let i = 1; i < count; i++) {
      const cityFromPage = (await this.offerCity(i).textContent());
      const result = cityFromPage === randomCity;
      cityValueFromPage.push(result);
    };
    return await this.allElementsAreTrue(cityValueFromPage);
  };

  async checkMultiCitiesFromOffers(count: number, citiesFromEnum: string[]) {

    const cityValueFromPage: boolean[] = [];

    for (let i = 1; i < count; i++) {
      const cities = Object.values(citiesFromEnum) as string[];
      const cityFromPage = (await this.offerCity(i).textContent());
      const result = await this.locatorValueContainsCityFromEnum(cityFromPage, cities);
      cityValueFromPage.push(result);
    };
    return await this.allElementsAreTrue(cityValueFromPage);
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