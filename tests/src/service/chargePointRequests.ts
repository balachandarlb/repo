import { APIResponse } from "@playwright/test";
import BaseAPI from "../base/BaseApi";
import { ChargePointData } from "../model/ChargePointModel";

export default class ChargePointRequests extends BaseAPI {
    async getChargePoint(): Promise<APIResponse> {
        const request = await this.apiRequestContext();
        return await request.get('/charge-point');
    }
    
    async addChargePoint(body: ChargePointData): Promise<APIResponse> {
        const request = await this.apiRequestContext();
        return await request.post('/charge-point', {
            data: body
        });
    }

    async deleteChargePoint(id: string): Promise<APIResponse> {
        const request = await this.apiRequestContext();
        return await request.delete(`/charge-point/${id}`);
      }
}