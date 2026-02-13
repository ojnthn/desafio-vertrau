import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { FormInputComponent } from './form-input.component';

const meta: Meta<FormInputComponent> = {
  title: 'Molecules/FormInput',
  component: FormInputComponent,
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    control: {
      description: 'FormControl responsável pelo valor e validação do campo',
      control: false,
      table: {
        type: { summary: 'FormControl' },
        category: 'Form',
      },
    },
    label: {
      description: 'Texto exibido no FloatLabel',
      control: 'text',
      table: {
        type: { summary: 'string' },
        category: 'UI',
      },
    },
    type: {
      description: 'Define o tipo do input e a máscara aplicada automaticamente',
      control: 'radio',
      options: ['text', 'phone', 'post-code'],
      table: {
        type: { summary: `'text' | 'phone' | 'post-code'` },
        defaultValue: { summary: 'text' },
        category: 'Behavior',
      },
    },
    errorMessage: {
      description: 'Mensagem exibida quando o campo está inválido e foi tocado',
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Campo inválido' },
        category: 'Feedback',
      },
    },
  },
};

export default meta;
type Story = StoryObj<FormInputComponent>;

export const Default: Story = {
  args: {
    label: 'Nome',
    control: new FormControl('', Validators.required),
    errorMessage: 'Campo obrigatório',
  },
};

export const Phone: Story = {
  args: {
    label: 'Telefone',
    type: 'phone',
    control: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    errorMessage: 'Telefone inválido',
  },
};

export const PostCode: Story = {
  args: {
    label: 'CEP',
    type: 'post-code',
    control: new FormControl('', Validators.required),
    errorMessage: 'CEP obrigatório',
  },
};
