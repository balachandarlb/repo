import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',          
  timeout: 30 * 1000,          
  fullyParallel: true,         
  retries: 1,                  
  workers: 3,                  

  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',          
    screenshot: 'only-on-failure',    
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  reporter: [
    ['html', { outputFolder: 'tests/results/playwright-report' }] 
  ]
});