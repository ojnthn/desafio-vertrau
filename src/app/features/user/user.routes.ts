import { Routes } from '@angular/router';
import { USER_REPOSITORY, UserRepositoryImpl } from './domain/repositories/user-new.repository';
import { USER_LOCAL_DATASOURCE, UserLocalDatasourceImpl } from './data/datasources/user.datasource';

export const USER_ROUTES: Routes = [
  {
    path: 'usuario',
    children: [
      {
        path: 'lista',
        loadComponent: () =>
          import('./pages/list/user-list.page').then((m) => m.UserListPage),
      },
      {
        path: 'cadastro',
        providers: [
          UserRepositoryImpl,
          { provide: USER_REPOSITORY, useClass: UserRepositoryImpl },
          { provide: USER_LOCAL_DATASOURCE, useClass: UserLocalDatasourceImpl }
        ],
        loadComponent: () => import('./pages/new/user-new.page').then((m) => m.UserNewPage),
      }
    ],
  },
];
