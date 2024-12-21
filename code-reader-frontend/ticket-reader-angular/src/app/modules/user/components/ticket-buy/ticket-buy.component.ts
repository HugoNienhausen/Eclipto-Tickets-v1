import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-ticket-buy',
  standalone: true,
  imports: [FormsModule, CommonModule, DatePipe],
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
  isSubmitting: boolean = false;

  constructor(private ticketService: TicketService) {}

  calculateTotal(): number {
    return this.ticketQuantity * this.event.ticketPrice;
  }

  onSubmit(form: NgForm) {
    if (form.valid && !this.isSubmitting) {
      this.isSubmitting = true;

      const ticketData = {
        eventId: this.event.id,
        buyerName: this.buyerName,
        buyerSurname: this.buyerSurname,
        ticketQuantity: this.ticketQuantity,
        buyerEmail: this.buyerEmail
      };

      this.ticketService.createTicket(ticketData).subscribe({
        next: (response) => {
          console.log('Ticket creado exitosamente:', response);
          this.close.emit();
        },
        error: (error) => {
          console.error('Error al crear el ticket:', error);
          this.isSubmitting = false;
        },
        complete: () => {
          this.isSubmitting = false;
        }
      });
    }
  }

  validateQuantity(): boolean {
    return this.ticketQuantity > 0 && 
           this.ticketQuantity <= this.event.availableSeats;
  }
}