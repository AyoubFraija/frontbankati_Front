import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaiementReccurent } from '../model/PaiementRecurrent.model';

@Injectable({
  providedIn: 'root'
})
export class PaiementReccurentService {

  private baseUrl = 'http://localhost:8080/api/paiements-recurrents';  // Replace with your backend URL

  constructor(private http: HttpClient) { }

  // Plan a recurring payment
  planifierPaiement(paiementReccurent: PaiementReccurent): Observable<PaiementReccurent> {
    return this.http.post<PaiementReccurent>(`${this.baseUrl}`, paiementReccurent);
  }

  // Cancel a recurring payment
  annulerPaiement(id: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}/annuler`, {});
  }
}
