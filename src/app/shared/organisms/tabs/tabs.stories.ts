import type { Meta, StoryObj } from '@storybook/angular';
import { TabsComponent, TabItem } from './tabs.component';
import { Component } from '@angular/core';

const meta: Meta<TabsComponent> = {
  title: 'Organisms/Tabs',
  component: TabsComponent,
  tags: ['autodocs'],
  argTypes: {
    tabs: {
      action: 'tabs',
      description: 'Lista de abas para exibição',
      table: {
        category: 'Behaviour'
      }
    }
  }
};

export default meta;
type Story = StoryObj<TabsComponent>;

@Component({
  selector: 'app-first-tab',
  standalone: true,
  template: `<p>Conteúdo da primeira aba</p>`,
})
export class FirstTabComponent {}

@Component({
  selector: 'app-second-tab',
  standalone: true,
  template: `<p>Conteúdo da segunda aba</p>`,
})
export class SecondTabComponent {}

export const Default: Story = {
  args: {
    tabs: [
      { value: '0', label: 'Primeira Aba', component: FirstTabComponent },
      { value: '1', label: 'Segunda Aba', component: SecondTabComponent },
    ],
  },
};

