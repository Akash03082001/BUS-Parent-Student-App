import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class ProfileComponent implements OnInit {

  profile = {
    id: null as number | null,
    name: '',
    email: '',
    status: ''
  };

  originalProfile: any = null;

  loading = true;
  isEdit = false;
  errorMessage = '';

  private readonly API_URL = 'http://localhost:8080/api/parent/profile';

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef   // ✅ IMPORTANT
  ) {}

  ngOnInit(): void {
    this.fetchProfile();
  }

  fetchProfile(): void {
    this.loading = true;

    const token = localStorage.getItem('token');
    if (!token) {
      this.errorMessage = 'No token found';
      this.loading = false;
      return;
    }

    this.http.get<any>(this.API_URL, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).subscribe({
      next: (data) => {
        this.profile = data;
        this.originalProfile = { ...data };
        this.loading = false;

        // ✅ FORCE RE-RENDER AFTER ASYNC UPDATE
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Failed to load profile';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  edit(): void {
    this.isEdit = true;
    this.cdr.detectChanges();
  }

  save(): void {
    const token = localStorage.getItem('token');

    this.http.put<any>(
      this.API_URL,
      {
        name: this.profile.name,
        email: this.profile.email
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    ).subscribe({
      next: (updated) => {
        this.profile = updated;
        this.originalProfile = { ...updated };
        this.isEdit = false;
        localStorage.setItem('name', updated.name);
        this.cdr.detectChanges();
      }
    });
  }

  cancel(): void {
    this.profile = { ...this.originalProfile };
    this.isEdit = false;
    this.cdr.detectChanges();
  }
}