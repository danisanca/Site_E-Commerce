import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from '../../interfaces/login';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
   private baseApiUrl = environment.apiUrl;
   private apiUrl = `${this.baseApiUrl}/Login`;

   private isLoggedInSubject = new BehaviorSubject<boolean>(this.isAuthenticated()); 
   isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable(); 
 
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}`, { email, password }).pipe(
      tap((response) => {
        if (response.authenticated) {
          localStorage.setItem('token', response.acessToken);
          localStorage.setItem('user', JSON.stringify(response));

          
          this.isLoggedInSubject.next(true);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    this.isLoggedInSubject.next(false);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
  isAuthenticated(): boolean {
    const userData = localStorage.getItem('user');

  if (!userData) return false;

  try {
    const user = JSON.parse(userData);
    const created = new Date(user.created);
    const expiration = new Date(user.expiration);
    const now = new Date();

    if (now >= created && now < expiration) {
      return true;
    } else {
      this.logout();
      return false;
    }
  } catch (e) {
    this.logout(); 
    return false;
  }
  }
}
