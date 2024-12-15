import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GeneralEventListComponent } from '../general-event-list/general-event-list.component';
import { AuthService } from '../../../../core/services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-panel',
  standalone: true,
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css'],
  imports: [GeneralEventListComponent, CommonModule],
})
export class UserPanelComponent {
  username: string = '';
  events: any[] = [];

  constructor(
    private router: Router,
    private authService: AuthService, 
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) {
    this.loadUserDataFromToken();
  }

  ngOnInit() {
    // Cargar los eventos al inicializar el componente
    this.loadUserDataFromToken()
  }

  private loadUserDataFromToken() {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      this.username = decodedToken.firstname || 'Usuario';
    }
  }

  @ViewChild(GeneralEventListComponent) eventList!: GeneralEventListComponent;
}