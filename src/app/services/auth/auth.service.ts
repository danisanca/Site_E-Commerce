import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.checkUserLoggedIn());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  
  constructor(private router: Router) {}

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === '1234') {
      localStorage.setItem('user', JSON.stringify({ username }));
      this.isLoggedInSubject.next(true);
      return true;
    }
    this.isLoggedInSubject.next(false);
    return false;
  }

  logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/']);
    this.isLoggedInSubject.next(false);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('user') !== null;
  }
  private checkUserLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }
}
