import { Locator, Page } from "@playwright/test";
import Base from "./base";

export default class Login extends Base {
    constructor(page: Page) {
        super(page);
        this.page = page;
    }

    protected selectors = {
        acceptCookiesBtn: '//*[@id="hs-eu-confirmation-button"]',
        pageLogo: '[href="/"]',
        loginPanel: '#login-with-email',
        emailField: '#email',
        passwordField: '#password',
        loginBtn: '#sign-in-with-email',
        errorMessage: '#login-with-email span'
    };

    get acceptCookiesBtn(): Locator {
        return this.page.locator(this.selectors.acceptCookiesBtn)
    }

    get pageLogo(): Locator {
        return this.page.locator(this.selectors.pageLogo)
    }

    get loginPanel(): Locator {
        return this.page.locator(this.selectors.loginPanel)
    }

    get emaiField(): Locator {
        return this.page.locator(this.selectors.emailField)
    }

    get passwordField(): Locator {
        return this.page.locator(this.selectors.passwordField)
    }

    get loginBtn(): Locator {
        return this.page.locator(this.selectors.loginBtn)
    }

    get errorMessage(): Locator {
        return this.page.locator(this.selectors.errorMessage)
    }

    private async insertEmail(email: string): Promise<void> {
        await this.type(this.emaiField, email)
    }

    private async insertPassword(password: string): Promise<void> {
        await this.type(this.passwordField, password)
    }

    async doLogin(email: string, password: string): Promise<void> {
        // let pageUrl = this.page.url();
        // if(pageUrl === 'https://grow.behavio.app/login') {
        //     await this.acceptCookiesBtn.click()
        // }
        await this.insertEmail(email);
        await this.insertPassword(password);
        await this.loginBtn.click();
    }
}
