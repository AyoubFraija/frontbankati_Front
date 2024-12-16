import { Component } from '@angular/core';
import { AuthService } from '../service/Auth.service';
import {Router, RouterLink} from '@angular/router';
import { AuthResponse } from '../model/auth-response.model';
import {FormsModule} from "@angular/forms";
import {NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'app-login1',
  templateUrl: './login1.component.html',
  styleUrls: ['./login1.component.css'],
  imports: [
    FormsModule,
    NgClass,
    RouterLink,
    NgIf
  ],
  standalone: true
})
export class Login1Component {
  credentials = {
    email: '',
    password: ''
  };
  errorMessage: string | null = null;
  showPassword: boolean = false;
  isFirstLogin = true;



  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      console.log('L\'utilisateur est authentifié');
    } else {
      console.log('L\'utilisateur n\'est pas authentifié');
    }
  }

  onLogin(): void {
    this.authService.login(this.credentials.email, this.credentials.password).subscribe(
      (response: AuthResponse) => {
        console.log('Objet reçu de l\'authentification:', response); // Log de l'objet reçu

        if (response) {
          const token = response.token;

          if (token) {
            this.isFirstLogin = false;
            this.authService.saveToken(token);
          }

          if (this.isFirstLogin) {
            // Si c'est la première connexion, rediriger vers la page de changement de mot de passe
            this.router.navigate(['/change-password']);
          } else {
            // Après la première connexion, rediriger en fonction du rôle
            const userRoles = this.authService.getUserRole();
            if (userRoles.includes('ROLE_ADMIN')) {
              // Si l'utilisateur est un admin, rediriger vers /admin
              this.router.navigate(['/admin']);
            } else if (userRoles.includes('ROLE_AGENT')) {
              // Si l'utilisateur est un agent, rediriger vers /create-client
              this.router.navigate(['/client']);
            } else if (userRoles.includes('ROLE_CLIENT')) {
              // Si l'utilisateur est un client, rediriger vers /dashboard
              this.router.navigate(['/dashboard']);
            } else {
              // Si aucun rôle spécifique n'est trouvé, rediriger vers la page par défaut
              this.router.navigate(['/total']);
            }
          }
        } else {
          this.errorMessage = 'Email ou mot de passe incorrect';
        }
      },
      (error) => {
        console.error('Erreur lors de la connexion:', error); // Log des erreurs
        this.errorMessage = 'Erreur lors de la connexion';
      }
    );
  }


  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
