import { Component } from '@angular/core';
import { Router,RouterModule } from '@angular/router';


@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css',
  standalone: true,
  imports:[RouterModule]
})
export class AdminLayout {

  adminName = localStorage.getItem('name');

  constructor(private router: Router) {}

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  editProfile() {
    this.router.navigate(['/admin/profile']);
  }

  
}