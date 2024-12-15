import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  password: string = '';
  firstname: string = '';
  lastname: string = '';
  confirmPassword: string = '';
  email: string = '';
  isAdmin: boolean = false;
  registrationMessage: string = '';
  passwordMismatch: boolean = false;

  // Condiciones para la contraseña
  isLengthValid: boolean = false;
  hasUpperCase: boolean = false;
  hasSpecialChar: boolean = false;

  // Variable para controlar si el usuario ha interactuado con los campos de contraseña
  passwordTouched: boolean = false;

  specialCharsRegex = /[!@#$%^&*(),.?":{}|<>]/;
  upperCaseRegex = /[A-Z]/;
  
  @Output() registerSuccess = new EventEmitter<void>();  // Evento de éxito en el registro

  constructor(private http: HttpClient, private authService: AuthService) {}

  onRegister() {
    if (!this.passwordMismatch && this.password.length >= 8) {
      const userData = {
        firstname: this.firstname,
        lastname: this.lastname,
        password: this.password,
        email: this.email,
        isAdmin: this.isAdmin
      };

      this.http.post('http://localhost:8080/api/v1/auth/register', userData, { responseType: 'text' })
        .pipe(
          catchError(error => {
            this.registrationMessage = 'Error en el servidor';
            return throwError(error);
          })
        ).subscribe(response => {
          this.registrationMessage = response;
          this.registerSuccess.emit();  // Emitir evento en caso de registro exitoso
        });
    }
  }

  checkPasswords() {
    this.passwordMismatch = this.password !== this.confirmPassword;
    this.isLengthValid = this.password.length >= 8;
    this.hasUpperCase = this.upperCaseRegex.test(this.password);
    this.hasSpecialChar = this.specialCharsRegex.test(this.password);
  }

  onPasswordFieldFocused() {
    this.passwordTouched = true;
  }
}