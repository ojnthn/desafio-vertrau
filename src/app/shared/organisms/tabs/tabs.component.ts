import { Component, Input, SimpleChanges, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'primeng/tabs';

export interface TabItem {
  value: string;
  label: string;
  component: Type<any>;
  disabled?: boolean;
}

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [CommonModule, TabsModule],
  templateUrl: './tabs.component.html',
})
export class TabsComponent {
  @Input() tabs: TabItem[] = [];
  @Input() activeIndex = 0;

  selectTab(index: number) {
    if (this.tabs[index]?.disabled) return;
    this.activeIndex = index;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tabs'] && this.tabs.length > 0 && this.activeIndex == null) {
      this.activeIndex = 0;
    }
  }

  get activeTab(): TabItem | null {
    return this.tabs[this.activeIndex] ?? null;
  }
}
