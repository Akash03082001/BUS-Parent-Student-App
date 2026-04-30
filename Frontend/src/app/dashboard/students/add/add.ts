import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StudentService } from '../../../services/studentService';

@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add.html',
})
export class AddStudentComponent {

  student = {
    name: '',
    gender: '',
    dateOfBirth: ''
  };

  loading = false;
  errorMessage = '';

  constructor(
    private studentService: StudentService,
    private router: Router
  ) {}

  submit(): void {
    this.loading = true;
    this.errorMessage = '';

    this.studentService.addStudent(this.student).subscribe({
      next: () => {
        alert('Student added successfully ✅');
        this.router.navigate(['/dashboard/students']);
      },
      error: (err: any) => {
        this.errorMessage =
          err?.error?.message || 'Failed to add student';
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/dashboard']);
  }
}