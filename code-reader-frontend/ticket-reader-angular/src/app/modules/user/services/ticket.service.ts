import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  
  private apiUrl = 'http://localhost:8080/public/tickets';

  constructor(private http: HttpClient, private authService: AuthService) { }
  
  createTicket(ticketData: any): Observable<any> {
    const userId = this.authService.getUserIdFromToken();
    let headers = this.authService.generateAuthHeaders();

    headers = headers.set('Content-Type', 'application/json');

  return this.http.post(`${this.apiUrl}/create`, ticketData, { headers });
  }
}