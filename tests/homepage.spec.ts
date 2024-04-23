import { expect } from '@playwright/test';
import test from '../fixtures/basePage.fixture'
import { Category, DropdownValues, HomepageBackgroundColors } from '../enums/homepage';
import { TopCitiesPoland, CitiesRelatedToSilesia, CitiesRelatedToTricity } from '../enums/locationForm';

test.describe('Cookies test', () => {

    test.beforeEach(async ({ page, cookiesViews }) => {
        await page.goto('');
        await cookiesViews.acceptCookies();
        await cookiesViews.waitForPageToLoad();
    });

    test('Id = 1 | Header elements visibility', async ({ headerComponent }) => {

        const locators = [headerComponent.companyLogo, headerComponent.lightDarkModeSwitch, headerComponent.jobOffersButton, headerComponent.topCompaniesButton, headerComponent.geekButton, headerComponent.postAJobButton, headerComponent.signInButton, headerComponent.jobAlertButton, headerComponent.currencyDropDownButton, headerComponent.sideMenuIcon];

        expect(await headerComponent.isLoaded(locators)).toBe(true);
    });
    test('Id = 2 | Change site mode from light to dark', async ({ headerComponent }) => {

        await expect(headerComponent.headerBackground).toHaveCSS('background-color', HomepageBackgroundColors.Light);

        await headerComponent.changeSiteModeDarkLight();

        await expect(headerComponent.headerBackground).toHaveCSS('background-color', HomepageBackgroundColors.Dark);
    });
    test('Id = 3 | Job offers button takes the user to the offers page', async ({ headerComponent, page }) => {

        await headerComponent.jobOffersButton.click();
        await headerComponent.waitForPageToLoad();

        await expect(page).toHaveURL('');
    });
    test('Id = 4 | Top Companies button takes you to the top companies page', async ({ headerComponent, page }) => {

        await headerComponent.topCompaniesButton.click();
        await headerComponent.waitForPageToLoad();

        await expect(page).toHaveURL(/brands/);
    });
    test('Id = 5 | The geekButton button takes you to the blog', async ({ headerComponent, page }) => {

        await headerComponent.geekButton.click();

        const [newPage] = await Promise.all([
            await page.waitForEvent('popup'),
            await page.setViewportSize({ width: 1920, height: 1000 }),
            await page.waitForLoadState(),
        ]);

        await expect(newPage).toHaveURL('https://geek.justjoin.it');
    });
    test('Id = 6 | The Post a job button takes the user to the page with the prices for the publication of offers', async ({ headerComponent, page }) => {

        await headerComponent.postAJobButton.click();
        await headerComponent.waitForPageToLoad();

        await expect(page).toHaveURL(/pricing/);
    });
    test('Id = 7 | The Sign in button opens a drop-down menu with two options', async ({ headerComponent, signInViews }) => {

        await headerComponent.signInButton.click();

        await expect(signInViews.signInDropDownMenu).toBeInViewport();
        await expect(signInViews.signInCandidateButton).toBeInViewport();
        await expect(signInViews.signInEmployerButton).toBeInViewport();
    });
    test('ID = 14 | The user can sort job offers by the most popular cities in poland', async ({ homepage, locationViews, page, moreFilterViews }) => {

        const randomCity = await moreFilterViews.randomProperty(TopCitiesPoland);

        await homepage.location.click();
        await locationViews.selectCityFromFilter(randomCity);
        await locationViews.showOffersButton.click();
        await page.waitForLoadState('networkidle');

        await expect(homepage.offerMenuWorkTitle).toBeInViewport();
        await expect(homepage.offerMenuWorkInCity(randomCity)).toBeInViewport();

        const countJobOffer = await homepage.offerCityCount.count();

        if (randomCity === TopCitiesPoland.Silesia) {
            expect(await homepage.checkMultiCitiesFromOffers(countJobOffer, Object.values(CitiesRelatedToSilesia))).toBe(true);
        }
        else if (randomCity === TopCitiesPoland.Tricity) {
            expect(await homepage.checkMultiCitiesFromOffers(countJobOffer, Object.values(CitiesRelatedToTricity))).toBe(true);
        }
        else {
            expect(await homepage.checkSingleCitiesFromOffers(countJobOffer, randomCity)).toBe(true);
        }
    });
    test('ID = 17 | The user can see all offer category from menu', async ({ homepage }) => {

        const countCategories = await homepage.countCategory.count();
        const categories = Object.values(Category);

        for (let i = 1; i < countCategories; i++) {
            await expect(homepage.selectCategory(categories[i])).toBeInViewport();
        };
    });
    test('ID = 21 | The user can filter offers with operating mode - remote', async ({ homepage }) => {

        await homepage.remoteOnlySwitchOn.click();

        await expect(homepage.remoteOnlySwitchOff).toBeInViewport();

        await homepage.remoteOnlySwitchOff.click();

        await expect(homepage.remoteOnlySwitchOn).toBeInViewport();
    });
    test('ID = 22 | The user can click drop-down filter and can see 4 options', async ({ homepage }) => {

        await expect(homepage.dropDownCurrentValue).toHaveText(DropdownValues.Default);

        await homepage.sortOffersDropDownButton.click();

        await expect(homepage.dropDownDefault).toBeInViewport();
        await expect(homepage.dropDownLatest).toBeInViewport();
        await expect(homepage.dropDownHighestSalary).toBeInViewport();
        await expect(homepage.dropDownLowestSalary).toBeInViewport();
    });
    test('ID = 22 different option | The user can filter offers by latest one', async ({ homepage }) => {

        await expect(homepage.dropDownCurrentValue).toHaveText(DropdownValues.Default);

        await homepage.sortOffersDropDownButton.click();

        await expect(homepage.dropDownLatest).toBeInViewport();

        await homepage.dropDownLatest.click();

        await expect(homepage.dropDownCurrentValue).toHaveText(DropdownValues.Latest);
    });
    test('ID = 22 different option | The user can filter offers by highest salary', async ({ homepage }) => {

        await expect(homepage.dropDownCurrentValue).toHaveText(DropdownValues.Default);

        await homepage.sortOffersDropDownButton.click();

        await expect(homepage.dropDownHighestSalary).toBeInViewport();

        await homepage.dropDownHighestSalary.click();

        await expect(homepage.dropDownCurrentValue).toHaveText(DropdownValues.Highest);
    });
    test('ID = 22 different option | The user can filter offers by lowest salary', async ({ homepage }) => {

        await expect(homepage.dropDownCurrentValue).toHaveText(DropdownValues.Default);

        await homepage.sortOffersDropDownButton.click();

        await expect(homepage.dropDownLowestSalary).toBeInViewport();

        await homepage.dropDownLowestSalary.click();

        await expect(homepage.dropDownCurrentValue).toHaveText(DropdownValues.Lowest);
    });
});