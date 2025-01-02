import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Client} from "../model/client.model";


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
    numcin: string,
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
    formData.append('numcin', numcin);

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
  getAllClients(): Observable<Client[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Client[]>(`${this.apiUrl}`, { headers });
  }
  updateClient(id: number, updatedClient: Client): Observable<Client> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<Client>(`${this.apiUrl}/update/${id}`, updatedClient, { headers });
  }
  deleteClient(id: number | undefined): Observable<string> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<string>(`${this.apiUrl}/${id}`, { headers });
  }
}
