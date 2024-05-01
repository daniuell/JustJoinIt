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

  visibilityOfSearchLocators = [this.searchBar, this.location, this.moreFiltersButton];

  //Offers 
  offersWithSalaryButton = this.page.locator('//button[contains(@id,"T-salaryOnly")]');
  allOffersButton = this.page.locator('//button[contains(@id,"-allOffers")]');

  //Remote offers switch
  remoteOnlySwitchOn = this.page.locator('//span[contains(@class,"MuiSwitch-sizeSmall")]//input[@type="checkbox"]');
  remoteOnlySwitchOff = this.page.locator('//span[contains(@class,"Mui-checked")]');

  //City from offers
  offerCityCount = this.page.locator('//*[@data-testid="PlaceOutlinedIcon"]//..//div/span[1]');
  offerCity(index: number) { return this.page.locator(`(//*[@data-testid="PlaceOutlinedIcon"]//..//div/span[1])[${index}]`) };

  //Selected city from location(pattern: Work: location name)
  offerMenuWorkTitle = this.page.locator("//div[contains(@class,'MuiBox-root')]//span[text()='Work: ']")
  offerMenuWorkInCity(city: string) { return this.page.locator(`//div[contains(@class,"MuiBox-root")]//span[text()="Work: "]//following-sibling::span[text()="${city}"]`) };

  //Salary from offers
  offerSalaryRangeMin = this.page.locator('//*[@data-test-id="virtuoso-item-list"]//h2//..//div/span[position() mod 3 = 1]')
  offerSalaryRangeMax = this.page.locator('//*[@data-test-id="virtuoso-item-list"]//h2//..//div/span[position() mod 3 = 2]')
  offerSalaryRangeCurrencyCount = this.page.locator('//*[@data-test-id="virtuoso-item-list"]//h2//..//div/span[position() mod 3 = 0]')
  offerSalaryRangeCurrency(index: number) { return this.page.locator(`(//*[@data-test-id="virtuoso-item-list"]//h2//..//div/span[position() mod 3 = 0])[${index}]`) }

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

  async openmoreFilterView() {
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