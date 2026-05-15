import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../auth/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-parents',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-parents.html',
  styleUrl: './admin-parents.css'
})
export class AdminParents implements OnInit {

  parents: any[] = [];

  searchName: string = '';

  page = 0;
  size = 5;
  totalPages = 0;

  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadParents();
  }

  loadParents() {
    this.loading = true;

    this.authService.getParents(this.page, this.size)
      .subscribe({
        next: (res) => {
          this.parents = [...res.content];
          this.totalPages = res.totalPages;

          this.loading = false;
          this.cdr.detectChanges();
        },
        error: () => {
          this.parents = [];
          this.loading = false;
          this.cdr.detectChanges();
        }
      });
  }

search() {
  this.page = 0;

  const criteria: any = {};

  if (this.searchName && this.searchName.trim() !== '') {
    criteria.name = this.searchName.trim();
  }

  this.loading = true;

  this.authService.searchParents(criteria, this.page, this.size)
    .subscribe({
      next: (res) => {
        this.parents = [...res.content];
        this.totalPages = res.totalPages;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Search Error:', err); // ✅ log error
        this.loading = false;
      }
    });
}
  nextPage() {
    if (this.page < this.totalPages - 1) {
      this.page++;
      this.loadParents();
    }
  }

  prevPage() {
    if (this.page > 0) {
      this.page--;
      this.loadParents();
    }
  }

  // ✅ EDIT PARENT
  editParent(parent: any) {
    this.router.navigate(['/admin/parents/edit', parent.id]);
  }

  // ✅ VIEW CHILDREN (REUSE STUDENT PAGE)
  viewChildren(parent: any) {
    this.router.navigate(['/admin/students'], {
      queryParams: { parentId: parent.id }
    });
  }





}