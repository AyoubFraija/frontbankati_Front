import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { Facture } from '../model/Facture.model';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { PaiementFacture } from '../model/PaiementFacture.model';
import { FactureService } from '../service/FactureService.service';
import { PaiementFactureService } from '../service/PaiementFacture.service';
import { TypeService } from '../model/enum/TypeService.enum';


@Component({
  selector: 'app-facture',
  standalone: true,
  imports: [
    RouterLink,
    HttpClientModule,
    CommonModule


  ],
  templateUrl: './facture.component.html',
  styleUrl: './facture.component.css'
})
export class FactureComponent implements OnInit {
  factures: Facture[] = [];

  constructor(private factureService: FactureService, private paiementFactureService: PaiementFactureService, private router: Router
  ) { }

  ngOnInit(): void {
    this.getFactures();
  }
  isLoading = false;

  getFactures(): void {
    this.isLoading = true;

    this.factureService.recupererFactures().subscribe((data: Facture[]) => {
      data.forEach(facture => {
        console.log("Facture rech : ", facture);
      });
      this.isLoading = false;
      this.factures = data.filter(facture => facture.type_facture != TypeService.RECHARGE);

    });
  }
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

      // Update the facture status or refresh the list
      this.getFactures();
    }, error => {
      console.error('Erreur lors du paiement', error);
      this.isLoading = false;

    });
  }

}