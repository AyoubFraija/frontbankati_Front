import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AuthService } from "../service/Auth.service";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
  imports: [
    RouterLink,
    FormsModule,
    NgIf
  ],
  standalone: true
})
export class ChangePasswordComponent {
  successMessage: string | null = null;
  errorMessage: string | null = null;

  newPassword: string = '';
  confirmPassword: string = '';
  email: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  // Méthode de changement de mot de passe
  changePassword() {
    this.successMessage = null;
    this.errorMessage = null;

    // Vérification des champs
    if (!this.email) {
      this.errorMessage = 'Email is required.';
      return;
    }

    if (!this.newPassword || !this.confirmPassword) {
      this.errorMessage = 'All fields are required.';
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    // Appel au service pour changer le mot de passe
    this.authService.changePassword(this.email, this.newPassword,this.confirmPassword).subscribe({
      next: (response) => {
        console.log('Objet reçu :', response); // Log de l'objet reçu
        this.successMessage = 'Your password has been successfully changed!';
      },
      error: (err) => {
        console.error('Error changing password:', err);
        this.errorMessage = err?.error?.message || 'Error changing password. Please try again later.';
      },
    });
  }

  // Méthode pour réinitialiser le formulaire
  clearForm() {
    this.newPassword = '';
    this.confirmPassword = '';
    this.email = '';
  }
}
