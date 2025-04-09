import { APIRequestContext, request } from '@playwright/test';

export default class BaseAPI {
    protected async apiRequestContext(): Promise<APIRequestContext> {
        return await request.newContext({
            baseURL: 'http://localhost:3001',   
        });
    }
}