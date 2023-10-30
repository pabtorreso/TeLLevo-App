import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { catchError, map } from "rxjs/operators";
import { of } from "rxjs";
import { UserService } from "../user.service";

export const canActivateUsuario: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(UserService);
  const router = inject(Router);

  return of(true);
};
