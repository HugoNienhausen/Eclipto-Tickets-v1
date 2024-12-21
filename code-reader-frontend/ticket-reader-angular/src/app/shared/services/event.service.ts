import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
export interface Event {
  id?: string;
  name: string;
  description: string;
  date: string;
  maxAttendees: number;
  ticketPrice: number;
  imageUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = `${environment.apiUrl}/events`;

  constructor(private http: HttpClient) {}

  // Crear un nuevo evento
  createEvent(formData: FormData): Observable<any> {
    const token = localStorage.getItem('jwtToken');
    
    if (!token) {
      throw new Error('No token available');
    }
  
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);
      // No establecer Content-Type, dejarlo automático para FormData
  
    console.log('Token:', token);
    console.log('Headers:', headers);
  
    return this.http.post(`${this.apiUrl}/create`, formData, { headers })
      .pipe(
        catchError(error => {
          console.error('Error creating event:', error);
          console.error('Response:', error.error);
          return throwError(() => error);
        })
      );
  }

  // Obtener todos los eventos
  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Obtener un evento específico
  getEvent(id: string): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Actualizar un evento
  updateEvent(id: string, formData: FormData): Observable<Event> {
    return this.http.put<Event>(`${this.apiUrl}/${id}`, formData).pipe(
      catchError(this.handleError)
    );
  }

  // Eliminar un evento
  deleteEvent(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Subir imagen del evento
  uploadEventImage(eventId: string, imageFile: File): Observable<string> {
    const formData = new FormData();
    formData.append('image', imageFile);

    return this.http.post<{imageUrl: string}>(
      `${this.apiUrl}/${eventId}/image`, 
      formData
    ).pipe(
      map(response => response.imageUrl),
      catchError(this.handleError)
    );
  }

  // Manejo de errores
  private handleError(error: any) {
    let errorMessage = 'Ha ocurrido un error en la operación';
    
    if (error.error instanceof ErrorEvent) {
      // Error del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del servidor
      errorMessage = `Código de error: ${error.status}\nMensaje: ${error.message}`;
    }
    
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}