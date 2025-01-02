import { Component, HostListener } from '@angular/core';
import { CommonModule, NgClass } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-recharge',
  standalone: true,
  imports: [
    CommonModule,
    NgClass,
    FormsModule,
    RouterLink
  ],
  templateUrl: './recharge.component.html',
  styleUrl: './recharge.component.css'
})

export class RechargeComponent {
  isFactureVisible = true;
  isHistoriqueVisible = false;
  isButtonVisible: boolean = true;
  operator: string = '';
  phoneNumber: string = '';
  rechargeAmount: number | null = null;
  isModalOpen: boolean = false;
  availableOffers: string[] = [
    `1h valable 3j d'appels nationaux`,
    `1h ou 1Go 7j de validité`,
    `1Go valable 7j internet 4G`,
    `1Go TikTok & Youtube 7j de validité`,
    `300Mo Réseaux sociaux valable 7j`,
    `3j illimité appels vers Inwi`,
    `10dh 6 mois de validité`
  ];
  selectedOffer: string = '';
  account: string = '';

  openOffersModal() {
    if (!this.operator) {
      alert('Veuillez sélectionner un opérateur.');
      return;
    }
    if (!this.phoneNumber) {
      alert('Veuillez entrer un numéro de téléphone.');
      return;
    }
    if (!this.rechargeAmount || this.rechargeAmount <= 0) {
      alert('Veuillez sélectionner un montant de recharge.');
      return;
    }
    this.isModalOpen = true;
  }
  closeOffersModal() {
    this.isModalOpen = false;
  }
  selectOffer(offer: string) {
    this.selectedOffer = offer;
  }
  rechargePhone() {
    if (!this.selectedOffer) {
      alert('Veuillez sélectionner une offre.');
      return;
    }
    if (!this.account) {
      alert('Veuillez choisir un compte.');
      return;
    }

    this.isModalOpen = false;
    console.log('Recharge initiée:');
    console.log('Opérateur:', this.operator);
    console.log('Numéro de Téléphone:', this.phoneNumber);
    console.log('Montant de Recharge:', this.rechargeAmount);
    console.log('Offre sélectionnée:', this.selectedOffer);
    console.log('Account Selected: ', this.account);
    alert('Recharge effectuée avec succès!');
    // Add your recharge logic here
  }
  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    const scrollPosition = window.scrollY;
    const pageHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;

    if (scrollPosition + windowHeight >= pageHeight - 50) {
      this.isButtonVisible = false;
    } else {
      this.isButtonVisible = true;
    }
  }

  showFacture() {
    this.isFactureVisible = true;
    this.isHistoriqueVisible = false;
  }

  showHistorique() {
    this.isFactureVisible = false;
    this.isHistoriqueVisible = true;
  }
}