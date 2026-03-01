import { test, expect } from '@playwright/test';

test.describe('Projects List Page', () => {
  test('should redirect unauthenticated users to login', async ({ page }) => {
    await page.goto('d/pg/project-list');

    // Unauthenticated users are redirected to login
    await expect(page).toHaveTitle('Limelight - User Login');
    await expect(page.locator('#main_container_below_logo')).toBeVisible();
  });
});
