import { expect, Page, test } from "@playwright/test";
import Application from "../../pages/application";
import Utils from "../../support/utils";

let page: Page;
let App: Application;
let pageUrl: string;
const date: string = Utils.generateDate();

test.describe(`Testing Impact Test Project creation feature (${process.env.ENV_NAME} environment)`, () => {
    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        App = new Application(page);
    })

    test.beforeEach(async () => {
        await App.login.goTo('/');
        await App.login.doLogin(Application.testData.credentials.testCorrectEmail, Application.testData.credentials.testCorrectPasword);
        await App.main.addNewProject();
        await expect(page).toHaveTitle(Application.testData.newProjectPageTitle);
        await App.newProject.setUpProject(App.newProject.impactTest);
        await expect(page).toHaveTitle(Application.testData.newProjectCreatingPageTitle);
        pageUrl = await page.url();
        await expect(pageUrl).toContain(Application.testData.impactTestPagePath)
    })

    test.afterEach(async () => {
        await App.main.navigateToProjects();
        await App.main.deleteProject(`as of ${date}`);
        await App.main.logOut(false);
        await page.reload();
    })

    test.afterAll(async () => {
        await page.close();
    });

    test('should successfuly create "Impact Test" project', async () => {
        await App.impactTestProject.insertProjectName(` as of ${date}`);
        await App.impactTestProject.uploadVideo(Application.testData.videoFilesPaths[0].filePath);
        await expect(App.impactTestProject.brandIcon).toBeVisible();
        await App.impactTestProject.selectCategory('Food', App.impactTestProject.foodDelivery);
        await App.impactTestProject.selectCompetitor(App.impactTestProject.firstCompetitor, 2);
        await App.impactTestProject.selectCompetitor(App.impactTestProject.secondCompetitor, 3);
        await App.impactTestProject.continueProject();
        await expect(App.impactTestProject.sampleDefinitionPopUp).toBeVisible();
        await expect(App.impactTestProject.sampleDefinitionPopUpHeader).toHaveText(Application.testData.sampleDefinitionPopUpHeader);
        await App.impactTestProject.closePopUp();
    })
})
