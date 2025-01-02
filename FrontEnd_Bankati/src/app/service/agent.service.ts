import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Agent} from "../model/agent.model";


@Injectable({
  providedIn: 'root'
})
export class AgentService {
  private apiUrl = 'http://localhost:8080/api/agents';
  private agentsSubject = new BehaviorSubject<Agent[]>([]);
  public agents$ = this.agentsSubject.asObservable();

  constructor(private http: HttpClient) {
  }
  loadAgents() {
    this.http.get<Agent[]>('url-to-get-agents').subscribe({
      next: (agents) => {
        this.agentsSubject.next(agents);  // Met à jour le tableau des agents
      },
      error: (err) => {
        console.error('Erreur lors du chargement des agents', err);
      }
    });
  }

  createAgent(
    lastname: string,
    firstname: string,
    email: string,
    emailConfirmation: string,
    numCin: string,
    address: string,
    phonenumber: string,
    description: string,
    cinRecto: File,
    cinVerso: File,
    birthdate: string,
    numLicence: number,
    numRegCom: number
  ): Observable<any> {
    const formData = new FormData();

    // Ajout des champs textuels
    formData.append('lastname', lastname);
    formData.append('firstname', firstname);
    formData.append('email', email);
    formData.append('emailConfirmation', emailConfirmation);
    formData.append('numCin', numCin);
    formData.append('address', address);
    formData.append('phonenumber', phonenumber);
    formData.append('description', description);
    formData.append('birthdate', birthdate);
    formData.append('numLicence', numLicence.toString());
    formData.append('numRegCom', numRegCom.toString());

    // Ajout des fichiers
    formData.append('cinRecto', cinRecto);
    formData.append('cinVerso', cinVerso);
    // Récupérer le token JWT depuis le localStorage
    const token = localStorage.getItem('token');

    // Si un token est présent, on l'ajoute à l'en-tête Authorization
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post(`${this.apiUrl}/create`, formData, {headers});
  }

  getAgentById(id: number | undefined): Observable<Agent> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Agent>(`${this.apiUrl}/${id}`, { headers });
  }
  getAllAgents(): Observable<Agent[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Agent[]>(`${this.apiUrl}`, { headers });
  }

  // Mettre à jour un agent
  updateAgent(id: number, updatedAgent: Agent): Observable<Agent> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<Agent>(`${this.apiUrl}/update/${id}`, updatedAgent, { headers });
  }

  // Supprimer un agent
  deleteAgent(id: number | undefined): Observable<string> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<string>(`${this.apiUrl}/${id}`, { headers });
  }



}
