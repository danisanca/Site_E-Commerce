import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { JwtPayload, LoginResponse } from '../../interfaces/login';
import { tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import { CartService } from '../cart/cart.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseApiUrl = environment.mainApiUrl;
  private apiUrl = `${this.baseApiUrl}/Auth/Login`;
  private isLoggedInSubject: BehaviorSubject<boolean>;
  isLoggedIn$: Observable<boolean>;

  constructor(private http: HttpClient,private cartService:CartService) {
    //-
    this.isLoggedInSubject = new BehaviorSubject<boolean>(false); 
    this.isLoggedIn$ = this.isLoggedInSubject.asObservable();
    
    const isLogged = this.isAuthenticated();
    this.isLoggedInSubject.next(isLogged);
    
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}`, { email, password }).pipe(
      tap((response) => {
        if (response.isLogedIn) {
          localStorage.setItem('token', response.jwtToken);
          localStorage.setItem('refreshToken', response.refreshToken);

          this.isLoggedInSubject.next(true);
          this.cartService.refreshCart();
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');

    this.isLoggedInSubject.next(false); 
    this.cartService.refreshCart();
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const now = Date.now() / 1000; // em segundos
      if (decoded.exp && decoded.exp > now) {
        return true;
      } else {
        this.logout();
        return false;
      }
    } catch {
      this.logout();
      return false;
    }
  }
}
