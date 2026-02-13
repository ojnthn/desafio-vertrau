import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { SplitButtonComponent } from './split-button.component';
import { MenuItem } from 'primeng/api';

const meta: Meta<SplitButtonComponent> = {
  title: 'Atoms/SplitButton',
  component: SplitButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [SplitButtonComponent],
    }),
  ],
};

export default meta;

type Story = StoryObj<SplitButtonComponent>;

export const Default: Story = {
  args: {
    options: [
      {
        label: 'Salvar',
        icon: 'pi pi-check',
        command: (event) => {
          alert('Salvo com sucesso');
        },
      },
      {
        label: 'Excluir',
        icon: 'pi pi-trash',
        command: (event) => {
          alert('Excluido com sucesso');
        },
      },
    ] as MenuItem[],
  },
};
