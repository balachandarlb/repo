import test, { expect, Page } from "@playwright/test";
import ChargePointInstallationFormPage from "../../src/pages/ChargePointInstallationFormPage";
import BaseAPI from "../../src/base/BaseApi";

test.describe('charge point tests', ()=>{
    let page: Page;

    test.beforeAll(async ({ browser }) => {
      page = await browser.newPage(); 

      const chargePointInstallationFormPage = new ChargePointInstallationFormPage(page)
      
      await chargePointInstallationFormPage.navigate();

      await expect(await chargePointInstallationFormPage.isTitleVisible()).toBeTruthy();
    });
  
    test('should add a charge point', async () => {
        const chargePointInstallationFormPage = new ChargePointInstallationFormPage(page);
        const serialNumber = Math.floor(100000 + Math.random() * 900000).toString();

        await chargePointInstallationFormPage.addSerialNumber(serialNumber);

        await expect(await chargePointInstallationFormPage.isSerialNumberVisible(serialNumber)).toBeTruthy();
    });

    test('should delete a charge point', async () => {
        const chargePointInstallationFormPage = new ChargePointInstallationFormPage(page);
        const serialNumber = Math.floor(100000 + Math.random() * 900000).toString();

        await chargePointInstallationFormPage.addSerialNumber(serialNumber);
        await chargePointInstallationFormPage.deleteSerialNumber(serialNumber);

        await expect(await chargePointInstallationFormPage.isSerialNumberVisible(serialNumber)).toBeFalsy();
    });
})