import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Portefeuille } from '../model/Portefeuille.model';
import { CarteVirtuelle } from '../model/CarteVirtuelle.model';
import { UpdateFacture } from '../model/UpdateFacture';
import { UpdatePortefeuille } from '../model/UpdatePortefeuille';


@Injectable({
  providedIn: 'root',
})
export class PortefeuilleService {
  private baseUrl = 'http://localhost:8043/gestion_portefeuille/portefeuille';

  constructor(private http: HttpClient) {}

  getPortefeuille(id: number): Observable<Portefeuille> {
    return this.http.get<Portefeuille>(`${this.baseUrl}/${id}`);
  }

  creerPortefeuille(utilisateurId: number, devise: string, solde: number): Observable<Portefeuille> {
    const params = new HttpParams()
      .set('utilisateurId', utilisateurId.toString())
      .set('devise', devise)
      .set('solde', solde.toString());
    return this.http.post<Portefeuille>(`${this.baseUrl}/creer`, null, { params });
  }

  ajouterCarte(id: number, carte: CarteVirtuelle): Observable<Portefeuille> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.post<Portefeuille>(`${this.baseUrl}/ajouterCarte?id=${id}`,{"carte" : carte });
  }

  deposer(portefeuille: Portefeuille, somme: number): Observable<Portefeuille> {
    const params = new HttpParams().set('somme', somme.toString());
    return this.http.post<Portefeuille>(`${this.baseUrl}/deposer`, portefeuille, { params });
  }

  retirer(portefeuille: Portefeuille, somme: number): Observable<Portefeuille> {
    const params = new HttpParams().set('somme', somme.toString());
    return this.http.post<Portefeuille>(`${this.baseUrl}/retirer`, portefeuille, { params });
  }

  getCartes(id: number): Observable<CarteVirtuelle[]> {
    return this.http.get<CarteVirtuelle[]>(`${this.baseUrl}/${id}/cartes`);
  }

  convertir(devise: string, portefeuille: Portefeuille): Observable<Portefeuille> {
    const params = new HttpParams().set('target', devise);
    return this.http.post<Portefeuille>(`${this.baseUrl}/convertir`, portefeuille, { params });
  }

  update(updatePortefeuille: UpdatePortefeuille): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/update`, updatePortefeuille);
  }

  updateFacture(updateFacture: UpdateFacture): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/updateFacture`, updateFacture);
  }

  ajoutCompte(updateFacture: UpdateFacture): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/ajoutCompte`, updateFacture);
  }

  test(): Observable<string> {
    return this.http.get<string>(`${this.baseUrl}/test`);
  }
  getTaux(base: string, target: string): Observable<number> {
   return this.http.post<number>(`${this.baseUrl}/getTaux`, {base, target});
  }
}
