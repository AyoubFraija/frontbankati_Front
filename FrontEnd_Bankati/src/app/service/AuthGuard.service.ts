import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "./Auth.service";

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const requiredRoles = next.data['roles'] as Array<string>;  // Récupérer les rôles requis pour la route

    if (this.authService.isAuthenticated()) {
      const userRoles = this.authService.getUserRole();  // Récupérer les rôles de l'utilisateur depuis AuthService

      // Vérifier si l'un des rôles de l'utilisateur est dans les rôles requis
      if (requiredRoles && requiredRoles.length > 0 && userRoles.some(role => requiredRoles.includes(role))) {
        return true;  // L'utilisateur a un rôle valide, autoriser l'accès
      } else {
        // L'utilisateur n'a pas les droits nécessaires, rediriger vers une page de non autorisé ou d'erreur
        this.router.navigate(['/total']);  // Ou rediriger vers la page d'accueil par défaut
        return false;
      }
    } else {
      // L'utilisateur n'est pas authentifié, rediriger vers la page de login
      this.router.navigate(['/login1']);
      return false;
    }
  }
}
