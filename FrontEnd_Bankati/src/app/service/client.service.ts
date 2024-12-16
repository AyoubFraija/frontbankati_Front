import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = 'http://localhost:8080/api/clients';

  constructor(private http: HttpClient) { }

  createClient(
    lastname: string,
    firstname: string,
    email: string,
    emailConfirmation: string,
    phonenumber: string,
    cinRecto: File,
    cinVerso: File,
    accountType: string
  ): Observable<any> {
    const formData = new FormData();

    // Ajout des champs textuels
    formData.append('lastname', lastname);
    formData.append('firstname', firstname);
    formData.append('email', email);
    formData.append('emailConfirmation', emailConfirmation);
    formData.append('phonenumber', phonenumber);
    formData.append('accountType', accountType);

    // Ajout des fichiers
    formData.append('cinRecto', cinRecto);
    formData.append('cinVerso', cinVerso);
    // Récupérer le token JWT depuis le localStorage
    const token = localStorage.getItem('token');

    // Si un token est présent, on l'ajoute à l'en-tête Authorization
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post(`${this.apiUrl}/create`, formData,{ headers });
  }
}
