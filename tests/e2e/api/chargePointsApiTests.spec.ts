import { test, expect } from "@playwright/test";
import ChargePointModel from "../../src/model/ChargePointModel";
import ChargePointRequests from "../../src/service/chargePointRequests";

test('get charging points', async () => {
    const response = await new ChargePointRequests().getChargePoint();

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBeGreaterThan(0); 
  
    for (const point of body) {
      expect(point).toHaveProperty('id');
      expect(point).toHaveProperty('serialNumber');
      expect(typeof point.id).toBe('string');
      expect(typeof point.serialNumber).toBe('string');
    }
});

test('add a charging point', async () => {
    const id:string = Math.random().toString(36).substring(2, 10);
    const serialNumber = Math.floor(100000 + Math.random() * 900000).toString();

    const chargePointBody = new ChargePointModel().setID(id)
                                                  .setSerialNumber(serialNumber)
                                                  .toJSON();
    
    const response = await new ChargePointRequests().addChargePoint(chargePointBody); 
    const body = await response.json();
    expect(await response.status()).toBe(201);
    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('serialNumber');
    expect(typeof body.id).toBe('string');
    expect(typeof body.serialNumber).toBe('string');
    expect(body.serialNumber).toBe(serialNumber);
    expect(body.id).toBe(id);
});      

test('delete a charging point', async () => {
    const requestcontext = new ChargePointRequests();
    const chargePointBody = new ChargePointModel()
    
    expect(await requestcontext.addChargePoint(chargePointBody.toJSON()).then(response => response.status())).toBe(201);
    expect(await requestcontext.deleteChargePoint(chargePointBody.id).then(response => response.status())).toBe(204);
});      