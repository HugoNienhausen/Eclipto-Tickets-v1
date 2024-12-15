import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { CommonModule } from '@angular/common';
import { TicketBuyComponent } from '../ticket-buy/ticket-buy.component';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-general-event-list',
  standalone: true,
  imports: [CommonModule, TicketBuyComponent],
  templateUrl: './general-event-list.component.html',
  styleUrl: './general-event-list.component.css'
})
export class GeneralEventListComponent implements OnInit{
    @Input() events: any[] = [];  // Lista para almacenar eventos
    selectedEvent: any | null = null; // Evento seleccionado para comprar

    constructor(private http: HttpClient, private authService: AuthService) {}
  
    ngOnInit(): void {
      this.loadEvents();  // Cargar eventos al inicializar
    }
  
    // Función para cargar eventos desde el backend
    loadEvents(): void {
      const userId = this.authService.getUserIdFromToken();
      const headers = this.authService.generateAuthHeaders();
  
      if (userId && headers) {
        this.http.get<any[]>(`http://localhost:8080/events/users`, { headers })
          .subscribe({
            next: (data) => {
  console.log('Eventos recibidos:', data);  // Añadir log para verificar los eventos recibidos
              this.events = data;  // Asignar eventos obtenidos
            },
            error: (error) => {
              console.error('Error al obtener los eventos:', error);
            }
          });
      } else {
        console.error('No se pudo obtener el userId del JWT o el token no está presente');
      }
    }

    // Método para abrir el componente ticketBuy
  openTicketBuy(event: any): void {
    this.selectedEvent = event; // Asignar el evento seleccionado
  }
  }
  
