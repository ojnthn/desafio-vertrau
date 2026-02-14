import type { Meta, StoryObj } from '@storybook/angular';
import { ListComponent, DataListColumn } from './list.component';

interface User {
  id: number;
  firstName: string;
  lastName: string;
}

const mockUsers: User[] = [
  { id: 1, firstName: 'Jonathan', lastName: 'Silva' },
  { id: 2, firstName: 'Maria', lastName: 'Oliveira' },
  { id: 3, firstName: 'Carlos', lastName: 'Souza' },
];

const columns: DataListColumn<User>[] = [
  { label: 'Nome', field: 'firstName' },
  { label: 'Sobrenome', field: 'lastName' },
];

const meta: Meta<ListComponent<User>> = {
  title: 'Organisms/List',
  component: ListComponent,
  tags: ['autodocs'],
  args: {
    items: mockUsers,
    columns,
  },
};

export default meta;

type Story = StoryObj<ListComponent<User>>;

export const Default: Story = {};

export const EmptyList: Story = {
  args: {
    items: [],
  },
};

export const ManyItems: Story = {
  args: {
    items: [
      ...mockUsers,
      { id: 4, firstName: 'Ana', lastName: 'Pereira' },
      { id: 5, firstName: 'Lucas', lastName: 'Costa' },
    ],
  },
};
