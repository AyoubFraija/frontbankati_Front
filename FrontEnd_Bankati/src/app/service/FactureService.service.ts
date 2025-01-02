import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Facture } from '../model/Facture.model';




@Injectable({
    providedIn: 'root',
})
export class FactureService {
    private baseUrl = 'http://localhost:8085/api/factures'; // Adjust the URL to match your backend endpoint

    constructor(private http: HttpClient) { }

    // Create a new facture
    creerFacture(facture: Facture): Observable<Facture> {
        return this.http.post<Facture>(this.baseUrl, facture);
    }

    // Get a facture by ID
    recupererFacture(id: number): Observable<Facture> {
        return this.http.get<Facture>(`${this.baseUrl}/${id}`);
    }
    // Get a facture by ID
    recupererFactures(): Observable<Facture[]> {
        return this.http.get<Facture[]>(`${this.baseUrl}`);
    }

    // Update an existing facture
    mettreAJourFacture(id: number, factureDetails: Facture): Observable<Facture> {
        return this.http.put<Facture>(`${this.baseUrl}/${id}`, factureDetails);
    }

    // Delete a facture
    supprimerFacture(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }

    // Mark a facture as paid
    marquerFacturePayee(id: number): Observable<Facture> {
        return this.http.put<Facture>(`${this.baseUrl}/${id}/payee`, null);
    }
}
