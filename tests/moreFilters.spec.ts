import { expect } from '@playwright/test';
import test from '../fixtures/basePage.fixture'
import { generateRandomSalary } from '../tools/utils';
import { SelectEmployment, SelectExperience, SelectTypeOfWork } from '../enums/moreFilters';

test.describe('More filters tests', () => {

    test.beforeEach(async ({ page, cookiesView, homepage }) => {

        await page.goto('');
        await cookiesView.acceptCookies();
        await homepage.openmoreFilterView();
    });

    test('Tc_00 18 | Fill all more filters options', async ({ moreFilterView }) => {

        const salaryMin = generateRandomSalary(4);
        const salaryMax = generateRandomSalary(5);
        const randomExperience = await moreFilterView.randomProperty(SelectExperience);
        const randomEmployment = await moreFilterView.randomProperty(SelectEmployment);
        const randomTypeOfWork = await moreFilterView.randomProperty(SelectTypeOfWork);

        await expect(moreFilterView.moreFilters).toBeInViewport();

        await moreFilterView.fillMinMaxSalary(salaryMin, salaryMax);

        await expect(moreFilterView.salaryMinInput).toHaveValue(salaryMin);
        await expect(moreFilterView.salaryMinInput).toHaveValue(salaryMin);
        await expect(moreFilterView.friendlyOfferTurnedOff).toBeInViewport();


        await moreFilterView.checkFriendlyOffer();

        await expect(moreFilterView.friendlyOfferTurnedOn).toBeInViewport();

        await moreFilterView.selectExperience(randomExperience);

        await expect(moreFilterView.experience(randomExperience)).toBeChecked();

        await moreFilterView.selectEmployment(randomEmployment);

        await expect(moreFilterView.employment(randomEmployment)).toBeChecked();

        await moreFilterView.selectWorkType(randomTypeOfWork);

        await expect(moreFilterView.workType(randomTypeOfWork)).toBeChecked();

        await moreFilterView.showOfferButton.click();

        await expect(moreFilterView.moreFilters).not.toBeInViewport();
    });
});

