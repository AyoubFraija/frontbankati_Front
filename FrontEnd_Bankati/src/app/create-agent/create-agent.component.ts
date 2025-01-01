// create-agent.component.ts
import {Component, OnInit} from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {NgForOf, NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {AuthService} from "../service/Auth.service";
import {AgentService} from "../service/agent.service";


@Component({
  selector: 'app-create-agent',
  templateUrl: './create-agent.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgForOf
  ],
  styleUrls: ['./create-agent.component.scss']
})
export class CreateAgentComponent  {
  // formData = {
  //   lastname: '',
  //   firstname: '',
  //   email: '',
  //   emailConfirmation: '',
  //   phonenumber: '',
  //   numCin: '',
  //   address: '',
  //   description: '',
  //   birthdate: '',
  //   numLicence: '',
  //   numRegCom: '',
  //   cinRecto: null as File | null,
  //   cinVerso: null as File | null
  // };
  //
  // loading = false;
  // error = '';
  // success = '';
  // hasAccess = false;
  // constructor(
  //   private agentService: AgentService,
  //   private authService: AuthService,
  //   private router: Router
  // ) {this.checkAccess();}
  //
  // ngOnInit(): void {
  //   this.checkAccess();
  //   }
  // private checkAccess(): void {
  //   const userRoles = this.authService.getUserRole();
  //   this.hasAccess = userRoles.includes('ROLE_ADMIN');
  //
  //   if (!this.hasAccess) {
  //     this.router.navigate(['/total']);
  //   }
  // }
  //
  //
  // onFileSelected(event: any, fileType: 'cinRecto' | 'cinVerso') {
  //   const file = event.target.files[0];
  //   if (file) {
  //     this.formData[fileType] = file;
  //   }
  // }
  //
  // onSubmit(form: NgForm) {
  //   if (form.valid && this.formData.cinRecto && this.formData.cinVerso) {
  //     this.loading = true;
  //     this.error = '';
  //     this.success = '';
  //     this.agentService.createAgent(
  //       this.formData.lastname,
  //       this.formData.firstname,
  //       this.formData.email,
  //       this.formData.emailConfirmation,
  //       this.formData.numCin,
  //       this.formData.address,
  //       this.formData.phonenumber,
  //       this.formData.description,
  //       this.formData.cinRecto,
  //       this.formData.cinVerso,
  //       this.formData.birthdate,
  //       Number(this.formData.numLicence),
  //       Number(this.formData.numRegCom)
  //
  //     ).subscribe({
  //       next: (response) => {
  //         this.success = 'agent créé avec succès';
  //         this.loading = false;
  //         form.resetForm();
  //         this.router.navigate(['/dashboard']);
  //       },
  //       error: (error) => {
  //         this.error = error.error.message || 'Une erreur est survenue';
  //         this.loading = false;
  //       }
  //     });
  //   }
  // }
  // cancel() {
  //   // Réinitialiser les données du formulaire
  //   this.formData = {
  //     lastname: '',
  //     firstname: '',
  //     email: '',
  //     emailConfirmation: '',
  //     numCin: '',
  //     address: '',
  //     phonenumber: '',
  //     description: '',
  //     cinRecto: null as File | null,
  //     cinVerso: null as File | null,
  //     birthdate: '',
  //     numLicence: '',
  //     numRegCom: ''
  //   };
  //
  //   // Réinitialiser le formulaire NgForm
  //   this.success = '';
  //   this.error = '';
  //   this.loading = false;
  // }
  //

}
