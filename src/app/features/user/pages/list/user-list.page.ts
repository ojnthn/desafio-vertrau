import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../../../shared/molecules/card/card.component';
import { ListComponent } from '../../../../shared/organisms/list/list.component';

@Component({
  selector: 'app-usuario-lista-page',
  standalone: true,
  imports: [CommonModule, CardComponent, ListComponent],
  templateUrl: './user-list.page.html',
})
export class UserListPage {}
