import { defineConfig } from 'eslint/config';
import globals from 'globals';
import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      globals: globals.browser,
    },
    plugins: { js },
    extends: ['eslint:recommended'],
    rules: {
      eqeqeq: 'error',
      'no-unused-vars': 'error',
      'prefer-const': ['error', { ignoreReadBeforeAssign: true }],
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      globals: globals.browser,
    },
    // plugins: { '@typescript-eslint': tseslint },
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx}'],
    plugins: { prettier },
    rules: {
      'prettier/prettier': 'error',
    },
  },
  {
    ignores: ['node_modules/', 'dist/', 'build/', 'coverage/'],
  },
]);
