import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaiementFacture } from '../model/PaiementFacture.model';

@Injectable({
    providedIn: 'root'
})
export class PaiementFactureService {

    private baseUrl = 'http://localhost:8085/api/paiements';  // Change to your backend URL

    constructor(private http: HttpClient) { }

    // Process a payment
    traiterPaiement(paiementFacture: PaiementFacture): Observable<PaiementFacture> {
        // PaiementFacture paiementFacture = new PaiementFacture();

        return this.http.post<PaiementFacture>(`${this.baseUrl}`, paiementFacture);
    }

    // Recharge payment
    recharge(paiementFacture: PaiementFacture): Observable<void> {
        return this.http.post<void>(`${this.baseUrl}/recharge`, paiementFacture);
    }

    // Donation payment
    don(paiementFacture: PaiementFacture): Observable<void> {
        return this.http.post<void>(`${this.baseUrl}/don`, paiementFacture);
    }
}
