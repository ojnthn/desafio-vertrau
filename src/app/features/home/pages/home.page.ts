import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../../shared/molecules/card/card.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, CardComponent],
  template: `
    <app-card>
      <div card-header>
        <h2>Home</h2>
      </div>

      <p>Bem-vindo ao sistema 🚀</p>
    </app-card>
  `,
})
export class HomePage {}
