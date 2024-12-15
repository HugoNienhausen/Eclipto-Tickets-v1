import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [LoginComponent, RegisterComponent, CommonModule],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
  showLoginForm: boolean = false;
  showRegisterForm: boolean = false;

  toggleForms(form: 'login' | 'register') {
    if (form === 'login') {
      this.showLoginForm = true;
      this.showRegisterForm = false;
    } else {
      this.showLoginForm = false;
      this.showRegisterForm = true;
    }
  }

  onLoginSuccess() {
    console.log("Login realizado correctamente");
  }

  onRegisterSuccess() {
    console.log("Registro realizado correctamente");
    this.toggleForms('login');  // Cambiar a la vista de login tras registro exitoso
  }
}