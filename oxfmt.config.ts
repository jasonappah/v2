import { defineConfig } from 'oxfmt';

export default defineConfig({
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  trailingComma: 'es5',
  jsxSingleQuote: true,
  bracketSpacing: true,
  arrowParens: 'always',
  endOfLine: 'lf',
  ignorePatterns: [
    'node_modules/**',
    '.next/**',
    'out/**',
    'build/**',
    'dist/**',
    '*.min.js',
    '*.min.css',
    'coverage/**',
    '.vercel/**',
    'package-lock.json',
    'yarn.lock',
    'pnpm-lock.yaml',
  ],
});
