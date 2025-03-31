import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { Response } from '../../interfaces/Response';
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from '../../interfaces/login';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
   private baseApiUrl = environment.apiUrl;
   private apiUrl = `${this.baseApiUrl}/Login`;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}`, { email, password }).pipe(
      tap((response) => {
        if (response.authenticated) {
          localStorage.setItem('token', response.acessToken);
          localStorage.setItem('user', JSON.stringify(response));
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
