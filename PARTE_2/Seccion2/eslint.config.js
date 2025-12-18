const { FlatCompat } = require('@eslint/eslintrc');
const nextPlugin = require('@next/eslint-plugin-next');
const reactPlugin = require('eslint-plugin-react');
const hooksPlugin = require('eslint-plugin-react-hooks');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');

const compat = new FlatCompat();

module.exports = [
	{
		// Ignora los archivos y directorios que no queremos analizar
		ignores: [
			'.next/',
			'node_modules/',
			'coverage/',
			'**/*.test.ts',
			'**/*.test.tsx',
			'jest.config.js',
			'jest.setup.js',
		],
	},
	// Extiende las configuraciones recomendadas de Next.js y Core Web Vitals
	...compat.extends('next/core-web-vitals'),
	{
		settings: {
			react: {
				version: 'detect', // Detecta automáticamente la versión de React
			},
		},
	},
];
