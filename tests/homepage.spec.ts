import { expect } from '@playwright/test';
import test from '../fixtures/basePage.fixture'
import { HomepageBackgroundColors } from '../enums/homepage.dicts';

test.describe('Cookies test', () => {

    test.beforeEach(async ({ page, cookiesViews }) => {
        await page.goto('');
        await cookiesViews.acceptCookies();
    });

    test('Change site mode from light to dark', async ({ homepage, headerComponent }) => {

        //Assert
        await expect(headerComponent.headerBackground).toHaveCSS('background-color', HomepageBackgroundColors.Light);

        //Act
        await homepage.changeSiteModeDarkLight();

        //Assert
        await expect(headerComponent.headerBackground).toHaveCSS('background-color', HomepageBackgroundColors.Dark);
    })
});

