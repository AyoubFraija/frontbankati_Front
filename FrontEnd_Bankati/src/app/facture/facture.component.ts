import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { Facture } from '../model/Facture.model';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { PaiementFacture } from '../model/PaiementFacture.model';
import { FactureService } from '../service/FactureService.service';
import { PaiementFactureService } from '../service/PaiementFacture.service';


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


  getFactures(): void {
    this.factureService.recupererFactures().subscribe((data: Facture[]) => {
      this.factures = data;
    });
  }
  payerFacture(facture: Facture): void {
    const paiementFacture: PaiementFacture = {
      compte: {
        id: 1,
        solde: 0,
        devise: '',
        idUser: 0
      },
      facture: facture,
    };

    this.paiementFactureService.traiterPaiement(paiementFacture).subscribe(response => {
      console.log('Paiement effectué avec succès', response);
      this.router.navigate([this.router.url]);

      // Update the facture status or refresh the list
      this.getFactures();
    }, error => {
      console.error('Erreur lors du paiement', error);
    });
  }

}