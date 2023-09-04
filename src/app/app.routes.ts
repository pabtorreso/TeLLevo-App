import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then((m) => m.LoginPage),
  },
  
  {
    path: 'pasajero',
    loadComponent: () =>
      import('./pasajero/pasajero.page').then((m) => m.PasajeroPage),
  },

  {
    path: 'conductor',
    loadComponent: () => import('./conductor/conductor.page').then( m => m.ConductorPage)
  },
  {
    path: '**',
    redirectTo: 'login'
  }
  
];
