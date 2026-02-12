import { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from './button.component';

const meta: Meta<ButtonComponent> = {
  title: 'Atoms/Button',
  component: ButtonComponent,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
    severity: {
      control: {
        type: 'select',
      },
      options: ['primary', 'secondary', 'success', 'danger'],
    },
  },
};

export default meta;

type Story = StoryObj<ButtonComponent>;

export const Primary: Story = {
  args: {
    label: 'Salvar',
    severity: 'primary',
    disabled: false,
  },
};

export const Secondary: Story = {
  args: {
    label: 'Cancelar',
    severity: 'secondary',
  },
};

export const Success: Story = {
  args: {
    label: 'Confirmar',
    severity: 'success',
  },
};

export const Danger: Story = {
  args: {
    label: 'Excluir',
    severity: 'danger',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Desabilitado',
    disabled: true,
  },
};
