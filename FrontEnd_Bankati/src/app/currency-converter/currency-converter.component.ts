import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CurrencyExchangeService} from "../currency-exchange.service";
import {CommonModule} from "@angular/common";
import {Portefeuille} from "../model/Portefeuille.model";
import {RouterLink,Router} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import { PortefeuilleService } from '../service/PortefeuilleService.service';
import { Devise } from '../model/devise.enum';
import { CarteDetailsService } from '../service/CarteDetailsService.service';
import { CarteVirtuelle } from '../model/CarteVirtuelle.model';
import { CarteVirtuelleService } from '../service/CarteVirtuelleService.service';

@Component({
  selector: 'app-currency-converter',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,RouterLink, HttpClientModule],
  templateUrl: './currency-converter.component.html',
  styleUrl: './currency-converter.component.css',
  providers: [CurrencyExchangeService,PortefeuilleService,CarteDetailsService]   //Fournir le service ici
})

export class CurrencyConverterComponent implements OnInit {
  amount: number = 1;
  fromCurrency: string = 'EUR';
  toCurrency: string = 'USD';
  exchangeRate: number = 12;
  selectedDate: Date = new Date(); 
  convertedAmount: number | null = null;
  portefeuille: Portefeuille = {id: 1, utilisateurId: 1, devise: Devise.EUR, solde: 1000, cartes: []};
  devises = ['EUR','USD','MAD'];
  carte : any;
  exchangeRates: { [key: string]: number } = {};

  constructor(private currencyExchangeService: CurrencyExchangeService,private portefeuilleService : PortefeuilleService,private carteDetailsService : CarteDetailsService, private carteVirtuelleService : CarteVirtuelleService,private router:Router) {} // Injectez le service

  ngOnInit(): void {
    this.carte = history.state.carte;
    this.fromCurrency = this.carte.devise;
    this.carteVirtuelleService.tauxDeChange(this.fromCurrency).subscribe((rate) => {
      this.exchangeRates = rate;
      console.log(this.exchangeRate);
    });
    console.log(this.carte);
  }


  getFlagUrl(currency: string): string {
    return `assets/flags/${currency.toLowerCase()}.png`;
  }

 
  getPastMonthDates(): Date[]{
    const today = new Date();
    const pastMonthDates: Date[] = [];

    for(let i = 30; i >=0; i--){
      const date = new Date(today);

      date.setDate(today.getDate() -i);
      pastMonthDates.push(date);

    }

    return pastMonthDates


  }


  convert(devise: string, carte : CarteVirtuelle) {
      this.carteVirtuelleService.convertir(devise, carte).subscribe((carte) => {
        console.log(carte);
        this.router.navigateByUrl('/cart');;
      });
  }
  
  getPortefeuille(id: number) {
    this.portefeuilleService.getPortefeuille(id).subscribe((portefeuille) => {
      this.portefeuille = portefeuille;
      console.log(this.portefeuille);
    });
  }
  

  expectedAmount(): number {
    return Math.round(this.carte.solde*this.exchangeRates[this.toCurrency]);
  }


}