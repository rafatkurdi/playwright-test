import { faker } from "@faker-js/faker"

export default class Utils {
    static generateDescription(): string {
        return faker.lorem.paragraph(1)
    }

    static generateDate(): string {
        const date: Date = new Date();
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return date.toLocaleString('es-CL', options);
    }
}
