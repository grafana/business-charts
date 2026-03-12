import tsParser from '@typescript-eslint/parser';
import { defineConfig, globalIgnores } from 'eslint/config';
import prettierConfig from 'eslint-config-prettier/flat';
import grafanaConfig from '@grafana/eslint-config/flat.js';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import eslintConfig from '@volkovlabs/eslint-config';

const normalizedGrafanaConfig = grafanaConfig.map((config) => {
  if (Array.isArray(config?.plugins) && config.plugins.includes('react-hooks')) {
    return reactHooksPlugin.configs.flat.recommended;
  }

  return config;
});

/**
 * Config
 */
export default defineConfig(
  ...normalizedGrafanaConfig,
  eslintConfig,
  prettierConfig,
  {
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ['tsconfig.json'],
        sourceType: 'module',
      },
    },
    rules: {
      '@typescript-eslint/no-empty-object-type': 'off',
      'react-hooks/component-hook-factories': 'off',
      'react-hooks/config': 'off',
      'react-hooks/error-boundaries': 'off',
      'react-hooks/gating': 'off',
      'react-hooks/globals': 'off',
      'react-hooks/immutability': 'off',
      'react-hooks/preserve-manual-memoization': 'off',
      'react-hooks/purity': 'off',
      'react-hooks/refs': 'off',
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/set-state-in-render': 'off',
      'react-hooks/static-components': 'off',
      'react-hooks/use-memo': 'off',
    },
  },
  globalIgnores([
    '.config/*',
    '.prettierrc.js',
    'coverage/*',
    'dist/*',
    'eslint.config.mjs',
    'jest*.js',
    'playwright.config.ts',
    'webpack.config.ts',
    'src/__mocks__/**',
    'src/**/*.test.ts*',
    'test/*',
  ])
);
