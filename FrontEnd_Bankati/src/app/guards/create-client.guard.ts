// guards/create-client.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../service/Auth.service";

@Injectable({
  providedIn: 'root'
})
export class CreateClientGuard implements CanActivate{
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate( route: ActivatedRouteSnapshot,
               state: RouterStateSnapshot):  Observable<boolean> | Promise<boolean> | boolean  {
    const userRoles = this.authService.getUserRole();
    const hasRequiredRole = userRoles.includes('ROLE_ADMIN') || userRoles.includes('ROLE_AGENT');

    if (!hasRequiredRole) {
      this.router.navigate(['/total']); // ou une autre page d'erreur
      return false;
    }

    return true;
  }
}
