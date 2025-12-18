module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'jest-environment-jsdom',
	setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

	// Configuración de ts-jest para usar el tsconfig específico de pruebas.
	// Esto reemplaza la configuración de 'globals' que está deprecada.
	transform: {
		'^.+\\.(ts|tsx)$': [
			'ts-jest',
			{
				tsconfig: '<rootDir>/tsconfig.jest.json',
			},
		],
	},

	// Buscar tests en estas ubicaciones
	testMatch: [
		'**/__tests__/**/*.[jt]s?(x)',
		'**/?(*.)+(spec|test).[jt]s?(x)',
		'**/__tests__/**/*.unit.[jt]s?(x)',
	],

	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/$1',
		'^@components/(.*)$': '<rootDir>/components/$1',
		'^@app/(.*)$': '<rootDir>/app/$1',
		'\\.(css|scss|sass)$': 'identity-obj-proxy',
	},

	collectCoverage: true,
	collectCoverageFrom: [
		'**/*.{ts,tsx}', // Incluye archivos en la raíz y en cualquier subdirectorio
		'components/**/*.{ts,tsx}',
		'app/**/*.{ts,tsx}',
		'lib/**/*.{ts,tsx}',
		'utils/**/*.{ts,tsx}',
		'hooks/**/*.{ts,tsx}',
		'!**/*.d.ts',
		'!**/node_modules/**',
		'!**/.next/**',
		'!**/coverage/**',
		'!**/__tests__/**',
		'!**/__mocks__/**',
	],

	coverageDirectory: 'coverage/unit',
	coverageReporters: [
		'json',
		'lcov',
		'text',
		'text-summary',
		'html',
		'cobertura', // Para CI/CD
		'json-summary', // Para Sonar
	],

	coverageThreshold: {
		global: {
			branches: 80,
			functions: 80,
			lines: 80,
			statements: 80,
		},
		'./components/': {
			branches: 90,
			functions: 90,
			lines: 90,
			statements: 90,
		},
	},

	reporters: [
		'default',
		[
			'jest-junit',
			{
				outputDirectory: 'coverage/junit',
				outputName: 'junit.xml',
			},
		],
		[
			'jest-html-reporter',
			{
				pageTitle: 'Test Report',
				outputPath: 'coverage/test-report.html',
				includeFailureMsg: true,
				includeConsoleLog: true,
			},
		],
	],
};
