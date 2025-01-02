import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ClientService } from "../service/client.service";
import { NgForOf, NgIf } from "@angular/common";
import { AccountType, AccountTypeData, AccountTypeEnum } from "../model/AccountType";
import { Router } from "@angular/router";
import { AuthService } from "../service/Auth.service";
import { Client } from "../model/client.model";

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
    numcin: '',
    accountType: '',
    cinRecto: null as File | null,
    cinVerso: null as File | null
  };
  editingClient: Client | null = null;
  accountTypes: Array<{ type: AccountTypeEnum, data: AccountTypeData }> = [];
  loading = false;
  error = '';
  success = '';
  hasAccess = false;
  private cdRef!: ChangeDetectorRef;
  selectedClient: any = null;
  clients: Client[] = [];  // Liste des clients récupérés
  client: Client | null = null;
  isCreateClientModalOpen = false;

  constructor(
    private clientService: ClientService,
    private authService: AuthService,
    private router: Router,
    cdRef: ChangeDetectorRef
  ) {
    this.cdRef = cdRef;
    this.checkAccess();  // Vérification de l'accès dès le début
  }

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
    this.loadClients();  // Chargement des clients dès le démarrage
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

      // Utilisation de la description du type de compte pour l'API
      const accountTypeDescription = AccountType.getDescription(this.formData.accountType as AccountTypeEnum);

      this.clientService.createClient(
        this.formData.lastname,
        this.formData.firstname,
        this.formData.email,
        this.formData.emailConfirmation,
        this.formData.phonenumber,
        this.formData.numcin,
        this.formData.cinRecto,
        this.formData.cinVerso,
        accountTypeDescription
      ).subscribe({
        next: (response) => {
          this.success = 'Client créé avec succès';
          this.loading = false;
          form.resetForm();
          this.closeCreateClientModal();
          this.clients.push(response);
          this.cdRef.detectChanges();
          this.loadClients();  // Recharger la liste des clients après la création
        },
        error: (error) => {
          this.error = error.error.message || 'Une erreur est survenue';
          this.loading = false;
        }
      });
    }
  }

  loadClients() {
    this.clientService.getAllClients().subscribe({
      next: (data) => {
        this.clients = data;
        console.log('Clients récupérés:', this.clients);
        this.cdRef.detectChanges();
        this.cdRef.markForCheck();
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement des clients';
      }
    });
  }

  editClient(client: Client): void {
    this.selectedClient = { ...client };
  }

  saveClient(form: NgForm): void {
    if (form.valid && this.selectedClient) {
      this.loading = true; // Indique que la sauvegarde est en cours
      this.clientService.updateClient(this.selectedClient.id, this.selectedClient).subscribe(
        (response) => {
          console.log('Client mis à jour avec succès :', response);
          this.loading = false;
          this.cancelEdit(); // Fermer le modal après sauvegarde
          this.cdRef.detectChanges();
          this.loadClients();  // Recharger la liste après la mise à jour
        },
        (error) => {
          console.error('Erreur lors de la mise à jour du client :', error);
          this.loading = false;
        }
      );
    }
  }

  deleteClient(id: number | undefined): void {
    if (!id) {
      this.error = 'L\'ID du client est invalide';
      return;
    }

    this.clientService.deleteClient(id).subscribe({
      next: () => {
        // Supprimer le client localement
        this.clients = this.clients.filter(client => client.id !== id);
        this.cdRef.detectChanges();
        this.success = 'Client supprimé avec succès';
      },
      error: (err) => {
        console.error('Erreur lors de la suppression du client :', err);
        this.error = 'Erreur lors de la suppression du client';
      }
    });
  }

  cancelEdit() {
    this.selectedClient = null; // Réinitialiser le formulaire
  }

  trackByClientId(index: number, client: Client): number {
    return client.id as number;  // Utiliser l'ID comme identifiant unique
  }

  goToCreateClient(): void {
    this.isCreateClientModalOpen = true; // Ouvre le modal
  }

  closeCreateClientModal(): void {
    this.isCreateClientModalOpen = false; // Ferme le modal
  }
}
