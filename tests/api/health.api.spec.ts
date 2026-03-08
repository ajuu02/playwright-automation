import { test, expect } from '@playwright/test';

test.describe('API: Health', () => {
  test('service health endpoint returns success', async ({ request, baseURL }) => {
    const response = await request.get(`${baseURL}/health`);
    expect(response.ok()).toBeTruthy();
  });
});
