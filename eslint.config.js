import js from '@eslint/js';
import globals from 'globals';
import eslintConfigPrettier from 'eslint-config-prettier';
import pluginImport from 'eslint-plugin-import';
import reactPlugin from 'eslint-plugin-react';

export default [
  js.configs.recommended,
  eslintConfigPrettier,
  {
    files: ['**/*.{js,jsx}'],
    ignores: ['dist/**', 'node_modules/**'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: {
        ...globals.browser,
      },
    },
    plugins: { import: pluginImport, react: reactPlugin },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'react/jsx-uses-vars': 'error',
      'import/no-unresolved': 'off',
      'import/extensions': 'off',
    },
  },
  {
    files: ['vite.config.*', 'vite.*.config.*'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.node,
    },
  },
];
