import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StudentService } from '../../../services/studentService';
import { OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit.html',
  styleUrl: './edit.css',
})
export class EditComponent implements OnInit {

  studentId!: number;

  student = {
    name: '',
    gender: '',
    dateOfBirth: ''
  };

  loading = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentService,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.studentId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadStudent();
  }

  /* ✅ Load student */
  loadStudent(): void {
    this.studentService.getStudentById(this.studentId).subscribe({
      next: (res) => {
        this.student.name = res.name;
       
// ✅ Normalise gender casing
      this.student.gender =
        res.gender === 'MALE' ? 'Male' :
        res.gender === 'FEMALE' ? 'Female' :
        res.gender;

        this.student.dateOfBirth = res.dateOfBirth;
        
  // ✅ FORCE DOM update
        this.cdr.detectChanges();

        this.errorMessage = '';
      },
      error: () => {
        this.errorMessage = 'Failed to load student details';
      }
    });
  }

  /* ✅ UPDATE */
  update(): void {
    this.loading = true;
    this.errorMessage = '';

    const payload = {
      name: this.student.name,
      gender: this.student.gender,
      dateOfBirth: this.student.dateOfBirth
    };

    this.studentService
      .updateChildFromParent(this.studentId, payload)
      .subscribe({
        next: () => {
          this.loading = false;
          alert('Student updated successfully ✅');
          this.router.navigate(['/dashboard/students']);
        },
        error: (err) => {
          this.errorMessage =
            err?.error?.message || 'Failed to update student';
          this.loading = false;
        }
      });
  }

  confirmUpdate(): void {
    if (confirm('Are you sure you want to update this child’s details?')) {
      this.update();
    }
  }


  cancel(): void {
    this.router.navigate(['/dashboard/students']);
  }


  /* ✅ Date helpers */
  
private toBackendDate(date: string): string {
  if (!date) return '';
  const [year, month, day] = date.split('-');
  return `${day}-${month}-${year}`;
}

private toInputDate(date: string): string {
  if (!date) return '';

  // If backend already sends yyyy-MM-dd, use as-is
  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return date;
  }

  // If backend sends dd-MM-yyyy, convert it
  const [day, month, year] = date.split('-');
  return `${year}-${month}-${day}`;
}


}