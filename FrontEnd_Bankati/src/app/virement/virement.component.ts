import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterLink, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { CurrencyExchangeService } from "../currency-exchange.service";
import { VirementService } from '../service/VirementService.service';
import { VirementRequest } from '../model/VirementRequest.model';
import { Virement } from '../model/Virement.model';
import { Compte } from '../model/Compte.model';
import { TypeTransaction } from '../model/enum/TypeTransaction.enum';

@Component({
  selector: 'app-virement',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, HttpClientModule],
  templateUrl: './virement.component.html',
  styleUrl: './virement.component.css'
})
export class VirementComponent {
  beneficiaryRIB: string = '';
  amount: number | null = null;
  reason: string = '';
  executionDate: string = 'Maintenant';
  recurringOrder: boolean = false;
  isModalOpen: boolean = false;
  beneficiaryType: string = '';
  newBeneficiaryName: string = '';
  newBeneficiaryFirstName: string = '';
  newBeneficiaryRIB: string = '';
  smsCode: string = '';
  openBeneficiaryModal() {
    this.isModalOpen = true;
  }
  closeBeneficiaryModal() {
    this.isModalOpen = false;
  }
  addNewBeneficiary() {
    if (!this.beneficiaryType) {
      alert('Please select a beneficiary Type.');
    }
    if (!this.newBeneficiaryName) {
      alert('Please enter beneficiary Name.');
    }
    if (!this.newBeneficiaryFirstName) {
      alert('Please enter beneficiary first Name.');
    }
    if (!this.newBeneficiaryRIB) {
      alert('Please enter a beneficiary RIB.');
    }
    this.isModalOpen = false;

    console.log('New Beneficiary added:');
    console.log('Beneficiary Type:', this.beneficiaryType);
    console.log('Beneficiary Name:', this.newBeneficiaryName);
    console.log('Beneficiary first Name:', this.newBeneficiaryFirstName);
    console.log('Beneficiary RIB:', this.newBeneficiaryRIB);
    alert('New Beneficiary added!');
    // Implement your logic here to save a new beneficiary
  }
  openDatePicker() {
    alert('Open date picker')
    // Implement your date picker logic here
  }
  constructor(private virementService: VirementService) { }

  transfer() {
    // Implement your transfer logic here
    if (!this.beneficiaryRIB) {
      alert('Please enter the beneficiary RIB.');
      return;
    }
    if (!this.amount || this.amount <= 0) {
      alert('Please enter a valid transfer amount.');
      return;
    }
    console.log('Transfer initiated:');
    console.log('Beneficiary RIB:', this.beneficiaryRIB);
    console.log('Amount:', this.amount);
    console.log('Reason:', this.reason);
    console.log('Execution Date:', this.executionDate);
    console.log('Recurring Order:', this.recurringOrder);
    alert('Transfer successful!');
    const expediteur: Compte = {
      id: 2,
      solde: 0,
      devise: '',
      idUser: 0,
      rib: ''
    };
    // let idDest: any = '';
    // this.virementService.getCompteByRib("08023000000000905").subscribe((response) => {
    //   idDest = response.id;
    //   console.log("ID Destinataire: ", idDest);

    // });
    const destinataire: Compte = {
      id: 9, // Provide a default or actual ID
      solde: 0,
      devise: '',
      idUser: 0,
      rib: this.beneficiaryRIB, // Only provide RIB for backend to identify the account
    };

    const virement: Virement = {
      id: undefined,
      montant: this.amount !== null ? this.amount : 0,
      date: new Date(),
      idUser: 1, // Replace with actual user ID
      statutTransaction: undefined, // Replace with actual status
      typeTransaction: TypeTransaction.VIREMENT, // Replace with actual type
      expediteur: expediteur,
      destinataire: destinataire
    };
    const sms: any = {

      message: "Virement effectué avec succès"

    };
    const virementRequest = new VirementRequest(virement, sms);


    this.virementService.effectuerVirement(virementRequest).subscribe(
      (response: Virement) => {
        console.log('Transfer successful:', response);
        alert('Transfer successful!');
      },
      (error) => {
        console.error('Error during transfer:', error);
        alert('Error during transfer.');
      }
    );
  }
}