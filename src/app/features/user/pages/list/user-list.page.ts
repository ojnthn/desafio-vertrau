import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../../../shared/molecules/card/card.component';
import { ListComponent } from '../../../../shared/organisms/list/list.component';
import { USER_REPOSITORY, UserRepository } from '../../domain/repositories/user-new.repository';
import { UserEntity } from '../../domain/entities/user/user.entity';

@Component({
  selector: 'app-usuario-lista-page',
  standalone: true,
  imports: [CommonModule, CardComponent, ListComponent],
  templateUrl: './user-list.page.html',
})
export class UserListPage {
  constructor(
    @Inject(USER_REPOSITORY) 
    private repository: UserRepository
  ) {}

  get list(): UserEntity[] {
    return this.repository.findAll()
  }
}
