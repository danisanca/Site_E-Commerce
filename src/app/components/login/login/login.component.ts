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
  username:string = '';
  password:string = '';
  
  constructor(private authService: AuthService, private router: Router) {}
  
  onLogin() {
    if (this.authService.login(this.username, this.password)) {
      this.router.navigate(['/']);
    } else {
      alert('Usuário ou senha inválidos!');
    }
  }
}
