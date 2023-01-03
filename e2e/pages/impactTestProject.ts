import { Locator, Page } from "@playwright/test";
import Projects from "./projects";


export default class ImpactTestProject extends Projects {
    constructor(page: Page) {
        super(page);
        this.page = page
    }

    protected specificSelectors = {
        uploadVideoBtn: '//*[text()="Upload your video ad here"]',
        videoFrame: '//*/div[2]/iframe',
        uploadAnotherVideoBtn: '//button[text()="Upload another video"]',
        missingVideoErrorMessage: '//span[text()="Please upload the video you want to test."]'
    }

    get uploadVideoBtn(): Locator {
        return this.page.locator(this.specificSelectors.uploadVideoBtn)
    }

    get videoFrame(): Locator {
        return this.page.locator(this.specificSelectors.videoFrame)
    }

    get uploadAnotherVideoBtn(): Locator {
        return this.page.locator(this.specificSelectors.uploadAnotherVideoBtn)
    }

    get missingVideoErrorMessage(): Locator {
        return this.page.locator(this.specificSelectors.missingVideoErrorMessage)
    }

    async uploadVideo(fileName: string): Promise<void> {
        await this.page.setInputFiles(this.selectors.uploadField, fileName)
        await this.videoFrame.waitFor();
    }
}
