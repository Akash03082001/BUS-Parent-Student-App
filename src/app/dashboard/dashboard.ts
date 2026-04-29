import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth/auth';

@Component({
  selector: 'app-dashboard',
  standalone: true,                    // ✅ REQUIRED
  imports: [CommonModule, RouterModule], // ✅ REQUIRED for <router-outlet>
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})

export class Dashboard {

  name = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.name = this.authService.getName();
  }

  goHome(): void {
    this.router.navigateByUrl('/dashboard/home', { replaceUrl: true });
  }

  goProfile(): void {
    this.router.navigateByUrl('/dashboard/profile', { replaceUrl: true });
  }

  goStudents(): void {
    this.router.navigateByUrl('/dashboard/students', { replaceUrl: true });
  }

  goAddStudent(): void {
    this.router.navigateByUrl('/dashboard/addStudent', { replaceUrl: true });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}

