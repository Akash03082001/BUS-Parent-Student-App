import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-admin-students',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-students.html',
  styleUrl: './admin-students.css',
})
export class AdminStudents implements OnInit {

  students: any[] = [];
  searchName: string = '';

  page = 0;
  size = 5;
  totalPages = 0;

  loading = false;

  constructor(private authService: AuthService,
    private router : Router,
    private route : ActivatedRoute,
    private cdr : ChangeDetectorRef
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  
ngOnInit(): void {


const parentId = this.route.snapshot.queryParamMap.get('parentId');

  if (parentId) {
    this.searchByParent(parentId);
  } else {
    this.loadStudents();
  }


  // this.route.url.subscribe(() => {

  //   console.log("Route changed → reload students");

  //   this.resetState();
  //   this.loadStudents();
  // });

}


  loadStudents() {

    this.loading = true;

    const criteria = {
      name: this.searchName?.trim() || ''
    };

    console.log("Searching:", criteria);

    this.authService.searchStudents(criteria, this.page, this.size)
      .subscribe({
        next: (res) => {

          console.log("Result:", res);

          this.students = [...res.content];
          this.totalPages = res.totalPages || 0;

          this.loading = false;

          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error(err);
          this.students = [];
          this.loading = false;
          this.cdr.detectChanges();
        }
      });
  }

  search() {

   
 this.page = 0;

  const parentId = this.route.snapshot.queryParamMap.get('parentId');

  if (parentId) {
    this.searchByParent(parentId); //✅
  } else {
    this.loadStudents();
  }

  }

nextPage() {
  if (this.page < this.totalPages - 1) {
    this.page++;

    const parentId = this.route.snapshot.queryParamMap.get('parentId');

    if (parentId) {
      this.searchByParent(parentId);
    } else {
      this.loadStudents();
    }
  }
}

prevPage() {
  if (this.page > 0) {
    this.page--;

    const parentId = this.route.snapshot.queryParamMap.get('parentId');

    if (parentId) {
      this.searchByParent(parentId);
    } else {
      this.loadStudents();
    }
  }
}

  resetState() {
  this.students = [];
  this.totalPages = 0;
  this.page = 0;
}


  editStudent(student: any) {
    
const parentId = this.route.snapshot.queryParamMap.get('parentId');

  this.router.navigate(
    ['/admin/students/edit', student.id],
    {
      queryParams: { parentId: parentId } 
    }
  );

  }


  searchByParent(parentId: any) {

  this.loading = true;

  const criteria = {
    parentId: Number(parentId),
    name: this.searchName?.trim() || ''
  };

  this.authService.searchStudents(criteria, this.page, this.size)
    .subscribe({
      next: (res) => {

        console.log("Filtered by parent:", res);

        this.students = [...res.content];
        this.totalPages = res.totalPages || 0;

        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.students = [];
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
}



}