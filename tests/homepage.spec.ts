import test from '../fixtures/basePage.fixture'

test.describe('Cookies test', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('');
    });

    test('Change site mode', async ({ homepage }) => {

    })
});

