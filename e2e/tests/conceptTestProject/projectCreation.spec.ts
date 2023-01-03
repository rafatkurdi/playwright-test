import { expect, Page, test } from "@playwright/test";
import Application from "../../pages/application";
import Utils from "../../support/utils";

let page: Page;
let App: Application;
let pageUrl: string;
const date: string = Utils.generateDate();
let description: string;

test.describe(`Testing Concept Test Project creation (${process.env.ENV_NAME} environment)`, () => {
    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        App = new Application(page);
    })

    test.beforeEach(async () => {
        await App.login.goTo('/');
        await App.login.doLogin(Application.testData.credentials.testCorrectEmail, Application.testData.credentials.testCorrectPasword);
        await App.main.addNewProject();
        await expect(page).toHaveTitle(Application.testData.newProjectPageTitle);
        await App.newProject.setUpProject(App.newProject.conceptTestTab);
        await expect(page).toHaveTitle(Application.testData.newProjectCreatingPageTitle);
        pageUrl = await page.url();
        await expect(pageUrl).toContain(Application.testData.conceptTestPagePath)
        description = Utils.generateDescription();
    })

    test.afterEach(async () => {
        await App.conceptTestProject.closePopUp();
        await App.main.navigateToProjects();
        await App.main.deleteProject(`as of ${date}`)
        await App.main.logOut(false);
        await page.reload();
    })

    test.afterAll(async () => {
        await page.close();
    });

    test('should successfuly create "IMAGE ONLY" project', async () => {
        await App.conceptTestProject.insertProjectName(` as of ${date}`);
        await App.conceptTestProject.selectProjectType(App.conceptTestProject.imageOnly);
        await App.conceptTestProject.uploadImage(Application.testData.imageFilesPaths[1].filePath);
        await App.conceptTestProject.selectCategory('Food', App.conceptTestProject.foodDelivery);
        await App.conceptTestProject.selectCompetitor(App.conceptTestProject.firstCompetitor, 2);
        await App.conceptTestProject.selectCompetitor(App.conceptTestProject.secondCompetitor, 3);
        await App.conceptTestProject.continueProject();
        await expect(App.conceptTestProject.sampleDefinitionPopUp).toBeVisible();
        await expect(App.conceptTestProject.sampleDefinitionPopUpHeader).toHaveText(Application.testData.sampleDefinitionPopUpHeader);
    })

    test('should successfuly create "TEXT ONLY" project', async () => {
        await App.conceptTestProject.insertProjectName(` as of ${date}`);
        await App.conceptTestProject.selectProjectType(App.conceptTestProject.textOnly);
        await App.conceptTestProject.insertDescription(description);
        await App.conceptTestProject.selectCategory('Food', App.conceptTestProject.foodDelivery);
        await App.conceptTestProject.selectCompetitor(App.conceptTestProject.firstCompetitor, 2);
        await App.conceptTestProject.selectCompetitor(App.conceptTestProject.secondCompetitor, 3);
        await App.conceptTestProject.continueProject();
        await expect(App.conceptTestProject.sampleDefinitionPopUp).toBeVisible();
        await expect(App.conceptTestProject.sampleDefinitionPopUpHeader).toHaveText(Application.testData.sampleDefinitionPopUpHeader);
    })

    test('should successfuly create "IMAGE & TEXT" project', async () => {
        await App.conceptTestProject.insertProjectName(` as of ${date}`);
        await App.conceptTestProject.selectProjectType(App.conceptTestProject.imageAndText);
        await App.conceptTestProject.insertDescription(description);
        await App.conceptTestProject.uploadImage(Application.testData.imageFilesPaths[1].filePath);
        await App.conceptTestProject.selectCategory('Food', App.conceptTestProject.foodDelivery);
        await App.conceptTestProject.selectCompetitor(App.conceptTestProject.firstCompetitor, 2);
        await App.conceptTestProject.selectCompetitor(App.conceptTestProject.secondCompetitor, 3);
        await App.conceptTestProject.continueProject();
        await expect(App.conceptTestProject.sampleDefinitionPopUp).toBeVisible();
        await expect(App.conceptTestProject.sampleDefinitionPopUpHeader).toHaveText(Application.testData.sampleDefinitionPopUpHeader);
    })
})
