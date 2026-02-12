import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonComponent } from './shared/atoms/button/button.component';

@Component({
  selector: 'app-root',
  imports: [ButtonComponent],
  template: `
    <app-button
      label="Salvar"
      [disabled]="false"
      severity="success">
    </app-button>
  `
})
export class App {
  protected readonly title = signal('desafio-vertrau');
}
