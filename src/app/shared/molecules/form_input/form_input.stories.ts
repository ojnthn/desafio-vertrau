import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { FormInputComponent } from './form_input.component';

const meta: Meta<FormInputComponent> = {
  title: 'Atoms/FormInput',
  component: FormInputComponent,
  decorators: [
    moduleMetadata({
      imports: [
        FormsModule,
        InputTextModule,
        InputMaskModule,
      ],
    }),
  ],
  argTypes: {
    label: { control: 'text' },
    type: { 
      control: { type: 'radio', options: ['default', 'phone', 'post-code'] }
    },
    disabled: { control: 'boolean' },
    model: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<FormInputComponent>;

export const Default: Story = {
  args: {
    label: 'Nome',
    type: 'default',
    disabled: false,
    model: '',
  },
};

export const Phone: Story = {
  args: {
    label: 'Telefone',
    type: 'phone',
    disabled: false,
    model: '',
  },
};

export const PostCode: Story = {
  args: {
    label: 'CEP',
    type: 'post-code',
    disabled: false,
    model: '',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Desabilitado',
    type: 'default',
    disabled: true,
    model: 'Não editável',
  },
};
