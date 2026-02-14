import { Injectable, InjectionToken } from '@angular/core';
import { UserNewModel } from '../models/user-new/user-new.mode';
import { UserModel } from '../models/user/user.model';
import { LocalDbService } from '../../../../core/services/local-storage-db/local-storage-db.service';

export interface UserLocalDatasource {
    save(user: UserNewModel): UserModel;
    findAll(): UserModel[];
}

export const USER_LOCAL_DATASOURCE =
  new InjectionToken<UserLocalDatasource>('USER_LOCAL_DATASOURCE');

@Injectable()
export class UserLocalDatasourceImpl implements UserLocalDatasource {

  private readonly KEY = 'users';

  constructor(
    private storage: LocalDbService
  ) {}

  save(post: UserNewModel): UserModel {
    const created = new UserModel(
      crypto.randomUUID(),
      post.firstName,
      post.lastName,
      post.gender,
      post.cep,
      post.state,
      post.street,
      post.neighborhood,
      post.number,
      post.complement
    );

    this.storage.insert(this.KEY, created);

    return created;
  }

  findAll(): UserModel[] {
    return this.storage.getAll(this.KEY);
  }
}
