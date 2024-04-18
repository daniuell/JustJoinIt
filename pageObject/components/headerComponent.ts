import { Page } from '@playwright/test'

export default class HeaderComponent {

  headerBackground = this.page.locator("//header");
  jobOffers = this.page.locator('[class="header_offers_link"]');
  topCompaniesheader = this.page.locator('[class="header_brandStory_link"]');
  geekheader = this.page.locator('[class="header_jjitGeek_link"]');
  postAJob = this.page.locator('[class="header_brandStory_link"]');
  signInButton = this.page.locator('//button[@type="button"]/div[text()="Sign in"]');
  jobAlertButton = this.page.locator('[name="header_job_alerts_button"]');

  currencyDropDown = this.page.locator('//header//button[@data-sp-button-label="icon-button"]');
  currencyDropDownTitle = this.page.getByRole('heading', { name: "Select your currency" });

  constructor(private page: Page) {
    this.page = page;
  };W
};