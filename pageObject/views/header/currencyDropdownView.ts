import { Page } from "@playwright/test";

export default class CurrencyDropdownView {

  currencyDropDownButton = this.page.locator('//header//button[@data-sp-button-label="icon-button"]').nth(1);
  currencyDropDownTitle = this.page.getByRole('heading', { name: "Select your currency" });

  offerCurrentCurrentyCount = this.page.locator('//*[@data-test-id="virtuoso-item-list"]//div/h2//..//div/div/span[3]');
  offerCurrentCurrency(index: number) { return this.page.locator(`(//*[@data-test-id="virtuoso-item-list"]//div/h2//..//div/div/span[3])[${index}]`) };

  pln = this.page.locator('//*[@type="button"]/div[text()="PLN"]');
  eur = this.page.locator('//*[@type="button"]/div[text()="EUR"]');
  usd = this.page.locator('//*[@type="button"]/div[text()="USD"]');
  gbp = this.page.locator('//*[@type="button"]/div[text()="GBP"]');
  chf = this.page.locator('//*[@type="button"]/div[text()="CHF"]');
  def = this.page.locator('//*[@type="button"]/div[text()="DEF"]');

  availableCurrencies = [this.pln, this.eur, this.usd, this.gbp, this.chf, this.def]

  constructor(private page: Page) {
    this.page = page;
  };
}