import { Routes } from '@angular/router';
import { AuthGuard } from '../app/services/guards/auth.guard'; //
import { NoauthGuard } from '../app/services/guards/noauth.guard'; //

export const routes: Routes = [
  {
    path: 'splash',
    loadComponent: () => import('./pages/splash/splash.page').then( m => m.SplashPage)
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then( m => m.RegisterPage)
  },
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full',
  },
];
