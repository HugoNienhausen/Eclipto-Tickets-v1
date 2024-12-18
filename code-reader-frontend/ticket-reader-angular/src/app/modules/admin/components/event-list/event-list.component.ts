import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/services/auth.service';

interface Event {
  id: number;
  name: string;
  description: string;
  date: string;
  maxAttendees: number;
  ticketPrice: number;
  user: {
    id: number;
  };
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
    window.open(`/public/event/${event.user.id}/${event.id}`, '_blank');
  }
}