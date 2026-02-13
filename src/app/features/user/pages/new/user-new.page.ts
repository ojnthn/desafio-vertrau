import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../../../shared/molecules/card/card.component';

@Component({
  selector: 'app-usuario-novo-page',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './user-new.page.html',
})
export class UserNewPage {}
