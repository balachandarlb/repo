import { test, expect } from "@playwright/test";
import ChargePointModel from "../../src/model/ChargePointModel";
import ChargePointRequests from "../../src/service/chargePointRequests";

test('get charging points', async () => {
    const response = await new ChargePointRequests().getChargePoint();
//
    expect(response.status()).toBe(200);
});

test('add a charging point', async () => {
    const chargePointBody = new ChargePointModel().setID('qyweuiouyq12iuhinw')
                                                  .setSerialNumber('1234567')
                                                  .toJSON();
    
    const response = await new ChargePointRequests().addChargePoint(chargePointBody); 

    expect(await response.status()).toBe(201);
});      

test('delete a charging point', async () => {
    const requestcontext = new ChargePointRequests();
    const chargePointBody = new ChargePointModel()
    
    expect(await requestcontext.addChargePoint(chargePointBody.toJSON()).then(response => response.status())).toBe(201);
    expect(await requestcontext.deleteChargePoint(chargePointBody.id).then(response => response.status())).toBe(204);
});      