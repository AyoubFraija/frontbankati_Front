import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Compte } from './PaiementEnLigneService.service';

@Injectable({
  providedIn: 'root'
})
export class CompteService {

  private baseUrl = 'http://localhost:8080/api/comptes';  // Change this to your backend API URL

  constructor(private http: HttpClient) { }

  // Create a new account
  creerCompte(compte: Compte): Observable<Compte> {
    return this.http.post<Compte>(`${this.baseUrl}`, compte);
  }

  // Get account by ID
  recupererCompte(id: number): Observable<Compte> {
    return this.http.get<Compte>(`${this.baseUrl}/${id}`);
  }

  // Update an existing account
  mettreAJourCompte(id: number, compteDetails: Compte): Observable<Compte> {
    return this.http.put<Compte>(`${this.baseUrl}/${id}`, compteDetails);
  }

  // Delete an account
  supprimerCompte(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
