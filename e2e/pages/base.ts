import { Page, Locator } from "@playwright/test";

export default abstract class Base {
    protected page: Page
    constructor(page: Page) {
        this.page = page;
    }

    protected abstract selectors: Object;

    async goTo(url: string) {
        await this.page.goto(url);
    }

    protected async type(element: Locator, text: string) {
        await element.type(text);
    }
}
