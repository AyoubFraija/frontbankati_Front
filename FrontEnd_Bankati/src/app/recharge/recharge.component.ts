import { Component, HostListener } from '@angular/core';
import { CommonModule, NgClass } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { PaiementFactureService } from '../service/PaiementFacture.service';
import { PaiementFacture } from '../model/PaiementFacture.model';
import { Facture } from '../model/Facture.model';
import { FactureService } from '../service/FactureService.service';
import { StatutFacture } from '../model/enum/StatutFacture.enum';
import { TypeService } from '../model/enum/TypeService.enum';
import { Fournisseur } from '../model/Fournisseur.model';

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
  selectedFournisseurId: number | null = null;


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
  isLoading = false;

  rechargePhone() {
    this.isLoading = true;

    this.isModalOpen = false;
    // console.log('Recharge initiée:');
    // console.log('Opérateur:', this.operator);
    // console.log('Numéro de Téléphone:', this.phoneNumber);
    // console.log('Montant de Recharge:', this.rechargeAmount);
    // console.log('Offre sélectionnée:', this.selectedOffer);
    // console.log('Account Selected: ', this.account);
    // alert('Recharge effectuée avec succès!');

    // Add your recharge logic here
    const paiementFacture: PaiementFacture = {
      compte: {
        id: 1,
        solde: 0,
        devise: '',
        idUser: 0,
        rib: ''
      },
      facture: {
        type_facture: TypeService.RECHARGE,
        montant: this.rechargeAmount !== null ? this.rechargeAmount : 0,
        id: 0,
        dateEmission: '',
        dateEcheance: '',
        fournisseur: {
          id: this.operator !== null ? parseInt(this.operator, 10) : 0,
          nom: '',
          imageUrl: '',
          category: ''
        },
        dateLimite: '',
        statut: StatutFacture.EN_ATTENTE
      }
    };
    console.log("Paiement Facture", paiementFacture);

    this.paiementFactureService.recharge(paiementFacture).subscribe(response => {
      console.log('Paiement effectué avec succès', response);
      alert('Paiement effectué avec succès');

      this.router.navigate([this.router.url]);
      this.isLoading = false; // Stop loading on success


    }, error => {
      console.error('Erreur lors du paiement', error);
      alert('Erreur lors du paiement');
      this.isLoading = false;
    });

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
  ngOnInit(): void {
    this.loadCreanciers();
  }
  creditors: Fournisseur[] = [];

  loadCreanciers(): void {
    this.factureService.getCreanciers().subscribe(
      (data: Fournisseur[]) => {
        this.creditors = data.filter(fournisseur => fournisseur.category == 'internet_purchases').
          map(fournisseur => ({
            id: fournisseur.id,
            category: fournisseur.category,
            imageUrl: `assets/facture/${fournisseur.imageUrl}`,
            nom: fournisseur.nom
          }));


      },
      (error) => {
        console.error('Error fetching creditors:', error);
      }
    );
  }
  showHistorique() {
    this.isFactureVisible = false;
    this.isHistoriqueVisible = true;
  }
  constructor(private factureService: FactureService, private paiementFactureService: PaiementFactureService, private router: Router
  ) { }
  // recharger(): void {

  //   const paiementFacture: PaiementFacture = {
  //     compte: {
  //       id: 1,
  //       solde: 0,
  //       devise: '',
  //       idUser: 0
  //     },
  //     facture: {
  //       id: 0,
  //       dateEmission: '',
  //       dateEcheance: '',
  //       fournisseur: {
  //         id: 0, nom: '',
  //         imageUrl: '',
  //         category: ''
  //       },
  //       montant: this.rechargeAmount !== null ? this.rechargeAmount : 0,
  //       dateLimite: '',
  //       statut: StatutFacture.EN_ATTENTE,
  //       type_facture: TypeService.RECHARGE
  //     },
  //   };

  //   this.paiementFactureService.recharge(paiementFacture).subscribe(response => {
  //     console.log('Paiement effectué avec succès', response);
  //     this.router.navigate([this.router.url]);


  //   }, error => {
  //     console.error('Erreur lors du paiement', error);
  //   });
  // }
}