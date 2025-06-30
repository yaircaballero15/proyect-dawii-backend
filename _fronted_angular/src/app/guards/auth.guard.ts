import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { AuthStorageService } from '../services/auth-storage.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AuthStorageService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const user = this.auth.getUser();
    if (!user) {
      // No está logueado
      this.router.navigate(['/login']);
      return false;
    }

    const rolesPermitidos = route.data['roles'] as Array<string> | undefined;
    if (rolesPermitidos && !rolesPermitidos.includes(user.rolUsua)) {
      // No tiene el rol adecuado
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
