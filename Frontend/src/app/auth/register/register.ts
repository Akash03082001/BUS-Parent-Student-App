import { Component } from '@angular/core';
import { Router,RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class RegisterComponent {

  
  name = '';
  email = '';
  password = '';
  errorMessage = '';
  successMessage = '';
  isSubmitting=false;


  showPassword = false;

  
  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  
constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  
register(form: NgForm): void {
  
if (form.invalid) {
    return; // ⛔ stop submission
  }

    this.errorMessage = '';
    this.successMessage = '';
    this.isSubmitting = true;

    this.authService.register(this.name, this.email, this.password).subscribe({
      next: () => {
        this.isSubmitting=false;
        this.errorMessage = '';
      // // ✅ ALERT MESSAGE
      // alert('✅ Account created successfully! Please login.');

      
 // ✅ SET MESSAGE INSTEAD OF ALERT
      this.successMessage = '✅ Account created successfully! Redirecting to login...';
      this.cdr.detectChanges();


        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500);
      },
      error: (err) => {
        console.error(err);
        this.isSubmitting = false;
       
 if (err.status === 409) {
        this.errorMessage = 'Email already registered';
      } else {
        this.errorMessage = 'Registration failed';
      }

      
 // ✅ FORCE UI UPDATE
  this.cdr.detectChanges();


      }
    });
  }
  
}
