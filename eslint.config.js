import ESLint from '@eslint/js'
import ESLintConfigPrettier from 'eslint-config-prettier'
import globals from 'globals'
import prettierPlugin from 'eslint-plugin-prettier';
import TSESLint from 'typescript-eslint'

export default TSESLint.config(
  {
    // config with just ignores is the replacement for `.eslintignore`
    ignores: ['node_modules', 'dist', '.build', 'coverage'], // Directories to ignore
  },
  ESLint.configs.recommended,
  ...TSESLint.configs.recommended,
  ESLintConfigPrettier,
  {
    files: ['**/*.{js,mjs,cjs,jsx,ts,mts,cts,tsx}'],
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.es2021,
      },
    },
    plugins: {
        prettier: prettierPlugin,
    },
    rules: {
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": ["warn"],
        "@typescript-eslint/no-empty-object-type": "warn"
    },
  },
)