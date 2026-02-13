import { Routes } from '@angular/router';
import { USER_ROUTES } from './features/user/user.routes';
import { HOME_ROUTES } from './features/home/home.routes';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./core/layout/app-shell.component')
        .then(m => m.AppShellComponent),
    children: [
      ...HOME_ROUTES,
      ...USER_ROUTES
    ],
  },

  { path: '**', redirectTo: '' },
];
