import { applicationConfig, Preview } from '@storybook/angular';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

const preview: Preview = {
  globalTypes: {
    themeMode: {
      name: 'Tema',
      description: 'Claro / Escuro',
      defaultValue: 'light',
      toolbar: {
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Claro' },
          { value: 'dark', title: 'Escuro' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (story, context) => {
      const isDark = context.globals['themeMode'] === 'dark';
      document.documentElement.classList.toggle('p-dark', isDark);
      return story();
    },
    applicationConfig({
      providers: [
        providePrimeNG({
          theme: {
            preset: Aura,
            options: {
              darkModeSelector: '.p-dark',
            },
          },
        }),
      ],
    }),
  ],
};

export default preview;
