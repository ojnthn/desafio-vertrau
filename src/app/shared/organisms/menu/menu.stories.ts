import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { MenuComponent } from './menu.component';

import { MenubarModule } from 'primeng/menubar';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';

const meta: Meta<MenuComponent> = {
  title: 'Organisms/Menu',
  component: MenuComponent,
  decorators: [
    moduleMetadata({
      imports: [
        MenubarModule,
        AvatarModule,
        BadgeModule,
        RippleModule,
      ],
    }),
  ],
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<MenuComponent>;

export const Default: Story = {};