
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { TokenService } from '../services/token.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private tokenService: TokenService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
  return true; // ← Permite navegación
    /*
    const user = this.tokenService.getUser();
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
    */
  }
}
