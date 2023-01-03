import { expect, Page, test } from "@playwright/test";
import Application from "../../pages/application";
import Utils from "../../support/utils";

let page: Page;
let App: Application;
const date: string = Utils.generateDate();

test.describe(`Testing Impact Test Project creation feature - Negative flow (${process.env.ENV_NAME} environment)`, () => {
    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        App = new Application(page);
    })

    test.beforeEach(async () => {
        await App.login.goTo('/');
        await App.login.doLogin(Application.testData.credentials.testCorrectEmail, Application.testData.credentials.testCorrectPasword);
        await App.main.addNewProject();
        await App.newProject.setUpProject(App.newProject.impactTest);
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

    test('should get an error message, while creating project without uploading video', async () => {
        await App.impactTestProject.insertProjectName(` as of ${date}`);
        await App.impactTestProject.selectCategory('Food', App.impactTestProject.foodDelivery);
        await App.impactTestProject.selectCompetitor(App.impactTestProject.firstCompetitor, 2);
        await App.impactTestProject.selectCompetitor(App.impactTestProject.secondCompetitor, 3);
        await App.impactTestProject.continueProject();
        await expect(App.impactTestProject.missingVideoErrorMessage).toBeVisible();
    })

    test('should get an error message, while creating project without choosing category', async () => {
        await App.impactTestProject.insertProjectName(` as of ${date}`);
        await App.impactTestProject.uploadVideo(Application.testData.videoFilesPaths[0].filePath);
        await App.impactTestProject.selectCompetitor(App.impactTestProject.firstCompetitor, 2);
        await App.impactTestProject.selectCompetitor(App.impactTestProject.secondCompetitor, 3);
        await App.impactTestProject.continueProject();
        await expect(App.impactTestProject.categoryErrorMessage).toBeVisible();
    })

    test('should get an error message, while creating project without choosing one competitor', async () => {
        await App.impactTestProject.insertProjectName(` as of ${date}`);
        await App.impactTestProject.uploadVideo(Application.testData.videoFilesPaths[0].filePath);
        await App.impactTestProject.selectCategory('Food', App.impactTestProject.foodDelivery);
        await App.impactTestProject.selectCompetitor(App.impactTestProject.firstCompetitor, 2);
        await App.impactTestProject.continueProject();
        await expect(App.impactTestProject.competitorErrorMessage).toBeVisible();
    })

    test('should get an error message, while creating project without choosing any competitor', async () => {
        await App.impactTestProject.insertProjectName(` as of ${date}`);
        await App.impactTestProject.uploadVideo(Application.testData.videoFilesPaths[0].filePath);
        await App.impactTestProject.selectCategory('Food', App.impactTestProject.foodDelivery);
        await App.impactTestProject.continueProject();
        await expect(App.impactTestProject.competitorErrorMessage).toBeVisible();
    })
})
