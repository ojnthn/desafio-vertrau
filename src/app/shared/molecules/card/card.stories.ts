import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { CardComponent } from './card.component';

const meta: Meta<CardComponent> = {
  title: 'Molecules/Card',
  component: CardComponent,
  decorators: [
    moduleMetadata({
      imports: [CardComponent],
    }),
  ],
  parameters: {
    layout: 'padded',
  },
};

export default meta;

type Story = StoryObj<CardComponent>;

export const Default: Story = {
  render: () => ({
    template: `
      <app-card>
        <p>Esse conteúdo é projetado via <code>ng-content</code>.</p>
      </app-card>
    `,
  }),
};