import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CryptoWallet } from '../model/CryptoWallet.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CryptoWalletServiceService {

  private baseUrl = 'http://localhost:8043/gestion_portefeuille/cryptoWallet';
  constructor(private http: HttpClient) {}

  genererCryptoWallet(CryptoWalletDTO: any){
      return this.http.post<CryptoWallet>(`${this.baseUrl}/generer`, CryptoWalletDTO);
  }

  acheterCryptoWallet(id: number, somme: number): Observable<CryptoWallet> {
    return this.http.post<CryptoWallet>(`${this.baseUrl}/acheter?id=${id}&somme=${somme}`,null);
  }

  vendreCryptoWallet(id: number, somme: number): Observable<CryptoWallet> {
    return this.http.post<CryptoWallet>(`${this.baseUrl}/vendre?id=${id}&somme=${somme}`,null);
  }

  getCryptoWallet(id: number): Observable<CryptoWallet> {
    return this.http.get<CryptoWallet>(`${this.baseUrl}/${id}`);
  }

  getWalletByUtilisateurId(id: number): Observable<CryptoWallet[]> {
    return this.http.get<CryptoWallet[]>(`${this.baseUrl}/utilisateur/${id}`);
  }
}
