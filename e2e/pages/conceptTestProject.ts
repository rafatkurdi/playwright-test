import { Locator, Page } from "@playwright/test";
import Projects from "./projects";

export default class ConceptTestProject extends Projects {
    constructor(page: Page) {
        super(page);
        this.page = page
    }

    protected specificSelectors = {
        imageAndTextIcon: '[alt="Image icon"]:nth-child(2)',
        onlyImageIcon: '[alt="Image icon"]:nth-child(1)',
        onlyTextIcon: '[alt="Text icon"]:nth-child(1)',
        descriptionField: '[placeholder="Describe your concept here"]',
        successfullUploadMessage: '//*[text()="You sucessfully uploaded an image."]',
        uploadImageBtn: '//*[text()="Upload image"]',
        unchoosenConceptErrorMessage: '//span[text()="You must choose at least one concept."]',
        missingImageAndTextErrorMessage: '//span[text()="Some slides are missing image or text."]',
        missingImageErrorMessage: '//span[text()="Some slides are missing image."]',
        missingTextErrorMessage: '//span[text()="Some slides are missing text."]'
    };

    get imageAndText(): Locator {
        return this.page.locator(this.specificSelectors.imageAndTextIcon)
    }

    get imageOnly(): Locator {
        return this.page.locator(this.specificSelectors.onlyImageIcon)
    }

    get textOnly(): Locator {
        return this.page.locator(this.specificSelectors.onlyTextIcon)
    }

    get descriptionField(): Locator {
        return this.page.locator(this.specificSelectors.descriptionField)
    }

    get successfullUploadMessage(): Locator {
        return this.page.locator(this.specificSelectors.successfullUploadMessage)
    }

    get uploadImageBtn(): Locator {
        return this.page.locator(this.specificSelectors.uploadImageBtn)
    }

    get unchoosenConceptErrorMessage(): Locator {
        return this.page.locator(this.specificSelectors.unchoosenConceptErrorMessage)
    }

    get missingImageAndTextErrorMessage(): Locator {
        return this.page.locator(this.specificSelectors.missingImageAndTextErrorMessage)
    }

    get missingImageErrorMessage(): Locator {
        return this.page.locator(this.specificSelectors.missingImageErrorMessage)
    }

    get missingTextErrorMessage(): Locator {
        return this.page.locator(this.specificSelectors.missingTextErrorMessage)
    }

    async selectProjectType(projectType: Locator): Promise<void> {
        await projectType.click();
    }

    async insertDescription(description: string): Promise<void> {
        await this.type(this.descriptionField, description);
        await this.page.waitForTimeout(1000);
    }

    async uploadImage(fileName: string): Promise<void> {
        await this.page.setInputFiles(this.selectors.uploadField, fileName)
        await this.successfullUploadMessage.waitFor();
    }
}
