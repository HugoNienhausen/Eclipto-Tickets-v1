import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [NgIf, LoginComponent, RegisterComponent],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
  showLoginForm: boolean = false;
  showRegisterForm: boolean = false;

  constructor(private router: Router) {}

  showLogin() {
    this.showLoginForm = true;
    this.showRegisterForm = false;
  }

  showRegister() {
    this.showRegisterForm = true;
    this.showLoginForm = false;
  }

  onLoginSuccess() {
    // La navegación se maneja en el componente de login
  }

  onRegisterSuccess() {
    this.showRegisterForm = false;
    this.showLoginForm = true;
  }
}