import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from '../model/Transaction.model';


@Injectable({
    providedIn: 'root'
})
export class TransactionService {
    private baseUrl = 'http://localhost:8080/api/transactions';  // Adjust to your backend URL

    constructor(private http: HttpClient) { }

    // Method to handle creating a transaction
    traiterTransaction(transaction: Transaction): Observable<Transaction> {
        return this.http.post<Transaction>(`${this.baseUrl}`, transaction);
    }

    // Method to validate a transaction (PUT request)
    validerTransaction(id: number): Observable<Transaction> {
        return this.http.put<Transaction>(`${this.baseUrl}/${id}/valider`, {});
    }
}
