import { Component, Input, SimpleChanges, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'primeng/tabs';

export interface TabItem {
  value: string;

  /** Título da aba */
  label: string;

  /** Componente Angular a ser renderizado dentro da aba */
  component: Type<any>;

  /** Opcional: desabilita a aba */
  disabled?: boolean;
}

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [CommonModule, TabsModule],
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent {
  /** Lista de abas */
  @Input() tabs: TabItem[] = [];

  /** Aba ativa */
  activeIndex = 1;

  /** Seleciona aba ativa */
  selectTab(index: number) {
    if (this.tabs[index]?.disabled) return;
    this.activeIndex = index;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tabs'] && this.tabs.length > 0 && this.activeIndex === null) {
      // Define a primeira aba como ativa assim que o array de tabs estiver disponível
      this.activeIndex = 0;
    }
  }
}
