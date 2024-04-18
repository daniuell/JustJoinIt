import { expect } from '@playwright/test';
import test from '../fixtures/basePage.fixture'
import { DropdownValues, HomepageBackgroundColors } from '../enums/homepage';

test.describe('Cookies test', () => {

    test.beforeEach(async ({ page, cookiesViews }) => {
        await page.goto('');
        await cookiesViews.acceptCookies();
    });

    test('Change site mode from light to dark', async ({ homepage, headerComponent }) => {

        await expect(headerComponent.headerBackground).toHaveCSS('background-color', HomepageBackgroundColors.Light);

        await homepage.changeSiteModeDarkLight();

        await expect(headerComponent.headerBackground).toHaveCSS('background-color', HomepageBackgroundColors.Dark);
    });
    test('The user can filter offers with operating mode - remote', async ({ homepage }) => {

        await homepage.remoteOnlySwitchOn.click();

        await expect(homepage.remoteOnlySwitchOff).toBeInViewport();

        await homepage.remoteOnlySwitchOff.click();

        await expect(homepage.remoteOnlySwitchOn).toBeInViewport();
    });
    test('The user can click drop-down filter and can see 4 options', async ({ homepage }) => {

        await expect(homepage.dropDownCurrentValue).toHaveText(DropdownValues.Default);

        await homepage.sortOffersDropDownButton.click();

        await expect(homepage.dropDownDefault).toBeInViewport();
        await expect(homepage.dropDownLatest).toBeInViewport();
        await expect(homepage.dropDownHighestSalary).toBeInViewport();
        await expect(homepage.dropDownLowestSalary).toBeInViewport();
    });
    test('The user can filter offers by latest one', async ({ homepage }) => {

        await expect(homepage.dropDownCurrentValue).toHaveText(DropdownValues.Default);

        await homepage.sortOffersDropDownButton.click();

        await expect(homepage.dropDownLatest).toBeInViewport();

        await homepage.dropDownLatest.click();

        await expect(homepage.dropDownCurrentValue).toHaveText(DropdownValues.Latest);
    });
    test('The user can filter offers by highest salary', async ({ homepage }) => {

        await expect(homepage.dropDownCurrentValue).toHaveText(DropdownValues.Default);

        await homepage.sortOffersDropDownButton.click();

        await expect(homepage.dropDownLatest).toBeInViewport();

        await homepage.dropDownLatest.click();

        await expect(homepage.dropDownCurrentValue).toHaveText(DropdownValues.Highest);
    });
    test('The user can filter offers by lowest salary', async ({ homepage }) => {

        await expect(homepage.dropDownCurrentValue).toHaveText(DropdownValues.Default);

        await homepage.sortOffersDropDownButton.click();

        await expect(homepage.dropDownLatest).toBeInViewport();

        await homepage.dropDownLatest.click();

        await expect(homepage.dropDownCurrentValue).toHaveText(DropdownValues.Lowest);
    });
});