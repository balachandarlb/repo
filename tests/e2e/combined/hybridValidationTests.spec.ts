import { test, expect, Page } from "@playwright/test";
import ChargePointModel from "../../src/model/ChargePointModel";
import ChargePointRequests from "../../src/service/chargePointRequests";
import ChargePointInstallationFormPage from "../../src/pages/ChargePointInstallationFormPage";

test('create via API, validate & delete via UI, confirm via API', async ({ browser }) => {
  const id = Math.random().toString(36).substring(2, 10);
  const serialNumber = Math.floor(100000 + Math.random() * 900000).toString();

  const chargePointBody = new ChargePointModel()
    .setID(id)
    .setSerialNumber(serialNumber)
    .toJSON();

  const requestContext = new ChargePointRequests();
  const createResponse = await requestContext.addChargePoint(chargePointBody);

  expect(createResponse.status()).toBe(201);

  const page: Page = await browser.newPage();
  const chargePointInstallationFormPage = new ChargePointInstallationFormPage(page);

  await chargePointInstallationFormPage.navigate();

  await expect(await chargePointInstallationFormPage.isTitleVisible()).toBeTruthy();
  await expect(await chargePointInstallationFormPage.isSerialNumberVisible(serialNumber)).toBeTruthy();

  await chargePointInstallationFormPage.deleteSerialNumber(serialNumber);

  await expect(await chargePointInstallationFormPage.isSerialNumberVisible(serialNumber)).toBeFalsy();

  const getResponse = await requestContext.getChargePoint();

  expect(getResponse.status()).toBe(200);

  const body = await getResponse.json();
  const serialExists = body.some((point: any) => point.serialNumber === serialNumber);

  expect(serialExists).toBe(false);
});
