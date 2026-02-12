import type { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from './button.component';

const meta: Meta<ButtonComponent> = {
  title: 'Atoms/Button',
  component: ButtonComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['primary', 'secondary',],
      description: 'Tipo visual do botão',
    },
    destructive: {
      control: 'boolean',
      description: "Muda o visual para uma ação destrutiva"
    },
    disabled: {
      control: 'boolean',
      description: 'Desabilita o botão independentemente do estado',
    },
    loading: {
      control: 'boolean',
      description: 'Exibe loading (somente para primary)',
      if: { arg: 'variant', eq: 'primary' },
    },
    action: { 
      action: 'button-click',
      description: 'Evento disparado ao clicar no botão',
    },
  },
};

export default meta;

type Story = StoryObj<ButtonComponent>;

export const Primário: Story = {
  args: {
    label: 'Salvar',
    variant: 'primary',
    destructive: false,
    disabled: false,
    loading: false,
  },
};

export const Secundário: Story = {
  args: {
    label: 'Voltar',
    variant: 'secondary',
    destructive: false,
    disabled: false,
    loading: false,
  },
};
