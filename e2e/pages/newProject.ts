import { Locator, Page } from "@playwright/test";
import Base from "./base";

export default class NewProject extends Base {
    constructor(page: Page) {
        super(page);
        this.page = page;
    }

    protected selectors = {
        goBackBtn: '#NewProject_GoBack > span',
        conceptTestTab: '#NewProject_ProjectTiles_Concept-test',
        videoPreTest: '#NewProject_ProjectTiles_Video-pre-test',
        impactTest: '#NewProject_ProjectTiles_Impact-test',
        setUpBtn: '#setUpBtn',
        newProjectInfo: '.container',
        shadowSkipBtn: '//button[text()="Skip"]'
    }

    get goBackBtn(): Locator {
        return this.page.locator(this.selectors.goBackBtn)
    }

    get conceptTestTab(): Locator {
        return this.page.locator(this.selectors.conceptTestTab)
    }

    get videoPreTest(): Locator {
        return this.page.locator(this.selectors.videoPreTest)
    }

    get impactTest(): Locator {
        return this.page.locator(this.selectors.impactTest)
    }

    get setUpBtn(): Locator {
        return this.page.locator(this.selectors.setUpBtn)
    }

    get shadowSkipBtn(): Locator {
        return this.page.locator(this.selectors.shadowSkipBtn)
    }

    async goBackToProjects(): Promise<void> {
        await this.goBackBtn.click();
    }

    async setUpProject(projectType: Locator): Promise<void> {
        await this.page.waitForTimeout(1000);
        await projectType.click();
        await this.setUpBtn.click();
        if(await this.shadowSkipBtn.isVisible())
            await this.shadowSkipBtn.click();
    }
}
