import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

import { FormComponent } from './form.component';
import { FormInputComponent } from '../../molecules/form-input/form-input.component';
import { ButtonComponent } from '../../atoms/button/button.component';

const meta: Meta<FormComponent> = {
  title: 'Organisms/Form',
  component: FormComponent,
  decorators: [
    moduleMetadata({
      imports: [
        ReactiveFormsModule,
        FormComponent,
        FormInputComponent,
        ButtonComponent,
      ],
    }),
  ],
  argTypes: {
    formResult: {
      action: 'formResult',
      description: 'Disparado ao submeter o formulário com dados válidos',
      table: { category: 'Events' },
    },
    cancel: {
      action: 'cancel',
      description: 'Disparado ao clicar em cancelar',
      table: { category: 'Events' },
    },
    loading: {
      control: 'boolean',
      description: 'Estado de carregamento do botão de submit',
      table: { category: 'State' },
    },
    submitLabel: {
      control: 'text',
      table: { category: 'Appearance' },
    },
    cancelLabel: {
      control: 'text',
      table: { category: 'Appearance' },
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<FormComponent>;

export const Default: Story = {
  render: (args) => {
    const form = new FormGroup({
      name: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      phone: new FormControl('', {
        nonNullable: true,
        validators: [],
      }),
      cep: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });

    return {
      props: {
        ...args,
        form,
        fields: [
          {
            name: 'name',
            label: 'Nome',
            control: form.controls['name'],
            errorMessage: 'Nome obrigatório',
          },
          {
            name: 'phone',
            label: 'Telefone',
            type: 'phone',
            control: form.controls['phone'],
            errorMessage: 'Telefone inválido',
          },
          {
            name: 'cep',
            label: 'CEP',
            type: 'post-code',
            control: form.controls['cep'],
            errorMessage: 'CEP inválido',
          },
        ],
      },
    };
  },
  args: {
    submitLabel: 'Salvar',
    cancelLabel: 'Cancelar',
    loading: false,
  },
};

export const Loading: Story = {
  ...Default,
  args: {
    submitLabel: 'Salvando...',
    loading: true,
  },
};
