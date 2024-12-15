import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { NgIf } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';  // Utilizar el AuthService

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginUsername: string = '';
  loginPassword: string = '';
  loginErrorMessage: string = '';
  
  @Output() loginSuccess = new EventEmitter<void>();  // Evento de éxito en el login

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}

  onLogin() {
    const loginData = {
      email: this.loginUsername,
      password: this.loginPassword
    };

    this.http.post<any>('http://localhost:8080/api/v1/auth/authenticate', loginData)
      .pipe(
        catchError(error => {
          if (error.status === 401) {
            this.loginErrorMessage = error.error;
          } else {
            this.loginErrorMessage = 'Error en el servidor';
          }
          return throwError(error);
        })
      ).subscribe(response => {
        if (response && response.token) {
          localStorage.setItem('jwtToken', response.token);
          const decodedToken: any = this.authService.decodeToken();
          const roles: string[] = decodedToken.roles;
          
          if (roles.includes('ROLE_ADMIN')) {
            this.router.navigate(['/admin/panel'], { state: { username: decodedToken.sub } });
          } else {
            this.router.navigate(['/user/panel'], { state: { username: decodedToken.sub } });
          }

          this.loginSuccess.emit();  // Emitir evento en caso de login exitoso
        }
      });
  }
}