import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/supabase/usuario.service'; // Ruta corregida para el servicio

@Injectable({
  providedIn: 'root'
})
export class NoauthGuard implements CanActivate {

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // Verifica si el usuario NO está autenticado
    if (!this.usuarioService.estaAutenticado()) {
      return true; // Permite el acceso a la ruta
    } else {
      // Si el usuario está autenticado, redirige a una ruta específica (por ejemplo, la página principal)
      this.router.navigate(['/home']);
      return false; // No permite el acceso a la ruta actual
    }
  }
}




