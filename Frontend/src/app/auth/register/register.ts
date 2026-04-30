import { Component } from '@angular/core';
import { Router,RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth';

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
    private router: Router
  ) {}

  
register(): void {
    this.errorMessage = '';
    this.successMessage = '';
    this.isSubmitting = true;

    this.authService.register(this.name, this.email, this.password).subscribe({
      next: () => {
        this.isSubmitting=false;
        
      // ✅ ALERT MESSAGE
      alert('✅ Account created successfully! Please login.');

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500);
      },
      error: (err) => {
        console.error(err);
        this.isSubmitting = false;
        this.errorMessage = 'Email already registered';
      }
    });
  }


  
}
//For testing:
// register(form: any) {
//     if (form.invalid) {
//       // ✅ Do nothing here
//       // Field-level errors already guide the user
//       return;
//     }

//     alert('Registration successful ✅');
//   }