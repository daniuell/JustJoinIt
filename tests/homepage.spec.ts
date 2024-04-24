import { expect } from '@playwright/test';
import test from '../fixtures/basePage.fixture'
import { Category, DropdownValues, HomepageBackgroundColors } from '../enums/homepage';
import { TopCitiesPoland, CitiesRelatedToSilesia, CitiesRelatedToTricity } from '../enums/locationForm';

test.describe('Test cases based on excel file', () => {

    test.beforeEach(async ({ page, cookiesViews }) => {
        await page.goto('');
        await cookiesViews.acceptCookies();
        await page.waitForLoadState();
    });

    test('TC_001 | Verify the visibility of the header and its elements.', async ({ headerComponent }) => {

        const locators = [headerComponent.companyLogo, headerComponent.lightDarkModeSwitch, headerComponent.jobOffersButton, headerComponent.topCompaniesButton, headerComponent.geekButton, headerComponent.postAJobButton, headerComponent.signInButton, headerComponent.jobAlertButton, headerComponent.currencyDropDownButton, headerComponent.sideMenuIcon];

        expect(await headerComponent.isLoaded(locators)).toBe(true);
    });
    test('Tc_002 | Ensure that the day/night mode toggle button operates as expected, allowing users to switch between day and night modes seamlessly', async ({ headerComponent }) => {

        await expect(headerComponent.headerBackground).toHaveCSS('background-color', HomepageBackgroundColors.Light);

        await headerComponent.changeSiteModeDarkLight();

        await expect(headerComponent.headerBackground).toHaveCSS('background-color', HomepageBackgroundColors.Dark);
    });
    test('Tc_003 | Clicking the "Job Offers" button from the header redirects the user to the main job offers page.', async ({ headerComponent, page }) => {

        await headerComponent.jobOffersButton.click();
        await headerComponent.waitForPageToLoad();

        await expect(page).toHaveURL('');
    });
    test('Tc_004 | Clicking the "Top Companies" button from the header redirects the user to the page showcasing top companies.', async ({ headerComponent, page }) => {

        await headerComponent.topCompaniesButton.click();
        await headerComponent.waitForPageToLoad();

        await expect(page).toHaveURL(/brands/);
    });
    test('Tc_005 | Clicking the "Geek" button from the header redirects the user to the blog page.', async ({ headerComponent, page }) => {

        await headerComponent.geekButton.click();

        const [newPage] = await Promise.all([
            await page.waitForEvent('popup'),
            await page.setViewportSize({ width: 1920, height: 1000 }),
            await page.waitForLoadState(),
        ]);

        await expect(newPage).toHaveURL('https://geek.justjoin.it');
    });
    test('Tc_006 | Clicking the "Post a Job" button from the header redirects the user to the page displaying pricing for posting job offers.', async ({ headerComponent, page }) => {

        await headerComponent.postAJobButton.click();
        await headerComponent.waitForPageToLoad();

        await expect(page).toHaveURL(/pricing/);
    });
    test('Tc_007 | The Sign in button opens a drop-down menu with two options', async ({ headerComponent, signInViews }) => {

        await headerComponent.signInButton.click();

        await expect(signInViews.signInDropDownMenu).toBeInViewport();
        await expect(signInViews.signInCandidateButton).toBeInViewport();
        await expect(signInViews.signInEmployerButton).toBeInViewport();
    });
    test('Tc_0014 | "As a user, I can use the ""Location"" filter by selecting a city from "Top Poland.', async ({ homepage, locationViews, page, moreFilterViews }) => {

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
    test('Tc_00 17 | As a user, I can utilize the category filter to select job offers that interest me.', async ({ homepage }) => {

        const countCategories = await homepage.countCategory.count();
        const categories = Object.values(Category);

        for (let i = 1; i < countCategories; i++) {
            await expect(homepage.selectCategory(categories[i])).toBeInViewport();
        };
    });
    test('Tc_00 20 | As a user, I want to filter job offers to display only remote positions to facilitate my job search process.', async ({ homepage }) => {

        await homepage.remoteOnlySwitchOn.click();

        await expect(homepage.remoteOnlySwitchOff).toBeInViewport();

        await homepage.remoteOnlySwitchOff.click();

        await expect(homepage.remoteOnlySwitchOn).toBeInViewport();
    });
});