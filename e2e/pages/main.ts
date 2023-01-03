import { ElementHandle, Locator, Page } from "@playwright/test";
import Base from "./base";

export default class Main extends Base {
    constructor(page: Page) {
        super(page);
        this.page = page;
    }

    protected selectors = {
        behavioLogo: '#BehaLogoInApp',
        pageHeader: '#TopMenu > h2',
        projectsLink: '[href="/projects"]',
        pricingLink: '[href="/pricing"]',
        myAccountLink: '#MyAccountLink',
        newProjectBtn: '#NewProjectBtn > a',
        searchBar: '[name="projects-search"]',
        myAccountTab: '#Settings',
        usernameBox: '#Username_AccountPopupMenuItem > div:nth-child(2)',
        workspaceBox: '#Workspace_AccountPopupMenuItem strong',
        projectActionsBtn: 'tr:nth-child(1) td:nth-child(6) > button',
        deleteProjectBtn: 'tr:nth-child(1) td:nth-child(6) a:nth-child(1)',
        confirmDeletePopUp: '//div[text()="Are you sure?"]',
        confirmDeleteBtn: '//button[text()="Delete"]',
        removalSuccessMessage: '//*[text()="Project was successfully removed."]',
        logOutBtn: '#SignOut_AccountPopupMenuItem'
    }

    get behavioLogo(): Locator {
        return this.page.locator(this.selectors.behavioLogo)
    }

    get pageHeader(): Locator {
        return this.page.locator(this.selectors.pageHeader)
    }

    get projectsLink(): Locator {
        return this.page.locator(this.selectors.projectsLink)
    }

    get pricingLink(): Locator {
        return this.page.locator(this.selectors.pricingLink)
    }

    get myAccountLink(): Locator {
        return this.page.locator(this.selectors.myAccountLink)
    }

    get newProjectBtn() {
        return this.page.locator(this.selectors.newProjectBtn)
    }

    get searchBar(): Locator {
        return this.page.locator(this.selectors.searchBar)
    }

    get myAccountTab(): Locator {
        return this.page.locator(this.selectors.myAccountTab)
    }

    get usernameBox(): Locator {
        return this.page.locator(this.selectors.usernameBox)
    }

    get workspaceBox(): Locator {
        return this.page.locator(this.selectors.workspaceBox)
    }

    get projectActionBtn(): Locator {
        return this.page.locator(this.selectors.projectActionsBtn)
    }

    get deleteProjectBtn(): Locator {
        return this.page.locator(this.selectors.deleteProjectBtn)
    }

    get confirmDeletePopUp(): Locator {
        return this.page.locator(this.selectors.confirmDeletePopUp)
    }

    get confirmDeleteBtn(): Locator {
        return this.page.locator(this.selectors.confirmDeleteBtn);
    }

    get logOutBtn(): Locator {
        return this.page.locator(this.selectors.logOutBtn)
    }

    async openMyAccountTab(): Promise<void> {
        await this.myAccountLink.click()
    }

    async addNewProject(): Promise<void> {
        await this.newProjectBtn.click()
    }

    async navigateToProjects(): Promise<void> {
        await this.projectsLink.click({force: true})
    }

    async searchProject(projectName: string): Promise<void> {
        await this.type(this.searchBar, projectName);
        await this.page.waitForTimeout(1500);
    }

    async deleteProject(projectName: string): Promise<void> {
        await this.searchProject(projectName);
        await this.projectActionBtn.click();
        await this.page.locator(this.selectors.deleteProjectBtn).click();
        await this.confirmDeletePopUp.waitFor();
        await this.confirmDeleteBtn.click();
        await this.page.waitForTimeout(500)
    }

    async logOut(fromLogin: boolean): Promise<void> {
        if(fromLogin) {
            await this.logOutBtn.click();
        } else {
            await this.openMyAccountTab();
            await this.logOutBtn.click();
        }
    }
}
