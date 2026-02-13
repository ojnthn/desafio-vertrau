import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';

export interface SelectOption<T = any> {
  label: string;
  value: T;
  disabled?: boolean;
}

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule, SelectModule, FormsModule], // ✅ FormsModule é obrigatório pro ngModel
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent<T = any> implements ControlValueAccessor {
  @Input() options: SelectOption<T>[] = [];
  @Input() placeholder = 'Selecione uma opção';
  @Input() disabled = false;
  @Input() clearable = false;

  // para bater com o uso que você quer
  @Input() inputId?: string;
  @Input() optionLabel = 'label';
  @Input() optionValue = 'value';

  // valor interno ligado ao ngModel do p-select
  value: T | null = null;

  private onChange: (value: T | null) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: T | null): void {
    this.value = value;
  }

  registerOnChange(fn: (value: T | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // chamado quando o p-select muda
  handleModelChange(value: T | null): void {
    this.value = value;
    this.onChange(value);
    this.onTouched(); // ✅ importante pra required “reconhecer”
  }

  handleBlur(): void {
    this.onTouched();
  }
}
