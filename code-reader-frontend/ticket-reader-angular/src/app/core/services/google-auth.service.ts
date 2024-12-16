import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SocialAuthService, GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {
  constructor(
    private socialAuthService: SocialAuthService,
    private http: HttpClient
  ) {}

  signInWithGoogle(): Observable<any> {
    return from(this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID));
  }

  sendTokenToBackend(token: string) {
    return this.http.post('http://localhost:8080/api/v1/auth/google-login', { token });
  }
}