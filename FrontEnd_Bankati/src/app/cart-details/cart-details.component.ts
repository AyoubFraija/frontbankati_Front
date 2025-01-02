import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarteDetailsService } from '../service/CarteDetailsService.service';
import { Router } from '@angular/router';
import {RouterLink} from "@angular/router";
import { CarteVirtuelleService } from '../service/CarteVirtuelleService.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalStatusService } from '../service/modal-status.service';

@Component({
  selector: 'app-cart-details',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    HttpClientModule
  ],
  templateUrl: './cart-details.component.html',
  styleUrl: './cart-details.component.css',
  providers: [CarteDetailsService, CarteVirtuelleService, RouterLink, HttpClientModule]
})
export class CartDetailsComponent implements OnInit {
  carte: any;
  couleur: any;

  constructor(private carteDetailsService: CarteDetailsService,private router: Router, private carteVirtuelleService: CarteVirtuelleService,private snackBar: MatSnackBar,private dialog: ModalStatusService) { 
  }
    ngOnInit(): void {
      this.carte = history.state.carte;
      this.couleur = this.carte.color;
      console.log(this.carte);
    }

    format(value: any): string {
      if (typeof value === 'number') {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      } else if (typeof value === 'string') {
        // Vérifier si le format correspond à une date ISO complète
        const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}[+-]\d{2}:\d{2}$/;
        if (isoDateRegex.test(value)) {
          return value.split('T')[0]; // Extraire uniquement la partie date
        }
      }
      return value;
    }
    

  toggleCardStatus(statut: any) {
    console.log(statut);
    if (statut === 'ACTIVE'){
       this.carteVirtuelleService.desactiver(this.carte).subscribe(
          (data) => {
            this.carte = data;
            this.router.navigateByUrl('/cart');
          }
        );
    } else {
      this.carteVirtuelleService.activer(this.carte).subscribe(
        (data) => {
          this.carte = data;
          this.router.navigateByUrl('/cart');
        }
      );
    }
  }

  navigateToConvert(carte: any): void {
    this.carteDetailsService.setCarte(carte);
    this.router.navigateByUrl('/currency', { state: { carte: carte} });
}
getRemainingBalancePercentage(carte: any): string {
  if (carte.solde_init && carte.solde) {
    return String((carte.solde / carte.solde_init) * 100);
  }
  return '0';
}
openDialogStatus(){
    this.dialog.openStatusModal(this.carte);
}

openDialogPlafond(){
  this.dialog.openPlafondModal(this.carte);
}
goBack(): void {
  this.router.navigate(['/cart']); // Remplacez '/previous-page' par la route de la page précédente
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
}


