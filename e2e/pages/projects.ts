import { Locator, Page } from "@playwright/test";
import Base from "./base";

export default abstract class Projects extends Base {
    constructor(page: Page) {
        super(page);
        this.page = page
    }

    protected selectors = {
        projectNameField: '#projectNameField input',
        myBrand: '//div[text()="My Brand"]',
        uploadField: 'input[type="file"]',
        brandIcon: '#brandInput_0',
        categoryField: '#categoryInput_0',
        categorySearchBar: '#categoryInputSearch > input',
        foodDelivery: '//*[text()="Food Delivery"]',
        firstCompetitor: '#competitorInput_0',
        secondCompetitor: '#competitorInput_1',
        competitorListSuggested: '#competitorInput > div > div:nth-child(2)',
        competitor: 'label:nth-child',
        continueBtn: '#continueBtn',
        categoryErrorMessage: '//span[text()="Please select one category."]',
        competitorErrorMessage: '//span[text()="Please select at least two competitors."]',
        sampleDefinitionPopUp: '#ModalStartProjectTest',
        sampleDefinitionPopUpHeader: '#ModalStartProjectTest h2',
        closePopUpBtn: '#Content > div:nth-child(4) > div > button'
    }

    protected abstract specificSelectors: Object;


    get projectNameField(): Locator {
        return this.page.locator(this.selectors.projectNameField)
    }

    get myBrand(): Locator {
        return this.page.locator(this.selectors.myBrand)
    }

    get brandIcon(): Locator {
        return this.page.locator(this.selectors.brandIcon)
    }

    get categoryField(): Locator {
        return this.page.locator(this.selectors.categoryField)
    }

    get categorySearchBar(): Locator {
        return this.page.locator(this.selectors.categorySearchBar)
    }

    get foodDelivery(): Locator {
        return this.page.locator(this.selectors.foodDelivery)
    }

    get firstCompetitor(): Locator {
        return this.page.locator(this.selectors.firstCompetitor)
    }

    get secondCompetitor(): Locator {
        return this.page.locator(this.selectors.secondCompetitor)
    }

    get competitorListSuggested(): Locator {
        return this.page.locator(this.selectors.competitorListSuggested)
    }

    get continueBtn(): Locator {
        return this.page.locator(this.selectors.continueBtn)
    }

    get categoryErrorMessage(): Locator {
        return this.page.locator(this.selectors.categoryErrorMessage)
    }

    get competitorErrorMessage(): Locator {
        return this.page.locator(this.selectors.competitorErrorMessage)
    }

    get sampleDefinitionPopUp(): Locator {
        return this.page.locator(this.selectors.sampleDefinitionPopUp)
    }

    get sampleDefinitionPopUpHeader(): Locator {
        return this.page.locator(this.selectors.sampleDefinitionPopUpHeader)
    }

    get closePopUpBtn(): Locator {
        return this.page.locator(this.selectors.closePopUpBtn)
    }

    async insertProjectName(projectName: string): Promise<void> {
        await this.type(this.projectNameField, projectName);
        await this.myBrand.click();
    }

    async selectCategory(categoryName: string, category: Locator): Promise<void> {
        await this.categoryField.click();
        await this.type(this.categorySearchBar, categoryName);
        await category.click();
    }

    async selectCompetitor(competitor: Locator, index: number) {
        await competitor.click();
        await this.competitorListSuggested
            .locator(`${this.selectors.competitor}(${index})`)
            .click();
        await this.page.waitForTimeout(500);
    }

    async continueProject(): Promise<void> {
        await this.continueBtn.click()
    }

    async closePopUp(): Promise<void> {
        await this.closePopUpBtn.click()
    }
}
