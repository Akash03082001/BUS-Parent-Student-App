import { Component , OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { StudentService } from '../../services/studentService';
import { ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './students.html',
  styleUrls:['./students.css']
})
export class StudentsComponent implements OnInit{

  // ✅ LOCAL ARRAY (NOT Observable)
  loading = true;
  students: any[] = [];
  criteria: any = {};

  
  // ✅ Pagination state
  page = 0;
  size = 3;
  totalPages = 0;

  sortField = 'id';
  sortDirection: 'asc' | 'desc' = 'asc';


  constructor(
    private studentService: StudentService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
     this.loadStudents();
  }


  loadStudents(): void {
    this.loading = true;

    this.studentService.getMyStudents(
      this.page,
      this.size,
      this.criteria.name,
      this.sortField,
      this.sortDirection
    ).subscribe({
      next: (res) => {
        this.students = res.content;
        this.totalPages = res.totalPages;
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


  
// ✅ Pagination actions
  nextPage(): void {
    if (this.page < this.totalPages - 1) {
      this.page++;
      this.loadStudents();
    }
  }

  prevPage(): void {
    if (this.page > 0) {
      this.page--;
      this.loadStudents();
    }
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
        alert('Delete failed ❌, Contact your Admin 👤');
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
      alert('Failed to download report, Contact Admin 👤');
    }
  });
}

sortBy(field: string): void {
  if (this.sortField === field) {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  } else {
    this.sortField = field;
    this.sortDirection = 'asc';
  }
  this.page = 0;
  this.loadStudents();
}


}
