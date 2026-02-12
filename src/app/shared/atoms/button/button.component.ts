import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [ButtonModule],
  template: `
    <p-button
      [label]="label"
      [disabled]="disabled"
      [severity]="severity">
    </p-button>
  `,
})
export class ButtonComponent {
  @Input() label = 'Botão';
  @Input() disabled = false;
  @Input() severity: 'primary' | 'secondary' | 'success' | 'danger' = 'primary';
}
