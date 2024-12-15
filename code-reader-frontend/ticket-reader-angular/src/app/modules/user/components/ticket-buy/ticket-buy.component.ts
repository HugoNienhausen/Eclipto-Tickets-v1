import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TicketService } from '../../services/ticket.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-ticket-buy',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './ticket-buy.component.html',
  styleUrls: ['./ticket-buy.component.css']
})
export class TicketBuyComponent {
  @Input() event: any;
  @Output() close = new EventEmitter<void>();

  buyerName: string = '';
  buyerSurname: string = '';
  ticketQuantity: number = 1;
  buyerEmail: string = '';

  constructor(private ticketService: TicketService) {}

  completePurchase() {
    const ticketData = {
      eventId: this.event.id,
      buyerName: this.buyerName,
      buyerSurname: this.buyerSurname,
      ticketQuantity: this.ticketQuantity,
      buyerEmail: this.buyerEmail
    };

    this.ticketService.createTicket(ticketData).subscribe({
      next: (response) => {
        console.log('Ticket creado:', response);
        this.close.emit();
      },
      error: (err) => {
        console.error('Error al crear el ticket:', err);
      }
    });
  }
}