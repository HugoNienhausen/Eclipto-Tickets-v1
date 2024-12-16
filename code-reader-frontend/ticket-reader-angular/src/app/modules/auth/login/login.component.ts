import { Component, EventEmitter, Output, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { NgIf } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { SocialAuthService, GoogleLoginProvider, SocialLoginModule } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf, FormsModule, SocialLoginModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginUsername: string = '';
  loginPassword: string = '';
  loginErrorMessage: string = '';
  
  @Output() loginSuccess = new EventEmitter<void>();

  constructor(
    private http: HttpClient, 
    private router: Router, 
    private authService: AuthService,
    private socialAuthService: SocialAuthService
  ) {
    console.log('LoginComponent constructor initialized');
    
    // Inicializar el servicio de Google
    this.socialAuthService.initState.subscribe({
      next: () => {
        console.log('Google Auth initialized successfully');
      },
      error: (err) => {
        console.error('Error initializing Google Auth:', err);
      },
      complete: () => {
        console.log('Google Auth initialization completed');
      }
    });

    this.socialAuthService.authState.subscribe({
      next: (user) => {
        console.log('Auth state changed:', user);
        if (user) {
          console.log('Google user authenticated:', user);
          this.handleGoogleLogin(user);
        }
      },
      error: (error) => {
        console.error('Error en autenticación de Google:', error);
        this.loginErrorMessage = 'Error en la autenticación con Google';
      }
    });
  }

  ngOnInit() {
    console.log('LoginComponent initialized');
    // Verificar que el servicio está disponible
    console.log('SocialAuthService:', this.socialAuthService);
    
    // Agregar el callback para Google
    (window as any).handleCredentialResponse = (response: any) => {
      console.log('Google response:', response);
      if (response.credential) {
        this.handleGoogleLogin({ idToken: response.credential });
      }
    };
  }

  // Login normal
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
        this.handleSuccessfulLogin(response);
      });
  }

  // Login con Google
  private handleGoogleLogin(googleUser: any) {
    console.log('Enviando token a backend:', googleUser.idToken);
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.http.post<any>(
      'http://localhost:8080/api/v1/auth/google-login',
      { token: googleUser.idToken },
      { headers: headers }
    ).pipe(
      catchError(error => {
        console.error('Error en backend:', error);
        this.loginErrorMessage = 'Error al procesar la autenticación con Google';
        return throwError(() => error);
      })
    ).subscribe({
      next: (response) => {
        console.log('Respuesta del backend:', response);
        this.handleSuccessfulLogin(response);
      },
      error: (error) => {
        console.error('Error en la respuesta:', error);
        this.loginErrorMessage = 'Error al procesar la respuesta del servidor';
      }
    });
  }

  // Método común para manejar el login exitoso
  private handleSuccessfulLogin(response: any) {
    if (response && response.token) {
      localStorage.setItem('jwtToken', response.token);
      const decodedToken: any = this.authService.decodeToken();
      const roles: string[] = decodedToken.roles;
      
      if (roles.includes('ROLE_ADMIN')) {
        this.router.navigate(['/admin/panel'], { 
          state: { username: decodedToken.sub } 
        });
      } else {
        this.router.navigate(['/user/panel'], { 
          state: { username: decodedToken.sub } 
        });
      }

      this.loginSuccess.emit();
      this.loginErrorMessage = '';
    }
  }
}