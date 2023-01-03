import { Page } from "@playwright/test";
import Login from "./login";
import Main from "./main";
import NewProject from "./newProject";
import ImpactTestProject from "./impactTestProject";
import ConceptTestProject from "./conceptTestProject";
import data from "../support/data";



export default class Application {
    protected page: Page;
    login: Login;
    main: Main;
    newProject: NewProject;
    impactTestProject: ImpactTestProject;
    conceptTestProject: ConceptTestProject;
    static testData = data;

    constructor(page: Page) {
        this.page = page;
        this.login = new Login(page);
        this.main = new Main(page);
        this.newProject= new NewProject(page);
        this.impactTestProject = new ImpactTestProject(page);
        this.conceptTestProject = new ConceptTestProject(page);
    }
}
