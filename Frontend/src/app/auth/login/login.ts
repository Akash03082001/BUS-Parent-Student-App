import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  useType :'PARENT'| 'ADMIN' = 'PARENT';
  email = '';
  password = '';
  errorMessage = '';

  private errorTimer: any = null;
  
  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

setRole(role :'PARENT' | 'ADMIN'){
  this.useType = role;
}

login(): void {

  const loginCall = this.useType ==='ADMIN'
      ?this.authService.adminLogin(this.email,this.password)
      :this.authService.login(this.email,this.password);

  loginCall.subscribe({
    next: (res: {id:number, token: string; email: string; name: string; }) => {
      if (!res?.token) {
        this.showTimedError('Invalid email or password');
        return;
      }

      localStorage.setItem('token', res.token);
      localStorage.setItem('email', res.email);
      localStorage.setItem('name', res.name);
      localStorage.setItem('role',this.useType);
      localStorage.setItem('userId',String(res.id));

      if(this.useType === 'ADMIN')
        this.router.navigate(['/admin/dashboard'])
      else
        this.router.navigate(['/dashboard']);
    },
    error: () => {
      this.showTimedError('Invalid email or password');
    }
  });
}

private showTimedError(message: string): void {
  clearTimeout(this.errorTimer);

  this.errorMessage = message;
  this.cdr.detectChanges(); // ✅ force render immediately

  this.errorTimer = setTimeout(() => {
    this.errorMessage = '';
    this.cdr.detectChanges(); // ✅ force render after timeout
  }, 3000);
}


}

