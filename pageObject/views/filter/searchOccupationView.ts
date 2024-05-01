import { Page } from "@playwright/test";

export default class SearchOccupationView {

  keyword = this.page.locator('//div[text()="Keyword"]');
  keywordOption = this.page.locator('//div[text()="Keyword"]//..//li').first();
  selectedKeyword = this.page.locator('//span[contains(@class,"MuiChip-label MuiChip-labelMedium")]');
  skills = this.page.locator('//div[text()="Skills"]');
  skillsOption = this.page.locator('//div[text()="Skills"]//..//li').first();
  position = this.page.locator('//div[text()="Position"]');
  positionOption = this.page.locator('//div[text()="Position"]//..//li').first();

  locators = [this.keyword, this.keywordOption, this.skills, this.skillsOption, this.position, this.positionOption]

  constructor(private page: Page) {
    this.page = page;
  };

};