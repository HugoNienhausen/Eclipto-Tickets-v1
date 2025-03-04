import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/services/auth.service';
import { environment } from '../../../../../environments/environment';
interface Event {
  id: number;
  name: string;
  description: string;
  date: string;
  maxAttendees: number;
  ticketPrice: number;
  userId: number;  // Cambiamos user.id por userId
  imageUrl: string;
}

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css'
})
export class EventListComponent implements OnInit {
  @Input() events: Event[] = [];

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    const userId = this.authService.getUserIdFromToken();
    const headers = this.authService.generateAuthHeaders();

    if (userId && headers) {
      this.http.get<Event[]>(`http://localhost:8080/events/user/${userId}`, { headers })
        .subscribe({
          next: (data) => {
            console.log('Eventos recibidos:', data);
            this.events = data;
          },
          error: (error) => {
            console.error('Error al obtener los eventos:', error);
          }
        });
    }
  }

  openPublicEvent(event: Event) {
    console.log('Evento:', event);  // Para debug
    const userId = this.authService.getUserIdFromToken();  // Usamos el ID del usuario actual
    if (userId) {
      window.open(`/public/event/${userId}/${event.id}`, '_blank');
    }
  }
  getImageUrl(event: Event): string {
    if (event.imageUrl) {
      return `${environment.apiUrl}${event.imageUrl}`;
    }
    return environment.defaultImageUrl;
  }
}