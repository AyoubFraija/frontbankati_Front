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
  private cdRef!: ChangeDetectorRef
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



  selectedAgent: any = null;
  isCreateAgentModalOpen = false; // Variable pour contrôler l'état du modal

  goToCreateAgent(): void {
    this.isCreateAgentModalOpen = true; // Ouvre le modal
  }

// Fermer le modal
  closeCreateAgentModal(): void {
    this.isCreateAgentModalOpen = false; // Ferme le modal
  }
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
  cancel() {
    // Réinitialiser les données du formulaire
    this.formData = {
      lastname: '',
      firstname: '',
      email: '',
      emailConfirmation: '',
      numCin: '',
      address: '',
      phonenumber: '',
      description: '',
      cinRecto: null as File | null,
      cinVerso: null as File | null,
      birthdate: '',
      numLicence: '',
      numRegCom: ''
    };

    // Réinitialiser le formulaire NgForm
    this.success = '';
    this.error = '';
    this.loading = false;
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
          this.agents.push(response);
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
  deleteAgent(id: number | undefined) {
    this.agentService.deleteAgent(id).subscribe({
      next: (data) => {
        this.success = 'Agent supprimé avec succès';
        this.agents = this.agents.filter(agent => agent.id !== id);
        console.log('Liste après suppression', this.agents);
        this.cdRef.detectChanges();
        this.loadAgents();// Recharger la liste des agents
      },
      error: (err) => {
        this.error = 'Erreur lors de la suppression de l\'agent';
      }
    });
  }

  // Cancel editing
  cancelEdit() {
    this.selectedAgent = null; // Reset form
  }
  saveUser() {
    if (this.selectedAgent.id) {
      // Update existing user
      const index = this.agents.findIndex((u) => u.id === this.selectedAgent.id);
      if (index !== -1) {
        this.agents[index] = { ...this.selectedAgent };
      }
    } else {
      // Add new user
      // @ts-ignore
      const newId = Math.max(...this.agents.map((u) => u.id)) + 1;
      this.selectedAgent.id = newId;
      this.agents.push({ ...this.selectedAgent });
    }
    this.selectedAgent = null; // Reset form
  }
  trackByAgentId(index: number, agent: Agent): number {
    return <number>agent.id; // Utiliser l'ID comme identifiant unique
  }

}

