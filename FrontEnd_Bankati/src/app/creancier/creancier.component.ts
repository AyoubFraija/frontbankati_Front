import { Component, AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import jsPDF from "jspdf";
import { CommonModule, NgClass } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";

interface Creditor {
  name: string;
  description: string;
  image: string;
  category: 'taxes' | 'electricity_water' | 'internet_purchases' | 'all';
}

@Component({
  selector: 'app-creancier',
  standalone: true,
  imports: [
    CommonModule,
    NgClass,
    FormsModule,
    RouterLink
  ],
  templateUrl: './creancier.component.html',
  styleUrl: './creancier.component.css'
})
export class CreancierComponent {
  creditors: Creditor[] = [
    {
      name: 'IAM RECHARGES',
      description: 'Téléphonie et Internet SIM',
      image: 'assets/facture/maroctelecom.png',
      category: 'internet_purchases',
    },
    {
      name: 'IAM FACTURES',
      description: 'Produit Internet SIM, Produit Fixe SIM, Produit Mobile SIM',
      image: 'assets/facture/maroctelecom.png',
      category: 'internet_purchases',
    },
    {
      name: 'REDAL',
      description: 'Factures Redal',
      image: 'assets/facture/redal.png',
      category: 'electricity_water',
    },
    {
      name: 'AMENDIS TANGER',
      description: 'Factures Amendis Tanger',
      image: 'assets/facture/amendis.png',
      category: 'electricity_water',
    },
    {
      name: 'LYDEC',
      description: 'Factures Lydec',
      image: 'assets/facture/lydec.png',
      category: 'electricity_water',
    },
    {
      name: 'Marsa Maroc',
      description: 'Frais portuaires',
      image: 'assets/facture/Marsa-Maroc.jpg',
      category: 'taxes',
    },
    {
      name: 'CMA-CGM',
      description: 'Frais de transport maritime',
      image: 'assets/facture/cma.png',
      category: 'taxes',
    },
    {
      name: 'ANCFCC - Droits de conservation',
      description: 'Paiement des droits de conservation',
      image: 'assets/facture/ANCFCC - Droits de conservation.jpeg',
      category: 'taxes',
    },
    {
      name: 'ANCFCC - Consultations et commandes',
      description: 'Consultation et commandes ANCFCC',
      image: 'assets/facture/ANCFCC - Droits de conservation.jpeg',
      category: 'taxes',
    },
    {
      name: 'Ministère de la justice',
      description: 'Paiement des droits du ministère de la justice',
      image: 'assets/facture/Ministère de la justice.png',
      category: 'taxes',
    },
    {
      name: 'CNSS Travailleurs non-salariés',
      description: 'Paiement des cotisations CNSS',
      image: 'assets/facture/cnss.png',
      category: 'taxes'
    },
    {
      name: 'RADEM',
      description: 'Factures d\'eau et d\'électricité',
      image: 'assets/facture/radem.jpeg',
      category: 'electricity_water'
    },
    {
      name: 'RAK',
      description: 'Factures d\'eau et d\'électricité',
      image: 'assets/facture/RAK.jpeg',
      category: 'electricity_water',
    },
    {
      name: 'SRM Souss-Massa (Zone Ex RAMSA)',
      description: 'Factures d\'eau et d\'électricité',
      image: 'assets/facture/srm_souss_massa.png',
      category: 'electricity_water',
    },
    {
      name: 'RADEEF',
      description: 'Factures d\'eau et d\'électricité',
      image: 'assets/facture/RADEEF.jpeg',
      category: 'electricity_water',
    },
    {
      name: 'RADEETA',
      description: 'Factures d\'eau et d\'électricité',
      image: 'assets/facture/RADEETA.jpeg',
      category: 'electricity_water',
    },
    {
      name: 'RADEET',
      description: 'Factures d\'eau et d\'électricité',
      image: 'assets/facture/RADEET.jpeg',
      category: 'electricity_water',
    },
    {
      name: 'Express Relais',
      description: 'Achat en ligne',
      image: 'assets/facture/Express Relais.png',
      category: 'internet_purchases',
    },
    {
      name: 'Winxo',
      description: 'Achat en ligne',
      image: 'assets/facture/Winxo.png',
      category: 'internet_purchases',
    },
    {
      name: 'Royal Air Maroc',
      description: 'Achat en ligne',
      image: 'assets/facture/Royal Air Maroc.png',
      category: 'internet_purchases',
    },
    {
      name: 'AFRIQUIA',
      description: 'Achat en ligne',
      image: 'assets/facture/AFRIQUIA.png',
      category: 'internet_purchases',
    },
    {
      name: 'Atlas Voyages',
      description: 'Achat en ligne',
      image: 'assets/facture/atlas voyage.png',
      category: 'internet_purchases',
    },

  ];

  filteredCreditors: Creditor[] = [...this.creditors]; // Initial list is all creditors
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
    const selectedValue = target.value as  'all' | 'taxes' | 'electricity_water' | 'internet_purchases';
    this.filterCreditors(selectedValue);
  }

}