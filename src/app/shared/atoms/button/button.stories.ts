import type { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from './button.component';

const meta: Meta<ButtonComponent> = {
  title: 'Atoms/Button',
  component: ButtonComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['primary', 'secondary'],
      description: 'Define a variante visual do botão',
      table: {
        type: { summary: `'primary' | 'secondary'` },
        defaultValue: { summary: 'primary' },
        category: 'Appearance',
      },
    },
    destructive: {
      control: 'boolean',
      description: 'Aplica estilo visual para ações destrutivas',
      table: {
        category: 'Appearance',
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Desabilita o botão independentemente de outros estados',
      table: {
        category: 'State',
      },
    },
    loading: {
      control: 'boolean',
      description: 'Exibe estado de carregamento (apenas na variante primary)',
      if: { arg: 'variant', eq: 'primary' },
      table: {
        category: 'State',
      },
    },
    action: {
      action: 'button-click',
      description: 'Evento disparado ao clicar no botão',
      table: {
        category: 'Events',
      },
    },
  },
};

export default meta;

type Story = StoryObj<ButtonComponent>;

export const Default: Story = {
  args: {
    label: 'Salvar',
    variant: 'primary',
    destructive: false,
    disabled: false,
    loading: false,
  },
};

export const Secondary: Story = {
  args: {
    label: 'Voltar',
    variant: 'secondary',
    destructive: false,
    disabled: false,
    loading: false,
  },
};
