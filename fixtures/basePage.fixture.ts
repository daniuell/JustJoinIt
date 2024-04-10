import HeaderComponent from '../pageObject/components/headerComponent';
import HomePage from '../pageObject/homePage';
import CookiesViews from '../pageObject/views/cookiesViews';

import { test as baseTest } from '@playwright/test';

const test = baseTest.extend<{
  homepage: HomePage;
  cookiesViews: CookiesViews;
  headerComponent: HeaderComponent
}>({
  homepage: async ({ page }, use) => {
    await use(new HomePage(page))
  },
  cookiesViews: async ({ page }, use) => {
    await use(new CookiesViews(page))
  },
  headerComponent: async ({ page }, use) => {
    await use(new HeaderComponent(page))
  },
});

export default test