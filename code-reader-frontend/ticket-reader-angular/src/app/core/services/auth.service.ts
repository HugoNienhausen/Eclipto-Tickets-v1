import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  // Obtener el token del localStorage
  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  // Obtener el userId desde el token JWT
  getUserIdFromToken(): number | null {
    try {
      const token = this.getToken();
      if (token) {
        const decodedToken: any = jwtDecode(token);
        return decodedToken.id;
      }
    } catch (error) {
      console.error('Error al acceder al token o decodificarlo:', error);
    }
    return null;
  }

  // Decodificar el JWT
  decodeToken(): any {
    const token = this.getToken();
    if (token) {
      return jwtDecode(token);
    }
    return null;
  }
  
  getUsernameFromToken(): string | null {
    try {
      const token = this.getToken();
      if (token) {
        const decodedToken: any = jwtDecode(token);
        return decodedToken.sub; // Asumiendo que el username está en el campo 'sub'
      }
    } catch (error) {
      console.error('Error al decodificar el token:', error);
    }
    return null;
  }

  // Validar si el token ha expirado
  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;
    
    const decoded: any = jwtDecode(token);
    const expirationTime = decoded.exp * 1000;
    return expirationTime < Date.now();
  }

  // Logout del usuario
  logout() {
    localStorage.removeItem('jwtToken');
    this.router.navigate(['/welcome']);
  }

  // Generar encabezados con el token JWT
  generateAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    if (token) {
      return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    }
    return new HttpHeaders();
  }
}