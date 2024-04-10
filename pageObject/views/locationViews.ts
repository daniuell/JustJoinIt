import { Page } from '@playwright/test'

export default class LocationViews {

	locationForm = this.page.locator('[id="filters-location-modal-form"]');
	addressInputField = this.page.locator('[placeholder="Where do you want to work?"]');
	showOffersButton = this.page.getByRole('button', { name: "Show offers" });
	clearFiltersButton = this.page.getByRole('button', { name: "Clear filters" });

	topLocations(location: string) { return this.page.locator(`//*[@name="location_modal_${location}_button"]`) };

	constructor(private page: Page) {
		this.page = page;
	};

};