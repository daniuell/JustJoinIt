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

        //Arrange
        const salaryMin = generateRandomSalary(4);
        const salaryMax = generateRandomSalary(5);
        const randomExperience = await moreFilterViews.randomProperty(SelectExperience);
        const randomEmployment = await moreFilterViews.randomProperty(SelectEmployment);
        const randomTypeOfWork = await moreFilterViews.randomProperty(SelectTypeOfWork);

        //Assert
        await expect(moreFilterViews.moreFilters).toBeInViewport();

        //Act 
        await moreFilterViews.fillMinMaxSalary(salaryMin, salaryMax);

        //Assert 
        await expect(moreFilterViews.salaryMinInput).toHaveValue(salaryMin);
        await expect(moreFilterViews.salaryMinInput).toHaveValue(salaryMin);
        await expect(moreFilterViews.friendlyOfferTurnedOff).toBeInViewport();

        //Act 
        await moreFilterViews.checkFriendlyOffer();

        //Assert 
        await expect(moreFilterViews.friendlyOfferTurnedOn).toBeInViewport();

        //Act 
        await moreFilterViews.selectExperience(randomExperience);

        //Assert 
        await expect(moreFilterViews.experience(randomExperience)).toBeChecked();

        //Act 
        await moreFilterViews.selectEmployment(randomEmployment);

        //Assert 
        await expect(moreFilterViews.employment(randomEmployment)).toBeChecked();

        //Act 
        await moreFilterViews.selectWorkType(randomTypeOfWork);

        //Assert 
        await expect(moreFilterViews.workType(randomTypeOfWork)).toBeChecked();

        //Act
        await moreFilterViews.showOfferButton.click();

        //Assert 
        await expect(moreFilterViews.moreFilters).not.toBeInViewport();
    });
});

