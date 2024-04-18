import { expect } from '@playwright/test';
import test from '../fixtures/basePage.fixture'
import { generateRandomSalary } from '../tools/utils';
import { SelectEmployment, SelectExperience, SelectTypeOfWork } from '../enums/moreFilters';

test.describe('More filters tests', () => {

    test.beforeEach(async ({ page, cookiesViews, homepage }) => {

        await page.goto('');
        await cookiesViews.acceptCookies();
        await homepage.openMoreFilterViews();

    });

    test('Fill all more filters options', async ({ moreFilterViews }) => {

        const salaryMin = generateRandomSalary(4);
        const salaryMax = generateRandomSalary(5);
        const randomExperience = await moreFilterViews.randomProperty(SelectExperience);
        const randomEmployment = await moreFilterViews.randomProperty(SelectEmployment);
        const randomTypeOfWork = await moreFilterViews.randomProperty(SelectTypeOfWork);

        await expect(moreFilterViews.moreFilters).toBeInViewport();

        await moreFilterViews.fillMinMaxSalary(salaryMin, salaryMax);

        await expect(moreFilterViews.salaryMinInput).toHaveValue(salaryMin);
        await expect(moreFilterViews.salaryMinInput).toHaveValue(salaryMin);
        await expect(moreFilterViews.friendlyOfferTurnedOff).toBeInViewport();

         
        await moreFilterViews.checkFriendlyOffer();

        await expect(moreFilterViews.friendlyOfferTurnedOn).toBeInViewport();

        await moreFilterViews.selectExperience(randomExperience);

        await expect(moreFilterViews.experience(randomExperience)).toBeChecked();

        await moreFilterViews.selectEmployment(randomEmployment);

        await expect(moreFilterViews.employment(randomEmployment)).toBeChecked();

        await moreFilterViews.selectWorkType(randomTypeOfWork);

        await expect(moreFilterViews.workType(randomTypeOfWork)).toBeChecked();

        await moreFilterViews.showOfferButton.click();

        await expect(moreFilterViews.moreFilters).not.toBeInViewport();
    });
});

