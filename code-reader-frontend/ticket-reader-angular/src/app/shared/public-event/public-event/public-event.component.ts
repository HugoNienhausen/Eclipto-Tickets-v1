import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-public-event',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './public-event.component.html',
  styleUrl: './public-event.component.css'
})
export class PublicEventComponent implements OnInit {
  event: any;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const email = params['email'];
      const eventId = params['eventId'];
      this.loadEventDetails(email, eventId);
    });
  }

  loadEventDetails(email: string, eventId: string) {
    this.http.get(`http://localhost:8080/events/public/${email}/${eventId}`)
      .subscribe({
        next: (event: any) => {
          this.event = event;
        },
        error: (error) => {
          console.error('Error loading event:', error);
        }
      });
  }
}
