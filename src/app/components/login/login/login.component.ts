import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email:string = '';
  password:string = '';
  
  constructor(private authService: AuthService, private router: Router) {}
  
  onLogin(): void {
    this.authService.login(this.email, this.password).subscribe({
      next: (res) => {
        console.log('Login bem-sucedido');
        console.log(res);
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Erro no login:', err);
      },
    });
  }
}
