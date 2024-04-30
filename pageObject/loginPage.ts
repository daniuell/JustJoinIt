import { Page } from "@playwright/test";
import { LoginValidation } from "../enums/login";
export default class LoginPage {

  //Login fields and buttons
  signInWithEmailButton = this.page.locator('[name="button-login-link"]');
  email = this.page.locator('[name="email"]');
  password = this.page.locator('[name="password"]');
  confirmLoginButton = this.page.locator('[type="submit"]');

  //Login error
  loginInputError = this.page.locator('//label[contains(@class,"Mui-error")]');
  loginErrorText = this.page.locator('//p[@id=":r1:-helper-text"]//span').nth(1);
  errorWindow = this.page.locator('[name="failed-login-via-mail-snack"]');
  errowWindowHeaderTitle = this.page.locator(`//*[@name="failed-login-via-mail-snack"]//div[contains(text(),"${LoginValidation.IncorrectPasswordHeaderTitle}")]`);
  errowWindowParagraphText = this.page.locator(`//*[@name="failed-login-via-mail-snack"]//div/p[contains(text(),"${LoginValidation.IncorrectPasswordParagraphText}")]`);

  constructor(private page: Page) {
    this.page = page;
  };

  async loginAsUser(login: string, password: string) {
    await this.email.fill(login);
    await this.password.fill(password);
    await this.confirmLoginButton.click();
  };
};