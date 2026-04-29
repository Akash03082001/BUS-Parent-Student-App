import { Component , OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { StudentService } from '../../services/studentService';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './students.html',
})
export class StudentsComponent implements OnInit{

  // ✅ LOCAL ARRAY (NOT Observable)
  loading = true;
  students: any[] = [];

  constructor(
    private studentService: StudentService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
     this.loadStudents();
  }

  loadStudents(): void {
    this.loading = true
    this.studentService.getMyStudents().subscribe({
      next: (res) => {
        console.log('Students loaded:', res); // ✅ debug
        this.students = res;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Students API error:', err);
        this.students = [];
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  goToAddStudent(): void {
    this.router.navigate(['/dashboard/addStudent']);
  }

  editChild(childId: number): void {
    this.router.navigate(['/dashboard/editStudent', childId]);
  }

  confirmDelete(childId: number, name: string): void {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) {
      return;
    }

    this.studentService.deleteChildFromParent(childId).subscribe({
      next: () => {
        alert('Child deleted successfully ✅');
        this.loadStudents(); // ✅ refresh UI
      },
      error: (err) => {
        alert('Delete failed ❌');
        console.error(err);
      }
    });
  }



downloadReport(childId: number): void {
  this.studentService.downloadStudentReport(childId).subscribe({
    next: (blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `student-report-${childId}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
    },
    error: () => {
      alert('Failed to download report');
    }
  });
}



}
