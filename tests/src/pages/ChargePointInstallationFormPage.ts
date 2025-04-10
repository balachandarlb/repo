import { Locator, Page, expect } from "@playwright/test";
import BasePage from "../base/BasePage";

export default class ChargePointInstallationFormPage extends BasePage{
    constructor(page:Page){
        super(page);
    }

    private readonly title:Locator = this.$role('heading', 'Charge Point Installation Form');
    private readonly inputSerialNumber:Locator = this.$role('textbox');
    private readonly add:Locator = this.$role('button', 'Add');

    async navigate() {
        await this.page.goto('/');
      }

    private getItemLocator(serialNumber: string): Locator {
        return this.$(`li:has(.list-text:has-text("${serialNumber}"))`);
      }

    async isTitleVisible():Promise<boolean>{
        return await this.title.isVisible()
    }

    async addSerialNumber(serialNumber:string):Promise<void>{
        await this.inputSerialNumber.fill(serialNumber);
        await this.add.click();
    }

    async isSerialNumberVisible(serialNumber:string):Promise<boolean>{
        const serialNumberElement = await this.getItemLocator(serialNumber)
        return serialNumberElement.isVisible();
    } 

    async deleteSerialNumber(serialNumber:string):Promise<void>{
        await this.$(`li:has(.list-text:has-text("${serialNumber}")) .list-button`).click();
    }
}