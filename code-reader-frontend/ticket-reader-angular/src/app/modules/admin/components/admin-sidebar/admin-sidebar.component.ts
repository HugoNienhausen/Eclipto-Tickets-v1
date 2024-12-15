import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.css'
})
export class AdminSidebarComponent {
  isCollapsed = false;
  
  menuItems = [
    {
      nombre: 'Dashboard',
      ruta: '/admin/dashboard',
      icono: 'bi bi-speedometer2'
    },
    {
      nombre: 'Eventos',
      ruta: '/admin/eventos',
      icono: 'bi bi-calendar-event'
    },
    {
      nombre: 'Clientes',
      ruta: '/admin/clientes',
      icono: 'bi bi-people'
    },
    {
      nombre: 'Monitoreo',
      ruta: '/admin/monitoreo',
      icono: 'bi bi-graph-up'
    },
    {
      nombre: 'Ajustes',
      ruta: '/admin/ajustes',
      icono: 'bi bi-gear'
    }
  ];

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
}
