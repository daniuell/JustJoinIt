import HeaderComponent from '../pageObject/components/headerComponent';
import HomePage from '../pageObject/homePage';
import CookiesView from '../pageObject/views/cookiesView';
import { test as baseTest } from '@playwright/test';
import MoreFilterView from '../pageObject/views/filter/moreFilterView';
import LocationView from '../pageObject/views/filter/locationView';
import BasePage from '../pageObject/basePage';
import SignInView from '../pageObject/views/header/signInView';
import LoginPage from '../pageObject/loginPage';
import CurrencyDropdownView from '../pageObject/views/header/currencyDropdownView';

const test = baseTest.extend<{

  basePage: BasePage;
  homepage: HomePage;
  loginPage: LoginPage;

  //Components
  headerComponent: HeaderComponent;

  //Views
  moreFilterView: MoreFilterView;
  cookiesView: CookiesView;
  locationView: LocationView;
  signInView: SignInView;
  currencyDropdownView: CurrencyDropdownView;

}>({
  basePage: async ({ page }, use) => {
    await use(new BasePage(page))
  },
  homepage: async ({ page }, use) => {
    await use(new HomePage(page))
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page))
  },

  //Components
  headerComponent: async ({ page }, use) => {
    await use(new HeaderComponent(page))
  },

  //Views
  cookiesView: async ({ page }, use) => {
    await use(new CookiesView(page))
  },
  moreFilterView: async ({ page }, use) => {
    await use(new MoreFilterView(page))
  },
  locationView: async ({ page }, use) => {
    await use(new LocationView(page))
  },
  signInView: async ({ page }, use) => {
    await use(new SignInView(page))
  },
  currencyDropdownView: async ({ page }, use) => {
    await use(new CurrencyDropdownView(page))
  },
});

export default test