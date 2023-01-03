import { expect, Page, test } from "@playwright/test";
import Application from "../pages/application";

let page: Page;
let App: Application;

test.describe(`Testing Login feature (${process.env.ENV_NAME} environment)`, () => {
    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        App = new Application(page);
    })

    test.beforeEach(async () => {
        await App.login.goTo('/');
        await expect(page).toHaveTitle(Application.testData.loginPageTitle);
        await expect(App.login.pageLogo).toBeVisible();
        await expect(App.login.loginPanel).toBeVisible();
    })

    test.afterEach(async () => {
        await page.reload();
    })

    test.afterAll(async () => {
        await page.close();
    });

    test('should successfily log in, while using correct credentials', async () => {
        await App.login.doLogin(Application.testData.credentials.testCorrectEmail, Application.testData.credentials.testCorrectPasword);
        await App.main.openMyAccountTab();
        let pageUrl = page.url();
        await expect(pageUrl).toContain(Application.testData.projectsPagePath);
        await expect(App.main.behavioLogo).toBeVisible();
        await expect(App.main.myAccountTab).toBeVisible();
        await expect(App.main.pageHeader).toBeVisible();
        await expect(App.main.usernameBox).toHaveText(Application.testData.username);
        await expect(App.main.workspaceBox).toHaveText(Application.testData.workspace);
        await App.main.logOut(true)
    })

    test('should get error message, while using wrong email', async () => {
        await App.login.doLogin(Application.testData.credentials.testIncorrectEmail, Application.testData.credentials.testIncorrectPassword);
        await expect(App.login.errorMessage).toBeVisible();
        await expect(App.login.errorMessage).toHaveText(Application.testData.errorMessages.wrongEmailErrorMessage)
    })

    test('should get error message, while using wrong password', async () => {
        await App.login.doLogin(Application.testData.credentials.testCorrectEmail, Application.testData.credentials.testIncorrectPassword);
        await expect(App.login.errorMessage).toBeVisible();
        await expect(App.login.errorMessage).toHaveText(Application.testData.errorMessages.wrongPasswordErrorMessage)
    })
})