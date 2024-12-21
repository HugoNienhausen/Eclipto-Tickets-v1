import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventCreatorComponent } from '../../../admin/components/event-creator/event-creator.component';
import { EventListComponent } from '../../../admin/components/event-list/event-list.component';
import { RouterModule } from '@angular/router';
import { UpperMenuComponent } from '../../../../shared/upper-menu/upper-menu/upper-menu.component';
import { SidebarMenuComponent } from '../../../../shared/sidemenu/sidebar-menu/sidebar-menu.component';
import { filter } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-user-panel',
  standalone: true,
  imports: [CommonModule,EventCreatorComponent, EventListComponent, RouterModule, UpperMenuComponent, SidebarMenuComponent],
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})
export class UserPanelComponent {
  showEventCreator: boolean = false;
  isSidebarCollapsed: boolean = false;
  @ViewChild(EventListComponent) eventList!: EventListComponent;

  

  ngOnInit() {
    // Forzar una recarga inicial

  }

  createEvent() {
    this.showEventCreator = true;
  }
  
  hideEventCreator() {
    this.showEventCreator = false;
  }

  onEventCreated() {
    this.hideEventCreator();
    setTimeout(() => {
      if (this.eventList) {
        this.eventList.loadEvents();
      }
    }, 100);
  }

  onSidebarToggle(collapsed: boolean) {
    this.isSidebarCollapsed = collapsed;
  }
}