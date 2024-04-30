import { Page, _baseTest } from '@playwright/test'
import BasePage from '../basePage';

export default class HeaderComponent extends BasePage {

  headerBackground = this.page.locator("//header");

  companyLogo = this.page.locator('[data-name="Warstwa 1"]');
  lightDarkModeSwitch = this.page.locator('//header//label');

  jobOffersButton = this.page.locator('[class="header_offers_link"]');
  topCompaniesButton = this.page.locator('[class="header_brandStory_link"]');
  geekButton = this.page.locator('[class="header_jjitGeek_link"]');

  postAJobButton = this.page.locator('//header//div[text()="Post a job"]');
  jobAlertButton = this.page.locator('[name="header_job_alerts_button"]');
  currencyDropDownButton = this.page.locator('//header//button[@data-sp-button-label="icon-button"]').nth(1);
  currencyDropDownTitle = this.page.getByRole('heading', { name: "Select your currency" });
  sideMenuIcon = this.page.locator('//header//*[@name="sidebar-open"]');

  //Sign in
  signInButton = this.page.locator('//*[@type="button"]/div[text()="Sign in"]');
  signInMenu = this.page.locator('//*[@role="menu"]');
  signInMenuCandidate = this.page.locator('//*[@role="menu"]//button').nth(0);
  signInMenuEmployer = this.page.locator('//*[@role="menu"]//button').nth(1);

  locatorsAreLoaded = [this.companyLogo, this.lightDarkModeSwitch, this.jobOffersButton, this.topCompaniesButton, this.geekButton, this.postAJobButton, this.signInButton, this.jobAlertButton, this.currencyDropDownButton, this.sideMenuIcon];

  constructor(page: Page) {
    super(page);
  };

  async changeSiteModeDarkLight() {
    await this.lightDarkModeSwitch.click();
  };
};