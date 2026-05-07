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
    private cdr: ChangeDetectorRef   // ✅ REQUIRED
  ) {}

  ngOnInit(): void {
    this.fetchProfile();
  }

  fetchProfile(): void {
    this.loading = true;

    this.http.get<any>(this.API_URL).subscribe({
      next: (data) => {
        // ✅ Log by VALUE, not reference (important)
        console.log('PROFILE DATA RECEIVED (snapshot):', JSON.stringify(data));

        if (!data || data.id == null) {
          console.warn('Ignoring invalid profile response');
          this.loading = false;
          return;
        }

        // ✅ Assign state
        this.profile = { ...data };
        this.originalProfile = { ...data };
        this.loading = false;

        // ✅ FORCE UI UPDATE (THIS FIXES IT)
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('PROFILE API FAILED', err);
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
    this.http.put<any>(
      this.API_URL,
      {
        name: this.profile.name,
        email: this.profile.email
      }
    ).subscribe({
      next: (updated) => {
        console.log('PROFILE UPDATED', updated);

        this.profile = { ...updated };
        this.originalProfile = { ...updated };
        this.isEdit = false;

        // ✅ Update header name
        localStorage.setItem('name', updated.name);

        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('UPDATE FAILED', err);
      }
    });
  }

  cancel(): void {
    this.profile = { ...this.originalProfile };
    this.isEdit = false;
    this.cdr.detectChanges();
  }
}
