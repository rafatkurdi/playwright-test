import { expect, Page, test } from "@playwright/test";
import Application from "../../pages/application";
import Utils from "../../support/utils";

let page: Page;
let App: Application;
const date: string = Utils.generateDate();

test.describe(`Testing video upload feature to Impact Test Project (${process.env.ENV_NAME} environment)`, () => {
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

    Application.testData.videoFilesPaths.forEach(file => {
        test(`should successfully upload a video with "${file.ext}" extension`, async () => {
            await App.impactTestProject.insertProjectName(` as of ${date}`);
            await App.impactTestProject.uploadVideo(file.filePath);
            await expect(App.impactTestProject.uploadAnotherVideoBtn).toBeVisible();
        })
    })
})
