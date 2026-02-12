import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  "stories": ['../src/**/*.stories.ts'],
  "addons": ['@storybook/addon-docs'],
  "framework": "@storybook/angular",
  "staticDirs": ['../node_modules'],
};
export default config;