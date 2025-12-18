import { test, expect } from '@playwright/test';

test('homepage has a title and a visible button', async ({ page }) => {
	await page.goto('http://localhost:3000/');

	// 1. Verificar que la página tiene el título correcto
	await expect(page).toHaveTitle(/AECC/);

	// 2. Verificar que hay al menos un enlace visible con "Cuarenta"
	const cuarentaLinks = page.getByRole('link', { name: /Cuarenta/i });
	await expect(cuarentaLinks).toHaveCount(2); // Si esperas exactamente 2
	await expect(cuarentaLinks.first()).toBeVisible();
	await expect(cuarentaLinks.nth(1)).toBeVisible();
});
