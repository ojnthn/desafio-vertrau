import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ButtonModule } from 'primeng/button';

/**
 * Botão base da aplicação
 *
 * Baseado em PrimeNG e usado como átomo no Design System.
 */
@Component({
  selector: 'app-button',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() label = 'Botão';
  @Input() disabled = false;
  @Input() loading = false;

  @Input() variant: 'primary' | 'secondary' = 'primary';
  @Input() destructive = false;

  @Output() action = new EventEmitter<void>();

  get severity(): 'secondary' | 'danger' {
    return this.destructive ? 'danger' : 'secondary';
  }

  get outlined(): boolean {
    return this.variant === 'secondary';
  }

  get isDisabled(): boolean {
    return this.disabled || this.loading;
  }

  onClick(): void {
    if (this.isDisabled) return;
    this.action.emit();
  }
}
