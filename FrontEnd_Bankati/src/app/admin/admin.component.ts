import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CommonModule, NgClass} from "@angular/common";
import {FormsModule, NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../service/Auth.service";
import {AgentService} from "../service/agent.service";
import {Agent} from "../model/agent.model";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    NgClass,
    FormsModule
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminComponent implements OnInit{
  agents: Agent[] = [];  // Utilisation du modèle Agent ici
  agent: Agent | null = null;
  formData = {
    lastname: '',
    firstname: '',
    email: '',
    emailConfirmation: '',
    phonenumber: '',
    numCin: '',
    address: '',
    description: '',
    birthdate: '',
    numLicence: '',
    numRegCom: '',
    cinRecto: null as File | null,
    cinVerso: null as File | null
  };

  loading = false;
  error = '';
  success = '';
  hasAccess = false;
  private cdRef!: ChangeDetectorRef
  selectedAgent: any = null;
  isCreateAgentModalOpen = false; // Variable pour contrôler l'état du modal
  constructor(private authService: AuthService,
              private router: Router ,
              private agentService: AgentService,
              cdRef: ChangeDetectorRef ) {
    this.cdRef = cdRef;
    this.checkAccess();}
  ngOnInit(): void {
    this.loadAgents();
    // Vérifier si l'utilisateur est authentifié à chaque accès
    if (!this.authService.isAuthenticated()) {
      // Si l'utilisateur n'est pas authentifié, rediriger vers la page de login
      this.router.navigate(['/login1']);
    }
    this.cdRef.detectChanges();
  }
  loadAgents() {
    this.agentService.getAllAgents().subscribe({
      next: (data) => {
        this.agents = data;
        console.log('Agents récupérés:', this.agents);
        this.cdRef.detectChanges();
        this.cdRef.markForCheck();
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement des agents';
      }
    });
  }


  goToCreateAgent(): void {
    this.isCreateAgentModalOpen = true; // Ouvre le modal
  }

// Fermer le modal
  closeCreateAgentModal(): void {
    this.isCreateAgentModalOpen = false; // Ferme le modal
  }

  private checkAccess(): void {
    const userRoles = this.authService.getUserRole();
    this.hasAccess = userRoles.includes('ROLE_ADMIN');

    if (!this.hasAccess) {
      this.router.navigate(['/total']);
    }
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
      this.agentService.createAgent(
        this.formData.lastname,
        this.formData.firstname,
        this.formData.email,
        this.formData.emailConfirmation,
        this.formData.numCin,
        this.formData.address,
        this.formData.phonenumber,
        this.formData.description,
        this.formData.cinRecto,
        this.formData.cinVerso,
        this.formData.birthdate,
        Number(this.formData.numLicence),
        Number(this.formData.numRegCom)

      ).subscribe({
        next: (response) => {
          this.success = 'agent créé avec succès';
          this.loading = false;
          form.resetForm();
          this.closeCreateAgentModal();
          this.agents.push(response);
          this.cdRef.detectChanges();
          this.loadAgents();
        },
        error: (error) => {
          this.error = error.error.message || 'Une erreur est survenue';
          this.loading = false;
        }
      });
    }
  }


  editAgent(agent: Agent): void {
    this.selectedAgent = { ...agent };
  }
  saveAgent(form: NgForm): void {
    if (form.valid && this.selectedAgent) {
      this.loading = true; // Indique que la sauvegarde est en cours

      // Appel du service pour sauvegarder les données de l'agent
      this.agentService.updateAgent(this.selectedAgent.id,this.selectedAgent).subscribe(
        (response) => {
          console.log('Agent mis à jour avec succès :', response);
          this.loading = false;
          this.cancelEdit(); // Fermer le modal après sauvegarde
          this.cdRef.detectChanges();
          this.loadAgents();
        },
        (error) => {
          console.error('Erreur lors de la mise à jour de l\'agent :', error);
          this.loading = false;
        }
      );
    }
  }

  // Supprimer un agent
  deleteAgent(id: number | undefined): void {
    if (!id) {
      this.error = 'L\'ID de l\'agent est invalide';
      return;
    }

    this.agentService.deleteAgent(id).subscribe({
      next: () => {
        // Supprimez l'agent localement
        this.agents = this.agents.filter(agent => agent.id !== id);

        // Forcer la détection des changements
        this.cdRef.detectChanges();

        // Affichez un message de succès
        this.success = 'Agent supprimé avec succès';
      },
      error: (err) => {
        console.error('Erreur lors de la suppression de l\'agent :', err);
        this.error = 'Erreur lors de la suppression de l\'agent';
      }
    });
  }


  // Cancel editing
  cancelEdit() {
    this.selectedAgent = null; // Reset form
  }
  trackByAgentId(index: number, agent: Agent): number {
    return <number>agent.id; // Utiliser l'ID comme identifiant unique
  }

}

