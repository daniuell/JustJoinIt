
import { Page } from '@playwright/test'

export default class MoreFilterViews {

  salaryMinInput = this.page.locator('[id=":r7:"]');
  salaryMaxInput = this.page.locator('[id=":r8:"]');
  sliderMinValue = this.page.locator('')
  constructor(private page: Page) {
    this.page = page;
  };

};