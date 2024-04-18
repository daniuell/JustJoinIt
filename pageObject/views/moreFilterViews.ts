import { Page } from '@playwright/test'
import { SelectEmployment, SelectExperience, SelectTypeOfWork } from '../../enums/moreFilters';

export default class MoreFilterViews {

  //More filters views
  moreFilters = this.page.locator('[role="dialog"]')

  //Salary inputs
  salaryMinInput = this.page.locator('(//input[@inputmode="numeric"])[1]');
  salaryMaxInput = this.page.locator('(//input[@inputmode="numeric"])[2]');

  //Salary slider
  sliderMinValue = this.page.locator('(//*[@type="range"])[1]');
  sliderMaxValue = this.page.locator('(//*[@type="range"])[2]');

  //Friendly offer
  friendlyOfferTurnOnOffButton = this.page.locator('[id="ukraineFriendly"]')
  friendlyOfferTurnedOff = this.page.locator('//span[not(contains(@class,"Mui-checked"))]/*[@id="ukraineFriendly"]');
  friendlyOfferTurnedOn = this.page.locator('//span[contains(@class,"Mui-checked")]/*[@id="ukraineFriendly"]');

  //Experience options select
  experience(experience: string) {
    return this.page.locator(`//input[@name="experienceLevels-${experience}"]`);
  };

  //Employment type
  employment(employment: string) {
    return this.page.locator(`//*[@name="employmentTypes-${employment}"]`);
  };

  //Type of work
  workType(employment: string) {
    return this.page.locator(`//*[@name="workingTimes-${employment}"]`);
  };

  showOfferButton = this.page.getByRole('button', { name: "Show offers" })

  constructor(private page: Page) {
    this.page = page;
  };

  async fillMinMaxSalary(salaryMin: string, salaryMax: string) {

    await this.salaryMinInput.fill(salaryMin);
    await this.salaryMaxInput.fill(salaryMax);
  };

  async checkFriendlyOffer() {
    await this.friendlyOfferTurnOnOffButton.click();
  };

  async selectExperience(exp: SelectExperience) {
    await this.experience(exp).click();
  };

  async selectEmployment(employment: SelectEmployment) {
    await this.employment(employment).click();
  };

  async selectWorkType(workType: SelectTypeOfWork) {
    await this.workType(workType).click();
  };

  async randomProperty(obj: Object) {
    const keys = Object.keys(obj);

    return obj[keys[keys.length * Math.random() << 0]];
  };
};