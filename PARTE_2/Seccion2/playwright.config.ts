import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
	testDir: './',
	fullyParallel: true,
	reporter: 'html',
	testMatch: '**/*.spec.ts',

	use: {
		// ⚠️ CORRIGE ESTO: Agrega la ruta base completa
		baseURL: 'http://localhost:3000/aecc-uide-web/',
		trace: 'on-first-retry',
	},

	// ⚠️ ELIMINA o MODIFICA webServer según necesites
	webServer: {
		command: 'npm run dev',
		// ⚠️ CORRIGE ESTO también
		url: 'http://localhost:3000/aecc-uide-web/',
		reuseExistingServer: !process.env.CI,
		timeout: 120 * 1000, // 2 minutos
	},

	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
		},
	],
});
