import { Routes } from '@angular/router';
import { AuthGuardGuard } from './services/guards/auth.guard.guard';
import { canActivateUsuario } from './services/guards/new-guard';
import { UserService } from './services/user.service';
import { HttpClient } from '@angular/common/http';

export const routes: Routes = [
  {
    path: 'splash',
    loadComponent: () => import('./pages/splash/splash.page').then( m => m.SplashPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile.page').then( m => m.ProfilePage)
    //canActivate: [canActivateUsuario]
  },
  {
    path: 'create-trip',
    loadComponent: () => import('./pages/create-trip/create-trip.page').then( m => m.CreateTripPage)
  },
  {
    path: 'join-trip',
    loadComponent: () => import('./pages/join-trip/join-trip.page').then( m => m.JoinTripPage)
  },
  {
    path: 'trip-detail/:id',
    loadComponent: () => import('./pages/trip-detail/trip-detail.page').then( m => m.TripDetailPage)
  },
  {
    path: 'user-type-menu',
    loadComponent: () => import('./pages/user-type-menu/user-type-menu.page').then(m => m.UserTypeMenuPage)
  },
  {
    path: '**',
    redirectTo: 'splash'
  }

];