import { Routes } from '@angular/router';

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
        loadComponent: () => import('./pages/new/user-new.page').then((m) => m.UserNewPage),
      }
    ],
  },
];
