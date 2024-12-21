import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app/app.component';
import { routes } from './app/app/app.routes';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { SocialAuthServiceConfig, GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(), // Necesario para las animaciones de Toastr
    provideToastr({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressBar: true,
      closeButton: true,
      tapToDismiss: true,
      newestOnTop: true,
      maxOpened: 5,
      autoDismiss: true,
      enableHtml: true,
      toastClass: 'ngx-toastr',
      titleClass: 'toast-title',
      messageClass: 'toast-message',
      easing: 'ease-in',
      easeTime: 300,
      resetTimeoutOnDuplicate: true
    }),
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '515490790930-eajv7nc5pn355hlg5tqree5p40jvc64v.apps.googleusercontent.com',
              {
                oneTapEnabled: false,
                scopes: 'email profile'
              }
            )
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig
    }
  ]
}).catch(err => console.error(err));