import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-profile',
  standalone: true,
  templateUrl: './admin-profile.html',
  styleUrl: './admin-profile.css',
  imports: [FormsModule, CommonModule],
})
export class AdminProfile implements OnInit {

  name = '';
  email = '';
  id: number = 0;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {

    const storedId = localStorage.getItem('userId');
    console.log('Stored ID:', storedId);

    if (!storedId) {
      alert('Session expired. Please login again.');
      this.router.navigate(['/login']);   // ✅ redirect
      return;
    }

    this.id = Number(storedId);

    // ✅ Prefill values
    this.name = localStorage.getItem('name') || '';
    this.email = localStorage.getItem('email') || '';
  }

  updateProfile() {

    const confirmUpdate = confirm('Are you sure you want to update profile?');

    if (!confirmUpdate) return;

    const payload = {
      adminName: this.name,
      adminEmail: this.email,
    };

    this.authService.updateAdmin(this.id, payload)
      .subscribe({
        next: () => {

          alert('Admin Profile Updated ✅');

          // ✅ update UI instantly
          localStorage.setItem('name', this.name);
          localStorage.setItem('email', this.email);

          this.router.navigate(['/admin/dashboard']);
        },
        error: (err) => {
          console.error(err);
          alert('Update failed ❌');
        }
      });
  }

  cancel() {
    this.router.navigate(['/admin/dashboard']);  // ✅ back
  }
}