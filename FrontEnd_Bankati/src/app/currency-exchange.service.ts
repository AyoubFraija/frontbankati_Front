import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {forkJoin, Observable, throwError} from 'rxjs';
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CurrencyExchangeService {

  private apiKey = 'VOTRE_CLE_API'; // Remplacez par votre propre clé API depuis Open Exchange Rates ou une autre API


  private apiUrl = `https://openexchangerates.org/api/latest.json?app_id=${this.apiKey}`;
  private historicalApiUrl = `https://openexchangerates.org/api/historical/`;




  constructor(private http: HttpClient) { }


  getExchangeRate(from: string, to: string): Observable<number> {


    const url = `${this.apiUrl}&base=${from}&symbols=${to}`;

    return this.http.get<any>(url).pipe(
      map(data => {


        if (data && data.rates && data.rates[to]){
          return data.rates[to];

        }else {


          throw new Error ("Taux de change non disponible")


        }
      }),

      catchError(this.handleError)



    );
  }



  getHistoricalRates(from: string, to: string, dates: Date[]): Observable<any> {
    const observables: Observable<any>[] = [];


    for (const date of dates) {

      const formattedDate = this.formatDate(date);


      const url = `${this.historicalApiUrl}${formattedDate}.json?app_id=${this.apiKey}&base=${from}&symbols=${to}`;



      observables.push(
        this.http.get(url).pipe(

          map((data: any) => ({date: formattedDate, rate: data.rates[to]})),
          catchError(this.handleError)



        )


      );




    }


    return forkJoin(observables)


// Combiner tous les observables en un seul


  }


  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }





  private handleError(error: any): Observable<never>{

    console.error('Une erreur s\'est produite', error);

    return throwError(() => new Error('Impossible de récupérer les taux de change. Veuillez réessayer plus tard.'))


  }
}
