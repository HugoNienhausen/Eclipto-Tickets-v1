import { Component, Output, EventEmitter } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar-menu',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.css']
})
export class SidebarMenuComponent {
  @Output() sidebarToggled = new EventEmitter<boolean>();
  isCollapsed = false;
  
  menuItems = [
    {
      nombre: 'Dashboard',
      ruta: '/user/panel',
      icono: 'bi bi-speedometer2'
    },
    {
      nombre: 'Eventos',
      ruta: '/user/eventos',
      icono: 'bi bi-calendar-event'
    },
    {
      nombre: 'Clientes',
      ruta: '/user/clientes',
      icono: 'bi bi-people'
    },
    {
      nombre: 'Monitoreo',
      ruta: '/user/monitoreo',
      icono: 'bi bi-graph-up'
    },
    {
      nombre: 'Ajustes',
      ruta: '/user/ajustes',
      icono: 'bi bi-gear'
    }
  ];

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    this.sidebarToggled.emit(this.isCollapsed);
  }
}