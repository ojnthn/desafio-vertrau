import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MenuItem, MenuItemCommandEvent } from 'primeng/api';

@Component({
  selector: 'app-split-button',
  standalone: true,
  imports: [SplitButtonModule],
  templateUrl: './split-button.component.html',
})
export class SplitButtonComponent {
  @Input({ required: true }) options!: MenuItem[];

  @Output() action = new EventEmitter<MenuItemCommandEvent>();

  onCommand(event: MenuItemCommandEvent): void {
    this.action.emit(event);
  }

  onPrimaryClick(event: MouseEvent): void {
    const commandEvent: MenuItemCommandEvent = {
      originalEvent: event,
      item: this.primaryOption,
    };

    this.primaryOption.command?.(commandEvent);
  }


  get primaryOption(): MenuItem {
    return this.options[0];
  }

  get otherOptions(): MenuItem[] {
    return this.options.slice(1);
  }
}
