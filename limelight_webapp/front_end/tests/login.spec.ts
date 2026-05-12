import { test, expect } from '@playwright/test';

test.describe('Login Page', () => {
  test('should load and display login page elements', async ({ page }) => {
    await page.goto('user/login');

    await expect(page).toHaveTitle('Limelight - User Login');

    const logo = page.locator('img[src*="logo"]').first();
    await expect(logo).toBeVisible();

    await expect(page.getByRole('link', { name: /Get Help/i })).toBeVisible();

    const mainContainer = page.locator('#main_container_below_logo');
    await expect(mainContainer).toBeVisible();
  });
});
