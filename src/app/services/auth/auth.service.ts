import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { AuthResponse } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);

  get isLoggedIn() {
    let token = localStorage.getItem('token');
    if (token) {
      return true;
    }
    return false;
  }

  get isAdmin(): boolean {
    const userData = localStorage.getItem('user');
    if (!userData) return false;

    try {
      const user = JSON.parse(userData);
      return user.isAdmin === true;
    } catch {
      return false;
    }
  }

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
