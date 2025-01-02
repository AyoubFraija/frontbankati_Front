import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';
import { CarteVirtuelleService } from '../service/CarteVirtuelleService.service';
import { Router, RouterLink } from '@angular/router';
import { CarteVirtuelle } from '../model/CarteVirtuelle.model';
import { PortefeuilleService } from '../service/PortefeuilleService.service';
import { Devise } from '../model/devise.enum';

@Component({
  selector: 'app-carte-creation',
  standalone: true,
  imports: [FormsModule,RouterLink,CommonModule],
  templateUrl: './carte-creation.component.html',
  styleUrl: './carte-creation.component.css'
})
export class CarteCreationComponent implements OnInit {
  portefeuille: any;
  carte: any;
  solde: any;
  devise:any;
  color: number = 1;
  carte_virt:any = {
    "numeroCarte": null,
    "dateExpiration": null ,
    "solde": null,
    "cvv": null,
    "statut": null,
    "devise": null,
    "portefeuille": null
};

  constructor(private carteVirtuelle: CarteVirtuelleService,private router: Router,private portefeuilleService : PortefeuilleService) {}

  ngOnInit(): void {
    this.portefeuille = history.state.portefeuille;
    console.log(this.portefeuille);
  }

  creer(somme:number,devise:string,color:number): any {
    if (devise == "EUR") {
      this.devise = Devise.EUR;
    } else if (devise == "USD") {
      this.devise = Devise.USD;
    }
    else if (devise == "MAD") {
      this.devise = Devise.MAD;
    }
    console.log(somme,devise);
    this.carteVirtuelle.genererCarte(somme,devise,color).subscribe(
      (data) => {
        this.carte=data;
        console.log(this.carte)
        return data;
      }
    );
  }
  associer(carte: CarteVirtuelle): any {
    this.carte_virt["numeroCarte"] = carte.numeroCarte
    this.carte_virt["dateExpiration"] = carte.dateExpiration
    this.carte_virt["cvv"] = carte.cvv
    this.carte_virt["devise"] = carte.devise
    this.carte_virt["statut"] = carte.statut
    this.carte_virt["solde"]=carte.solde
    this.portefeuilleService.ajouterCarte(this.portefeuille.id,this.carte_virt).subscribe(
      (data) => {
        return data;
      }
    );
  }

  generer(somme:number,devise:Devise,id:number,color:number): any {
   this.carteVirtuelle.creerCarte(somme,devise,id,color).subscribe(
    (data) => {
      return data
    }
   )
    this.router.navigateByUrl('/dashboard');
  }
  getCardClass(): string {
    const classes = ['blue', 'gray', 'gold'];
    if (this.color == 1) {
      return classes[0];
    } else if (this.color == 2) {
      return classes[1];
    }
    else if (this.color == 3) { 
      return classes[2];
    }
    return '';
  }
  goBack(): void {
    this.router.navigate(['/cart']); // Remplacez '/previous-page' par la route de la page précédente
  }
}
