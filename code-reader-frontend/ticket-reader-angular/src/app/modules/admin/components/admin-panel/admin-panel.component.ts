import { Component, ViewChild } from '@angular/core';
import { NgIf } from '@angular/common';
import { EventCreatorComponent } from '../event-creator/event-creator.component';
import { EventListComponent } from '../event-list/event-list.component';
@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [NgIf,EventCreatorComponent, EventListComponent],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent {
  showEventCreator: boolean = false;

  // Método para mostrar el componente eventCreator
  createEvent() {
    this.showEventCreator = true;
  }
  hideEventCreator(){
    this.showEventCreator = false;
  }
  @ViewChild(EventListComponent) eventList!: EventListComponent;

  onEventCreated() {
    this.eventList.loadEvents();  // Llamar a la función para cargar los eventos
  }
}
