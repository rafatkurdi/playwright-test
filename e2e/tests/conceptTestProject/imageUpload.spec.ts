import { expect, Page, test } from "@playwright/test";
import Application from "../../pages/application";
import Utils from "../../support/utils";

let page: Page;
let App: Application;
const date: string = Utils.generateDate();
let description: string;

test.describe(`Testing image upload feature to Concept Test Project (${process.env.ENV_NAME} environment)`, () => {
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
        await App.main.deleteProject(` as of ${date}`)
        await App.main.logOut(false);
        await page.reload();
    })

    test.afterAll(async () => {
        await page.close();
    });

    Application.testData.imageFilesPaths.forEach(file => {
        test(`should successfuly upload an image with "${file.ext}" extension to "IMAGE ONLY" project`, async () => {
            await App.conceptTestProject.insertProjectName(` as of ${date}`);
            await App.conceptTestProject.selectProjectType(App.conceptTestProject.imageOnly);
            await App.conceptTestProject.uploadImage(file.filePath);
            await expect(App.conceptTestProject.uploadImageBtn).not.toBeVisible();
        })
    })

    Application.testData.imageFilesPaths.forEach(file => {
        test(`should successfuly upload an image with "${file.ext}" extension to "IMAGE & TEXT" project `, async () => {
            await App.conceptTestProject.insertProjectName(` as of ${date}`);
            await App.conceptTestProject.selectProjectType(App.conceptTestProject.imageAndText);
            await App.conceptTestProject.insertDescription(description);
            await App.conceptTestProject.uploadImage(file.filePath);
            await expect(App.conceptTestProject.uploadImageBtn).not.toBeVisible();
        })
    })
})
