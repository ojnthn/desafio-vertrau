import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

import { ListComponent } from './list.component';

const meta: Meta<ListComponent<any>> = {
  title: 'Organisms/List',
  component: ListComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        ButtonModule,
        ListComponent,
      ],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    items: {
      description: 'Lista de registros exibidos',
      table: {
        category: 'Data',
        type: { summary: 'Array<any>' },
      },
    },
    columns: {
      description: 'Configuração das colunas',
      table: {
        category: 'Data',
        type: {
          summary: '{ label: string; field: string }[]',
        },
      },
    },
    actionLabel: {
      control: 'text',
      description: 'Texto do botão de ação',
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'Ação' },
      },
    },
    action: {
      action: 'row-action',
      description: 'Evento disparado ao clicar no botão da linha',
      table: {
        category: 'Events',
      },
    },
  },
};

export default meta;

type Story = StoryObj<ListComponent<any>>;

export const Default: Story = {
  args: {
    items: [
      { name: 'João Silva', email: 'joao@email.com' },
      { name: 'Maria Souza', email: 'maria@email.com' },
    ],
    columns: [
      { label: 'Nome', field: 'name' },
      { label: 'Email', field: 'email' },
    ],
    actionLabel: 'Editar',
  },
};

export const Empty: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  args: {
    items: [],
    columns: [
      { label: 'Nome', field: 'name' },
      { label: 'Email', field: 'email' },
    ],
    actionLabel: 'Ver',
  },
};

