import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {

  email = '';
  password = '';
  errorMessage = '';

  private errorTimer: any = null;
  private errorActive = false; // ✅ prevents re-trigger

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  
login(form:any): void {
  console.log('Login clicked');
  console.log('Email:', this.email);
  console.log('Password:', this.password);

  this.authService.login(this.email, this.password).subscribe({
    next: (res) => {
      console.log('Login response from backend:', res);

      localStorage.setItem('token', res.token);
      localStorage.setItem('email', res.email);
      localStorage.setItem('name', res.name);

      this.router.navigate(['/dashboard']);
    },
    error: (err) => {
      console.error('Login error:', err);
      
    if (!this.errorActive) {
          this.showTimedError('Invalid email or password');
        }

    }
  });
}

 
// ✅ show error for few seconds
  private showTimedError(message: string): void {
    this.errorActive = true;
    this.errorMessage = message;

    if (this.errorTimer) {
      clearTimeout(this.errorTimer);
    }

    this.errorTimer = setTimeout(() => {
      this.clearError();
    }, 3000); // ⬅️ disappears after 3 seconds
  }

  
// ✅ reset error state
  private clearError(): void {
    this.errorMessage = '';
    this.errorActive = false;
    this.errorTimer = null;
  }
}

