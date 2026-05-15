import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth/auth';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-edit-student',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-edit-student.html',
  styleUrl: './admin-edit-student.css'
})
export class AdminEditStudent implements OnInit {

  id!: number;

  student: any = {
    name: '',
    age: 0,
    gender: '',
    dateOfBirth: ''
  };

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef   //✅ ADD HERE
  ) {}

  parentId: any;
  ngOnInit(): void {

    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.parentId = this.route.snapshot.queryParamMap.get('parentId');

    this.authService.getStudentById(this.id)
      .subscribe(res => {

        this.student = {
          ...res,
          dateOfBirth: res.dateOfBirth?.split('T')[0]
        };

        this.calculateAge();

        this.cdr.detectChanges(); //✅ FORCE UI UPDATE
      });
  }

  // ✅ Auto calculate age
  calculateAge() {

    if (!this.student.dateOfBirth) return;

    const dob = new Date(this.student.dateOfBirth);
    const today = new Date();

    let age = today.getFullYear() - dob.getFullYear();

    const monthDiff = today.getMonth() - dob.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }

    this.student.age = age;

    this.cdr.detectChanges(); //✅ ensure UI reflects
  }

  updateStudent() {

    const confirmUpdate = confirm("Are you sure to update?");
    if (!confirmUpdate) return;

    this.authService.updateStudent(this.id, this.student)
      .subscribe(() => {

        alert("Student updated successfully ✅");

        this.router.navigate(['/admin/students']);
      });
  }

  cancel() {
   
if (this.parentId) {
    this.router.navigate(['/admin/students'], {
      queryParams: { parentId: this.parentId } 
    });
  } else {
    this.router.navigate(['/admin/students']);
  }

  }
}