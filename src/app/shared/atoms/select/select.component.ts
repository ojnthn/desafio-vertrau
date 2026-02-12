import { Component, Input, Output, EventEmitter } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';

/**
 * Tipo genérico para opção de select
 */
export interface SelectOption<T = any> {
  label: string;
  value: T;
  disabled?: boolean;
}

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [SelectModule, FormsModule],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent<T = any> {
  /** Lista de opções */
  @Input() options: SelectOption<T>[] = [];

  /** Valor selecionado */
  @Input() value?: T;

  /** Placeholder do select */
  @Input() placeholder = 'Selecione uma opção';

  /** Desabilita o select */
  @Input() disabled = false;

  /** Limpa seleção */
  @Input() clearable = false;

  /** Evento disparado ao alterar o valor */
  @Output() valueChange = new EventEmitter<T>();

  onChange(value: T): void {
    this.valueChange.emit(value);
  }
}
