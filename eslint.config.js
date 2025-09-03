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
      // Keep JSX identifiers marked as used and support React 17+ JSX transform
      'react/jsx-uses-vars': 'error',
      'react/jsx-uses-react': 'error',
      'react/react-in-jsx-scope': 'off',
      // Relax unused vars but ignore common placeholders and `React`
      'no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^React$',
        },
      ],
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
