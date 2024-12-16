// create-client.component.ts
import {Component, OnInit} from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {ClientService} from "../service/client.service";
import {NgForOf, NgIf} from "@angular/common";
import {AccountType, AccountTypeData, AccountTypeEnum} from "../model/AccountType";
import {Router} from "@angular/router";
import {AuthService} from "../service/Auth.service";


@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgForOf
  ],
  styleUrls: ['./create-client.component.scss']
})
export class CreateClientComponent implements OnInit {
  formData = {
    lastname: '',
    firstname: '',
    email: '',
    emailConfirmation: '',
    phonenumber: '',
    accountType: '',
    cinRecto: null as File | null,
    cinVerso: null as File | null
  };

  accountTypes: Array<{type: AccountTypeEnum, data: AccountTypeData}> = [];
  loading = false;
  error = '';
  success = '';
  hasAccess = false;
  constructor(
    private clientService: ClientService,
    private authService: AuthService,
    private router: Router
  ) {this.checkAccess();}
  private checkAccess(): void {
    const userRoles = this.authService.getUserRole();
    this.hasAccess = userRoles.includes('ROLE_ADMIN') || userRoles.includes('ROLE_AGENT');

    if (!this.hasAccess) {
      this.router.navigate(['/total']);
    }
  }
  ngOnInit() {
    // Récupération de tous les types de compte disponibles
    this.accountTypes = AccountType.getAllTypes();
  }

  onFileSelected(event: any, fileType: 'cinRecto' | 'cinVerso') {
    const file = event.target.files[0];
    if (file) {
      this.formData[fileType] = file;
    }
  }

  onSubmit(form: NgForm) {
    if (form.valid && this.formData.cinRecto && this.formData.cinVerso) {
      this.loading = true;
      this.error = '';
      this.success = '';

      // On utilise la description du type de compte pour l'API
      const accountTypeDescription = AccountType.getDescription(this.formData.accountType as AccountTypeEnum);

      this.clientService.createClient(
        this.formData.lastname,
        this.formData.firstname,
        this.formData.email,
        this.formData.emailConfirmation,
        this.formData.phonenumber,
        this.formData.cinRecto,
        this.formData.cinVerso,
        accountTypeDescription
      ).subscribe({
        next: (response) => {
          this.success = 'Client créé avec succès';
          this.loading = false;
          form.resetForm();
        },
        error: (error) => {
          this.error = error.error.message || 'Une erreur est survenue';
          this.loading = false;
        }
      });
    }
  }
  cancel() {
    // Réinitialiser les données du formulaire
    this.formData = {
      lastname: '',
      firstname: '',
      email: '',
      emailConfirmation: '',
      phonenumber: '',
      accountType: '',
      cinRecto: null as File | null,
      cinVerso: null as File | null
    };

    // Réinitialiser le formulaire NgForm
    this.success = '';
    this.error = '';
    this.loading = false;
  }

}
