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

  private isLoggedInSubject: BehaviorSubject<boolean>;
  isLoggedIn$: Observable<boolean>;

  constructor(private http: HttpClient) {
    //-
    this.isLoggedInSubject = new BehaviorSubject<boolean>(false); // inicializa antes
    this.isLoggedIn$ = this.isLoggedInSubject.asObservable();
    
    const isLogged = this.isAuthenticated();
    this.isLoggedInSubject.next(isLogged);
    
  }

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

    this.isLoggedInSubject.next(false); // agora com certeza já está instanciado
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
