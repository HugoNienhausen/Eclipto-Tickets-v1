import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { TicketBuyComponent } from '../../../modules/user/components/ticket-buy/ticket-buy.component';
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
  openTicketBuy() {
    this.showTicketBuy = true;
  }
}
