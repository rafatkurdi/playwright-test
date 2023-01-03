import { expect, Page, test } from "@playwright/test";
import Application from "../../pages/application";
import Utils from "../../support/utils";

let page: Page;
let App: Application;
const date: string = Utils.generateDate();
let description: string;

test.describe(`Testing Concept Test Project creation - Negative flow (${process.env.ENV_NAME} environment)`, () => {
    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        App = new Application(page);
    })

    test.beforeEach(async () => {
        await App.login.goTo('/');
        await App.login.doLogin(Application.testData.credentials.testCorrectEmail, Application.testData.credentials.testCorrectPasword);
        await App.main.addNewProject();
        await App.newProject.setUpProject(App.newProject.conceptTestTab);
        description = Utils.generateDescription();
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

    test('should get an error message, while creating project without choosing "Concept type"', async () => {
        await App.conceptTestProject.insertProjectName(`as of ${date}`);
        await App.conceptTestProject.selectCategory('Food', App.conceptTestProject.foodDelivery);
        await App.conceptTestProject.selectCompetitor(App.conceptTestProject.firstCompetitor, 2);
        await App.conceptTestProject.selectCompetitor(App.conceptTestProject.secondCompetitor, 3);
        await App.conceptTestProject.continueProject();
        await expect(App.conceptTestProject.unchoosenConceptErrorMessage).toBeVisible();
    })

    test('should get an error message, while creating "TEXT ONLY" project without inserting description', async () => {
        await App.conceptTestProject.insertProjectName(`as of ${date}`);
        await App.conceptTestProject.selectProjectType(App.conceptTestProject.textOnly);
        await App.conceptTestProject.selectCategory('Food', App.conceptTestProject.foodDelivery);
        await App.conceptTestProject.selectCompetitor(App.conceptTestProject.firstCompetitor, 2);
        await App.conceptTestProject.selectCompetitor(App.conceptTestProject.secondCompetitor, 3);
        await App.conceptTestProject.continueProject();
        await expect(App.conceptTestProject.missingTextErrorMessage).toBeVisible();
    })

    test('should get an error message, while creating "IMAGE ONLY" project without uploading an image', async () => {
        await App.conceptTestProject.insertProjectName(`as of ${date}`);
        await App.conceptTestProject.selectProjectType(App.conceptTestProject.imageOnly);
        await App.conceptTestProject.selectCategory('Food', App.conceptTestProject.foodDelivery);
        await App.conceptTestProject.selectCompetitor(App.conceptTestProject.firstCompetitor, 2);
        await App.conceptTestProject.selectCompetitor(App.conceptTestProject.secondCompetitor, 3);
        await App.conceptTestProject.continueProject();
        await expect(App.conceptTestProject.missingImageErrorMessage).toBeVisible();
    })

    test('should get an error message, while creating "IMAGE AND TEXT" project without uploading an image', async () => {
        await App.conceptTestProject.insertProjectName(` as of ${date}`);
        await App.conceptTestProject.selectProjectType(App.conceptTestProject.imageAndText);
        await App.conceptTestProject.insertDescription(description);
        await App.conceptTestProject.selectCategory('Food', App.conceptTestProject.foodDelivery);
        await App.conceptTestProject.selectCompetitor(App.conceptTestProject.firstCompetitor, 2);
        await App.conceptTestProject.selectCompetitor(App.conceptTestProject.secondCompetitor, 3);
        await App.conceptTestProject.continueProject();
        await expect(App.conceptTestProject.missingImageErrorMessage).toBeVisible();
    })

    test('should get an error message, while creating "IMAGE AND TEXT" project without inserting description', async () => {
        await App.conceptTestProject.insertProjectName(` as of ${date}`);
        await App.conceptTestProject.selectProjectType(App.conceptTestProject.imageAndText);
        await App.conceptTestProject.uploadImage(Application.testData.imageFilesPaths[1].filePath)
        await App.conceptTestProject.selectCategory('Food', App.conceptTestProject.foodDelivery);
        await App.conceptTestProject.selectCompetitor(App.conceptTestProject.firstCompetitor, 2);
        await App.conceptTestProject.selectCompetitor(App.conceptTestProject.secondCompetitor, 3);
        await App.conceptTestProject.continueProject();
        await expect(App.conceptTestProject.missingTextErrorMessage).toBeVisible();
    })

    test('should get an error message, while creating project without choosing category', async () => {
        await App.conceptTestProject.insertProjectName(` as of ${date}`);
        await App.conceptTestProject.selectProjectType(App.conceptTestProject.textOnly);
        await App.conceptTestProject.insertDescription(description);
        await App.conceptTestProject.selectCompetitor(App.conceptTestProject.firstCompetitor, 2);
        await App.conceptTestProject.selectCompetitor(App.conceptTestProject.secondCompetitor, 3);
        await App.conceptTestProject.continueProject();
        await expect(App.conceptTestProject.categoryErrorMessage).toBeVisible();
    })

    test('should get an error message, while creating project without choosing one competitor', async () => {
        await App.conceptTestProject.insertProjectName(` as of ${date}`);
        await App.conceptTestProject.selectProjectType(App.conceptTestProject.textOnly);
        await App.conceptTestProject.insertDescription(description);
        await App.conceptTestProject.selectCategory('Food', App.conceptTestProject.foodDelivery);
        await App.conceptTestProject.selectCompetitor(App.conceptTestProject.firstCompetitor, 2);
        await App.conceptTestProject.continueProject();
        await expect(App.conceptTestProject.competitorErrorMessage).toBeVisible();
    })

    test('should get an error message, while creating project without choosing any competitor', async () => {
        await App.conceptTestProject.insertProjectName(` as of ${date}`);
        await App.conceptTestProject.selectProjectType(App.conceptTestProject.textOnly);
        await App.conceptTestProject.insertDescription(description);
        await App.conceptTestProject.selectCategory('Food', App.conceptTestProject.foodDelivery);
        await App.conceptTestProject.continueProject();
        await expect(App.conceptTestProject.competitorErrorMessage).toBeVisible();
    })
})
