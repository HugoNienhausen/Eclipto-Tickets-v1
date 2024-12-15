import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css'
})
export class EventListComponent implements OnInit {
  @Input() events: any[] = [];  // Lista para almacenar eventos

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadEvents();  // Cargar eventos al inicializar
  }

  // Función para cargar eventos desde el backend
  loadEvents(): void {
    const userId = this.authService.getUserIdFromToken();
    const headers = this.authService.generateAuthHeaders();

    if (userId && headers) {
      this.http.get<any[]>(`http://localhost:8080/events/user/${userId}`, { headers })
        .subscribe({
          next: (data) => {
            console.log('Eventos recibidos:', data);
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
  
}
