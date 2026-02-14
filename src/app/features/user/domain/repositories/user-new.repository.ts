import { Inject, Injectable, InjectionToken } from '@angular/core';

import { UserNewEntity } from '../entities/user-new/user-new.entity';
import { UserEntity } from '../entities/user/user.entity';

import {
  USER_LOCAL_DATASOURCE,
  UserLocalDatasource
} from '../../data/datasources/user.datasource';

import { UserNewModel } from '../../data/models/user-new/user-new.mode';

export const USER_REPOSITORY =
  new InjectionToken<UserRepository>('USER_REPOSITORY');

export interface UserRepository {
  save(user: UserNewEntity): UserEntity;
  findAll(): UserEntity[];
  update(user: UserEntity): void;
  delete(id: string): void;
}

@Injectable()
export class UserRepositoryImpl implements UserRepository {

  constructor(
    @Inject(USER_LOCAL_DATASOURCE)
    private readonly datasource: UserLocalDatasource
  ) {}

  save(entity: UserNewEntity): UserEntity {
    const postModel = UserNewModel.fromEntity(entity);
    const savedModel = this.datasource.save(postModel);
    return savedModel.toEntity();
  }

  findAll(): UserEntity[] {
    return this.datasource
      .findAll()
      .map(model => model.toEntity());
  }

  update(entity: UserEntity): void {}

  delete(id: string): void {
    this.datasource.delete(id);
  }
}
