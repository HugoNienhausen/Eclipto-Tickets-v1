import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private router: Router, private jwtHelper: JwtHelperService) {}

  canActivate(): boolean {
    const token = localStorage.getItem('jwtToken');
    
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      const roles = decodedToken.roles || [];  // Extraer los roles del token
      
      if (roles.includes('ROLE_ADMIN')) {
        return true;  // Si el rol USER está presente, permite el acceso
      } else {
        this.router.navigate(['/unauthorized']);  // Si no tiene el rol, redirige a página de no autorizado
        return false;
      }
    } else {
      this.router.navigate(['/welcome']);  // Si el token no es válido o ha expirado
      return false;
    }
  }
}