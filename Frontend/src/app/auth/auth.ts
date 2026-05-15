import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient) {}

  /* ===========================
     AUTH APIs
     =========================== */

  private API_URL = 'http://localhost:8080/api/auth';

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.API_URL}/login`, { email, password });
  }

  adminLogin(email: string, password: string): Observable<any> {
    return this.http.post(`${this.API_URL}/admin/login`, { email, password });
  }

  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.API_URL}/register`, {
      name, email, password
    });
  }

  logout(): void {
    localStorage.clear();
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getName(): string {
    return localStorage.getItem('name') || '';
  }

  /* ===========================
     ADMIN DASHBOARD
     =========================== */

  private ADMIN_API = 'http://localhost:8080/api/admin';

  getTotalParents() {
    return this.http.get<number>(`${this.ADMIN_API}/count/parents`);
  }

  getTotalStudents() {
    return this.http.get<number>(`${this.ADMIN_API}/count/students`);
  }

  getGenderStats() {
    return this.http.get<any>(`${this.ADMIN_API}/count/students/gender`);
  }

  getParentsWithChildren() {
    return this.http.get<number>(
      `${this.ADMIN_API}/count/parent-with-children`
    );
  }

  updateAdmin(id: number, data: any) {
    return this.http.post(`${this.ADMIN_API}/update/${id}`, data);
  }

  /* ===========================
     STUDENT APIs
     =========================== */

  private STUDENT_API = 'http://localhost:8080/students';

  // ✅ SEARCH STUDENTS (UPDATED: supports parentId filter ✅)
  searchStudents(criteria: any, page: number, size: number) {
    return this.http.post<any>(
      `${this.ADMIN_API}/advanceSearch?page=${page}&size=${size}`,
      {
        name: criteria?.name || '',
        parentId: criteria?.parentId || null
      }
    );
  }

  // ✅ GET STUDENT (EDIT)
  getStudentById(id: number) {
    return this.http.get<any>(`${this.STUDENT_API}/${id}`);
  }

  // ✅ UPDATE STUDENT
  updateStudent(id: number, data: any) {
    return this.http.put(`${this.STUDENT_API}/${id}`, data);
  }

  /* ===========================
     PARENT APIs (ADMIN SIDE)
     =========================== */

  private PARENT_API = 'http://localhost:8080/api/admin/parents';

  // ✅ GET ALL PARENTS
  getParents(page: number, size: number) {
    return this.http.get<any>(
      `${this.PARENT_API}?page=${page}&size=${size}`
    );
  }

  // ✅ SEARCH PARENTS
  searchParents(criteria: any, page: number, size: number) {
    return this.http.post<any>(
      `${this.PARENT_API}/search?page=${page}&size=${size}`,
      criteria
    );
  }

  // ✅ GET PARENT BY ID (for edit)
  getParentById(id: number) {
    return this.http.get<any>(`${this.PARENT_API}/${id}`);
  }

  // ✅ UPDATE PARENT
  updateParent(id: number, data: any) {
    return this.http.put(`${this.PARENT_API}/${id}`, data);
  }

  // ✅ DELETE PARENT
  deleteParent(id: number) {
    return this.http.delete(`${this.PARENT_API}/${id}`);
  }

  /* ===========================
     CHILDREN UNDER A PARENT
     =========================== */

  // ✅ GET CHILDREN (REUSE student service)
  getChildren(parentId: number, searchText: string = '', page: number = 0, size: number = 5) {
    return this.http.get<any>(
      `${this.PARENT_API}/${parentId}/children?searchText=${searchText}&page=${page}&size=${size}`
    );
  }

  /* ===========================
     REPORT API
     =========================== */

  downloadStudentReport(criteria: any) {
    return this.http.post(
      `${this.STUDENT_API}/advanceSearch/report`,
      criteria,
      { responseType: 'blob' }
    );
  }

}
