import { Routes } from '@angular/router';

export const routes: Routes = [
  {
<<<<<<< HEAD
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.page').then( m => m.RegisterPage)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
 
=======
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
  
>>>>>>> 365552ef4f5321842223bc6c25b6388aeaab0201
];
