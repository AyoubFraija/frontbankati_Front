import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TransactionCrypto } from '../model/Transaction_Crypto.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionCryptoServiceService {

  private baseUrl = 'http://localhost:8043/gestion_portefeuille/cryptoWallet';
    constructor(private http: HttpClient) {}
  
    genererTransaction(transaction: TransactionCrypto): Observable<TransactionCrypto> {
      return this.http.post<TransactionCrypto>(`${this.baseUrl}/generer`, transaction);
    }
  
    achatTransaction(walletId: number): Observable<TransactionCrypto[]> {
      return this.http.get<TransactionCrypto[]>(`${this.baseUrl}/achat/${walletId}`);
    }
  
    venteTransaction(walletId: number): Observable<TransactionCrypto[]> {
      return this.http.get<TransactionCrypto[]>(`${this.baseUrl}/vente/${walletId}`);
    }
  
    transfertTransaction(walletId: number): Observable<TransactionCrypto[]> {
      return this.http.get<TransactionCrypto[]>(`${this.baseUrl}/transfert/${walletId}`);
    }
}
