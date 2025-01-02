import { Component,OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";
import { CarteVirtuelleService } from '../service/CarteVirtuelleService.service';
import { PortefeuilleService } from '../service/PortefeuilleService.service';
import {Portefeuille} from "../model/Portefeuille.model";
import { Devise } from '../model/devise.enum';
import { CarteVirtuelle } from '../model/CarteVirtuelle.model';
import {HttpClientModule} from "@angular/common/http";
import { Router } from '@angular/router';
import { CarteDetailsService } from '../service/CarteDetailsService.service';
import { ModalStatusService } from '../service/modal-status.service';

@Component({
  selector: 'app-cart',
  standalone: true,
    imports: [
      RouterLink,
        HttpClientModule,
        CommonModule,
    ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
  providers: [RouterLink, PortefeuilleService, CarteDetailsService]
})
export class CartComponent implements OnInit {
  portefeuille: Portefeuille = {id: 1, utilisateurId: 1, devise: Devise.EUR, solde: 1000, cartes: []};
  cartes : CarteVirtuelle[] = [];
    constructor(private portefeuilleService : PortefeuilleService,private router: Router,private carteDetailsService : CarteDetailsService,private dialog: ModalStatusService) {} 
    ngOnInit(): void {
      this.getPortefeuille(1);
      console.log(this.portefeuille)
    }

    getPortefeuille(id: number): void {
      this.portefeuilleService.getPortefeuille(id).subscribe(
        (portefeuille) => {
          this.portefeuille = portefeuille;
          this.getCarteVirtuelle(this.portefeuille.id);
        },
        (error) => {
          console.error('Error fetching portefeuille:', error);
        }
      );
    }
  
    getCarteVirtuelle(id: number): void {
      this.portefeuilleService.getCartes(id).subscribe(
        (cartes) => {
          this.cartes = cartes;
          console.log(this.cartes);
        },
        (error) => {
          console.error('Error fetching cartes:', error);
        }
      );
    }

    format(number: number): string {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  getCardClass(color:number): string {
    const classes = ['blue', 'gray', 'gold'];
    if (color == 1) {
      return classes[0];
    } else if (color == 2) {
      return classes[1];
    }
    else if (color == 3) { 
      return classes[2];
    }
    return '';
  }

  navigateToCardDetail(carte: any, index: number): void {
    const couleur = this.getCardClass(index);
    this.carteDetailsService.setCarte(carte);
    this.carteDetailsService.setCouleur(this.getCardClass(index));
    this.router.navigateByUrl('/card-detail', { state: { carte: carte, couleur: couleur} });
  }

  navigateToCardCreation(): void {
    if (this.cartes.length >= 3) {
      this.dialog.openCarteModal();
    }
    else {
    this.router.navigateByUrl('/carteForm', { state: { portefeuille: this.portefeuille} });
    }
  }

  goBack(): void {
    this.router.navigate(['/dashboard']); 
  }
}
