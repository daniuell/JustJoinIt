import { Page } from "@playwright/test";
export default class LoginPage {

  signInWithEmailButton = this.page.locator('[name="button-login-link"]');
  email = this.page.locator('[name="email"]');
  password = this.page.locator('[name="password"]');
  confirmLoginButton = this.page.locator('[type="submit"]');

  constructor(private page: Page) {
    this.page = page;
  };

  async loginAsUser(login: string, password: string) {
    await this.email.fill(login);
    await this.password.fill(password);
    await this.confirmLoginButton.click();
  };

};