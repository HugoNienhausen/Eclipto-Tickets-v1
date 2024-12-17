import { Component, ViewChild } from '@angular/core';
import { NgIf } from '@angular/common';
import { EventCreatorComponent } from '../../../admin/components/event-creator/event-creator.component';
import { EventListComponent } from '../../../admin/components/event-list/event-list.component';
import { RouterModule } from '@angular/router';
import { UpperMenuComponent } from '../../../../shared/upper-menu/upper-menu/upper-menu.component';
import { SidebarMenuComponent } from '../../../../shared/sidemenu/sidebar-menu/sidebar-menu.component';
@Component({
  selector: 'app-user-panel',
  standalone: true,
  imports: [NgIf, EventCreatorComponent, EventListComponent,  RouterModule, UpperMenuComponent, SidebarMenuComponent],
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})
export class UserPanelComponent {
  showEventCreator: boolean = false;
  isSidebarCollapsed: boolean = false;

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
  onSidebarToggle(collapsed: boolean) {
    this.isSidebarCollapsed = collapsed;
  }
}