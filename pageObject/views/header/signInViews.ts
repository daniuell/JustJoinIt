import { Page } from "@playwright/test";

export default class SignInViews {

  signInDropDownMenu = this.page.locator('//ul[@role="menu"]');
  signInCandidateButton = this.page.locator('//ul[@role="menu"]//*[@role="menuitem"]').first();
  signInEmployerButton = this.page.locator('//ul[@role="menu"]//*[@role="menuitem"]').last();

  constructor(private page: Page) {
    this.page = page;
  };

};