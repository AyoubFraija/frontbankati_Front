import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { CarteVirtuelle } from '../model/CarteVirtuelle.model';
import { Devise } from '../model/devise.enum';


@Injectable({
  providedIn: 'root',
})
export class CarteVirtuelleService {
  private baseUrl = 'http://localhost:8043/gestion_portefeuille/carte_virtuelle'; // URL du backend

  constructor(private http: HttpClient) {}

  genererCarte(somme: number,devise: string,color: number): Observable<CarteVirtuelle> {
    const params = new HttpParams().set('somme', somme);
    params.set('devise', devise);
    return this.http.post<CarteVirtuelle>(`${this.baseUrl}/generer?somme=${somme}&devise=${devise}&color=${color}`, null);
  }

  activer(carte: CarteVirtuelle): Observable<CarteVirtuelle> {
    return this.http.post<CarteVirtuelle>(`${this.baseUrl}/activer`, carte);
  }

  desactiver(carte: CarteVirtuelle): Observable<CarteVirtuelle> {
    return this.http.post<CarteVirtuelle>(`${this.baseUrl}/desactiver`, carte);
  }

  verifyExpiration(carte: CarteVirtuelle): Observable<CarteVirtuelle> {
    return this.http.post<CarteVirtuelle>(`${this.baseUrl}/verify_expiration`, carte);
  }

  retirer(carte: CarteVirtuelle, somme: number): Observable<CarteVirtuelle> {
    const params = new HttpParams().set('somme', somme.toString());
    return this.http.post<CarteVirtuelle>(`${this.baseUrl}/retirer`, carte, { params });
  }
  convertir(devise: string, carte:CarteVirtuelle): Observable<CarteVirtuelle> {
      const params = new HttpParams().set('target', devise);
      return this.http.post<CarteVirtuelle>(`${this.baseUrl}/convertir`,carte, { params });
    }

  tauxDeChange(base:string): Observable<{[key: string]: number}> {
    return this.http.get<any>('https://v6.exchangerate-api.com/v6/29ddb693deaa9dba9f4060b5/latest/'+base).pipe(
    map(response => {
      const conversionRates = response.conversion_rates;
      return {
        EUR: conversionRates.EUR,
        MAD: conversionRates.MAD,
        USD: conversionRates.USD
      };
    })
  );
}
  creerCarte(somme: number,devise: string,id:number,color:number): Observable<CarteVirtuelle> {
    const params = new HttpParams().set('somme', somme);
    params.set('devise', devise);
    params.set('id',id);
    return this.http.post<CarteVirtuelle>(`${this.baseUrl}/creer?somme=${somme}&devise=${devise}&id=${id}&color=${color}`, null);
  }
  
  changerPlafond(carte: CarteVirtuelle, plafond: number): Observable<CarteVirtuelle> {
    const params = new HttpParams().set('plafond', plafond.toString());
    return this.http.post<CarteVirtuelle>(`${this.baseUrl}/changer_plafond?id=${carte.numeroCarte}&somme=${plafond}`, null);
  }

}

