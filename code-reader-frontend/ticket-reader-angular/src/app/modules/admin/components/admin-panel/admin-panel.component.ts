import { Component, ViewChild } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EventCreatorComponent } from '../event-creator/event-creator.component';
import { EventListComponent } from '../event-list/event-list.component';
import { AdminSidebarComponent } from "../admin-sidebar/admin-sidebar.component";
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [NgIf, RouterLink, EventCreatorComponent, EventListComponent, AdminSidebarComponent, RouterModule],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent {
  showEventCreator: boolean = false;

  createEvent() {
    this.showEventCreator = true;
  }
  
  hideEventCreator(){
    this.showEventCreator = false;
  }
  
  @ViewChild(EventListComponent) eventList!: EventListComponent;

  onEventCreated() {
    this.eventList.loadEvents();
  }
}