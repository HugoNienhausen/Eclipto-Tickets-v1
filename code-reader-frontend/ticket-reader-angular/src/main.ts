import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';  // Usar provideHttpClient para standalone
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app/app.component';
import { routes } from './app/app/app.routes';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes),
              provideHttpClient(),
              { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
              JwtHelperService  // Agrega el cliente HTTP para standalone
  ]  
}).catch(err => console.error(err));