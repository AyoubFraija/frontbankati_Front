import { Component, AfterViewInit, ElementRef, ViewChildren, QueryList, Input } from '@angular/core';
import jsPDF from "jspdf";
import { CommonModule, NgClass } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { MatDialog } from '@angular/material/dialog';

//import { ModalFacturesComponent } from '../modal-factures/modal-factures.component';
import { HttpClient } from '@angular/common/http';
import { FactureService } from '../service/FactureService.service';
import { Facture } from '../model/Facture.model';
import { Fournisseur } from '../model/Fournisseur.model';
import { ModalFacturesComponent } from "../modal-factures/modal-factures.component";
import { PaiementFacture } from '../model/PaiementFacture.model';
import { PaiementFactureService } from '../service/PaiementFacture.service';


// interface Creditor {
//   id: number;
//   name: string;
//   description: string;
//   image: string;
//   category: 'taxes' | 'electricity_water' | 'internet_purchases' | 'all';
// }

@Component({
  selector: 'app-creancier',
  standalone: true,
  imports: [
    CommonModule,
    NgClass,
    FormsModule,
    RouterLink,
    ModalFacturesComponent
  ],
  templateUrl: './creancier.component.html',
  styleUrl: './creancier.component.css'
})
export class CreancierComponent {
  // creditors: Creditor[] = [
  //   {
  //     name: 'IAM RECHARGES',
  //     description: 'Téléphonie et Internet SIM',
  //     image: 'assets/facture/maroctelecom.png',
  //     category: 'internet_purchases',
  //   },
  //   {
  //     name: 'IAM FACTURES',
  //     description: 'Produit Internet SIM, Produit Fixe SIM, Produit Mobile SIM',
  //     image: 'assets/facture/maroctelecom.png',
  //     category: 'internet_purchases',
  //   },
  //   {
  //     name: 'REDAL',
  //     description: 'Factures Redal',
  //     image: 'assets/facture/redal.png',
  //     category: 'electricity_water',
  //   },
  //   {
  //     name: 'AMENDIS TANGER',
  //     description: 'Factures Amendis Tanger',
  //     image: 'assets/facture/amendis.png',
  //     category: 'electricity_water',
  //   },
  //   {
  //     name: 'LYDEC',
  //     description: 'Factures Lydec',
  //     image: 'assets/facture/lydec.png',
  //     category: 'electricity_water',
  //   },
  //   {
  //     name: 'Marsa Maroc',
  //     description: 'Frais portuaires',
  //     image: 'assets/facture/Marsa-Maroc.jpg',
  //     category: 'taxes',
  //   },
  //   {
  //     name: 'CMA-CGM',
  //     description: 'Frais de transport maritime',
  //     image: 'assets/facture/cma.png',
  //     category: 'taxes',
  //   },
  //   {
  //     name: 'ANCFCC - Droits de conservation',
  //     description: 'Paiement des droits de conservation',
  //     image: 'assets/facture/ANCFCC - Droits de conservation.jpeg',
  //     category: 'taxes',
  //   },
  //   {
  //     name: 'ANCFCC - Consultations et commandes',
  //     description: 'Consultation et commandes ANCFCC',
  //     image: 'assets/facture/ANCFCC - Droits de conservation.jpeg',
  //     category: 'taxes',
  //   },
  //   {
  //     name: 'Ministère de la justice',
  //     description: 'Paiement des droits du ministère de la justice',
  //     image: 'assets/facture/Ministère de la justice.png',
  //     category: 'taxes',
  //   },
  //   {
  //     name: 'CNSS Travailleurs non-salariés',
  //     description: 'Paiement des cotisations CNSS',
  //     image: 'assets/facture/cnss.png',
  //     category: 'taxes'
  //   },
  //   {
  //     name: 'RADEM',
  //     description: 'Factures d\'eau et d\'électricité',
  //     image: 'assets/facture/radem.jpeg',
  //     category: 'electricity_water'
  //   },
  //   {
  //     name: 'RAK',
  //     description: 'Factures d\'eau et d\'électricité',
  //     image: 'assets/facture/RAK.jpeg',
  //     category: 'electricity_water',
  //   },
  //   {
  //     name: 'SRM Souss-Massa (Zone Ex RAMSA)',
  //     description: 'Factures d\'eau et d\'électricité',
  //     image: 'assets/facture/srm_souss_massa.png',
  //     category: 'electricity_water',
  //   },
  //   {
  //     name: 'RADEEF',
  //     description: 'Factures d\'eau et d\'électricité',
  //     image: 'assets/facture/RADEEF.jpeg',
  //     category: 'electricity_water',
  //   },
  //   {
  //     name: 'RADEETA',
  //     description: 'Factures d\'eau et d\'électricité',
  //     image: 'assets/facture/RADEETA.jpeg',
  //     category: 'electricity_water',
  //   },
  //   {
  //     name: 'RADEET',
  //     description: 'Factures d\'eau et d\'électricité',
  //     image: 'assets/facture/RADEET.jpeg',
  //     category: 'electricity_water',
  //   },
  //   {
  //     name: 'Express Relais',
  //     description: 'Achat en ligne',
  //     image: 'assets/facture/Express Relais.png',
  //     category: 'internet_purchases',
  //   },
  //   {
  //     name: 'Winxo',
  //     description: 'Achat en ligne',
  //     image: 'assets/facture/Winxo.png',
  //     category: 'internet_purchases',
  //   },
  //   {
  //     name: 'Royal Air Maroc',
  //     description: 'Achat en ligne',
  //     image: 'assets/facture/Royal Air Maroc.png',
  //     category: 'internet_purchases',
  //   },
  //   {
  //     name: 'AFRIQUIA',
  //     description: 'Achat en ligne',
  //     image: 'assets/facture/AFRIQUIA.png',
  //     category: 'internet_purchases',
  //   },
  //   {
  //     name: 'Atlas Voyages',
  //     description: 'Achat en ligne',
  //     image: 'assets/facture/atlas voyage.png',
  //     category: 'internet_purchases',
  //   },

  // ];
  constructor(private dialog: MatDialog, private http: HttpClient, private factureService: FactureService, private paiementFactureService: PaiementFactureService, private router: Router) { }


  creditors: Fournisseur[] = [];

  ngOnInit(): void {
    this.loadCreanciers();
  }

  loadCreanciers(): void {
    this.factureService.getCreanciers().subscribe(
      (data: Fournisseur[]) => {
        this.creditors = data.map(fournisseur => ({
          id: fournisseur.id,
          category: fournisseur.category,
          imageUrl: `assets/facture/${fournisseur.imageUrl}`,
          nom: fournisseur.nom
        }));
        this.filteredCreditors = [...this.creditors];
      },
      (error) => {
        console.error('Error fetching creditors:', error);
      }
    );
  }

  filteredCreditors: Fournisseur[] = [...this.creditors]; // Initial list is all creditors
  selectedCategory: 'all' | 'taxes' | 'electricity_water' | 'internet_purchases' = 'all'; // Initial filter category is 'all'

  // Filter the creditors based on the selected category
  filterCreditors(category: 'all' | 'taxes' | 'electricity_water' | 'internet_purchases') {
    this.selectedCategory = category; // Update currently selected category
    if (category === 'all') {
      this.filteredCreditors = [...this.creditors]; // Show all creditors
    } else {
      this.filteredCreditors = this.creditors.filter(
        (creditor) => creditor.category === category
      ); // Filter creditors based on the category
    }
  }
  onFilterChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const selectedValue = target.value as 'all' | 'taxes' | 'electricity_water' | 'internet_purchases';
    this.filterCreditors(selectedValue);
  }



  // factures: any[] = [];
  // isModalOpen = false;
  // openModal(creditorId: number): void {
  //   // Fetch factures for the selected creditor
  //   console.log("Creditor ID " + creditorId);

  //   this.factureService.getFacturesByFournisseurId(2).subscribe(
  //     (data) => {
  //       this.factures = data; // Store factures to display in modal
  //       this.isModalOpen = true; // Open modal
  //     },
  //     (error) => {
  //       console.error('Error fetching factures:', error);
  //     }
  //   );
  // }

  factures: any[] = [];
  array: any[] = [];
  isModalOpen = false;
  selectedCreditor: any = null;

  toggleSelectAll(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.factures.forEach((facture) => (facture.selected = checked));
  }
  openModal(creditorId: number): void {

    this.isModalOpen = true;
    this.selectedCreditor = this.filteredCreditors.find(c => c.id === creditorId);
    this.factureService.getFacturesByFournisseurId(creditorId).subscribe((factures) => {
      this.factures = factures;
    });
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.factures = [];
    this.selectedCreditor = null;
  }
  isLoading = false;

  payerFacture(facture: Facture): void {
    this.isLoading = true;

    const paiementFacture: PaiementFacture = {
      compte: {
        id: 1,
        solde: 0,
        devise: '',
        idUser: 0,
        rib: '08023000000000905'
      },
      facture: facture,
    };

    this.paiementFactureService.traiterPaiement(paiementFacture).subscribe(response => {
      console.log('Paiement effectué avec succès', response);
      this.router.navigate([this.router.url]);
      this.isLoading = false;

  
    }, error => {
      console.error('Erreur lors du paiement', error);
      this.isLoading = false;

    });
  }

}