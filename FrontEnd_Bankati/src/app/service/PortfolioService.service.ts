import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PortfolioService {
    private baseUrl = 'http://localhost:8080/api/portfolio';  // Adjust to your backend URL

    constructor(private http: HttpClient) { }

    // Method to test remote call
    testRemoteCall(): Observable<string> {
        return this.http.get<string>(`${this.baseUrl}/test`);
    }
}
