import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { AuthResponse } from '../types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);

  register(
    name: string,
    email: string,
    password: string
  ): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(environment.apiUrl + '/auth/register', {
      name,
      email,
      password,
    });
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(environment.apiUrl + '/auth/login', {
      email,
      password,
    });
  }
}
