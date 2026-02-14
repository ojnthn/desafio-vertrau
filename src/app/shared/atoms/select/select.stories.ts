import type { Meta, StoryObj } from '@storybook/angular';
import { SelectComponent, SelectOption } from './select.component';

const meta: Meta<SelectComponent> = {
  title: 'Atoms/Select',
  component: SelectComponent,
  tags: ['autodocs'],
  argTypes: {
    options: {
      action: 'options',
      description: 'Lista de itens a ser exibido para seleção',
      table: {
        category: 'Behaviour',
      },
    }
  },
};

export default meta;
type Story = StoryObj<SelectComponent>;

export const Default: Story = {
  args: {
    label: 'Opções',
    options: [
      { label: 'Opção 1', value: 1 },
      { label: 'Opção 2', value: 2 },
      { label: 'Opção 3', value: 3 },
    ],
  },
};
