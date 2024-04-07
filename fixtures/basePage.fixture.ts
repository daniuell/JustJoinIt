import HomePage from '../pageObject/homePage';
import { test as baseTest } from '@playwright/test';

const test = baseTest.extend<{
  homepage: HomePage;
}>({
  homepage: async ({ page }, use) => {
    await use(new HomePage(page))
  },
});

export default test
