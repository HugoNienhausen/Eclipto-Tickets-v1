import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { TicketBuyComponent } from '../../../modules/user/components/ticket-buy/ticket-buy.component';
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'app-public-event',
  standalone: true,
  imports: [CommonModule, DatePipe, TicketBuyComponent],
  templateUrl: './public-event.component.html',
  styleUrl: './public-event.component.css'
})
export class PublicEventComponent implements OnInit {
  event: any;
  showTicketBuy: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const userId = params['userId'];
      const eventId = params['eventId'];
      this.loadEventDetails(userId, eventId);
    });
  }

  loadEventDetails(userId: number, eventId: string) {
    this.http.get(`http://localhost:8080/events/public/${userId}/${eventId}`)
      .subscribe({
        next: (event: any) => {
          this.event = event;
        },
        error: (error) => {
          console.error('Error loading event:', error);
        }
      });
  }
  getImageUrl(event: any): string {
    if (event?.imageUrl) {
      // Si la URL ya comienza con http o https, devolver la URL tal cual
      if (event.imageUrl.startsWith('http')) {
        return event.imageUrl;
      }
      // Si no, añadir la URL base de la API
      return `${environment.apiUrl}${event.imageUrl}`;
    }
    // URL de imagen por defecto si no hay imagen
    return 'assets/images/default-event.jpg';
  }
  openTicketBuy() {
    this.showTicketBuy = true;
  }
}
