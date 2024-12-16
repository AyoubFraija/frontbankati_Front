import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {Component} from "@angular/core";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './signup1.component.html',
  styleUrls: ['./signup1.component.css']
})
export class Signup1Component {
  fullName: string = '';
  email: string = '';
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSignUp() {
    // Vérifier si les mots de passe correspondent
    if (this.password !== this.confirmPassword) {
      console.error('Passwords do not match');
      return;
    }

    // Vérifier si tous les champs sont remplis
    if (!this.fullName || !this.email || !this.username || !this.password) {
      console.error('Please fill in all fields');
      return;
    }

    // Ici, vous pouvez ajouter la logique d'inscription
    console.log('Sign up attempt with:', {
      fullName: this.fullName,
      email: this.email,
      username: this.username
    });
  }
}
