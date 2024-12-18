import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';  // Importar HttpClientModule
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-event-creator',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './event-creator.component.html',
  styleUrl: './event-creator.component.css'
})

export class EventCreatorComponent {
  @Output() eventCreated = new EventEmitter<void>();  // Emitir evento cuando se crea un nuevo evento
  @Output() close = new EventEmitter<void>();


  constructor(private http: HttpClient, private authService: AuthService, private router: Router){}


  onSubmit(form: NgForm) {
    if (form.valid) {
      const eventData = {
        name: form.value.eventName,
        description: form.value.eventDescription,
        date: form.value.eventDate,  
        maxAttendees: form.value.maxAttendees,
        ticketPrice: form.value.ticketPrice
      };
      console.log(eventData)
      const userId = this.authService.getUserIdFromToken();
      const headers = this.authService.generateAuthHeaders();  // Obtener el token JWT completo
      
      if (userId && headers) {

        this.http.post(`http://localhost:8080/events/create`, eventData, { headers })
          .subscribe({
            next: (response) => {
              console.log('Evento creado exitosamente', response);
              this.eventCreated.emit();  // Emitir evento cuando se cree el evento
              this.closeEventCreator();  // Cerrar el creador de eventos
            // Redirigir a la página pública del evento
            const username = this.authService.getUsernameFromToken();
            this.router.navigate(['/public/event', username, (response as any).id]);
          },
            error: (error) => {
              console.error('Error al crear el evento:', error);
              if (error instanceof HttpErrorResponse) {
                console.error('Status:', error.status);
                console.error('Message:', error.message);
              }
            }
          });
      } else {
        console.error('No se pudo obtener el userId del JWT o el token no está presente');
      }
    } else {
      console.error('El formulario no es válido');
    }
  }
   
  closeEventCreator() {
    this.close.emit();  // Emitir el evento para cerrar el componente
  }
  
}
