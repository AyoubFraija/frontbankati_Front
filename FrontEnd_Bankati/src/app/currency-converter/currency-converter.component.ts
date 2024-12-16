import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CurrencyExchangeService} from "../currency-exchange.service";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-currency-converter',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,RouterModule,HttpClientModule],
  templateUrl: './currency-converter.component.html',
  styleUrl: './currency-converter.component.css',
  providers: [CurrencyExchangeService]   //Fournir le service ici
})

export class CurrencyConverterComponent implements OnInit {
  amount: number = 1;
  fromCurrency: string = 'EUR';
  toCurrency: string = 'USD';
  exchangeRate: number = 1.05712;
  selectedDate: Date = new Date();
  convertedAmount: number | null = null;


  constructor(private currencyExchangeService: CurrencyExchangeService) {} // Injectez le service

  ngOnInit(): void {
    this.getExchangeRate(); // Appelez pour initialiser le taux
  }


  getFlagUrl(currency: string): string {
    return `assets/flags/${currency.toLowerCase()}.png`;
  }


  convert() {
    if (this.fromCurrency && this.toCurrency && this.amount) {


      this.currencyExchangeService.getExchangeRate(this.fromCurrency, this.toCurrency).subscribe((rate: number) => {

        this.exchangeRate = rate;
        this.convertedAmount = this.amount * rate;

        this.currencyExchangeService.getHistoricalRates(this.fromCurrency, this.toCurrency, this.getPastMonthDates()).subscribe(data => {


          this.updateChart(data)


        })

      });
    }
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


  updateChart(data: any){

// Logique pour mettre à jour le graphique avec les données historiques


  }




  getExchangeRate(){

    if (this.fromCurrency && this.toCurrency){

      this.currencyExchangeService.getExchangeRate(this.fromCurrency, this.toCurrency).subscribe((rate:number) => {


        this.exchangeRate = rate

        if(this.amount) this.convertedAmount = this.amount * this.exchangeRate



      })

    }

  }
}
