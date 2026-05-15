import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private readonly BASE_URL = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  /* ✅ ADD STUDENT */
  addStudent(student: any): Observable<any> {
    return this.http.post(
      `${this.BASE_URL}/api/parent/students`,
      student,
      { headers: this.getAuthHeaders() }
    );
  }

 
 /* ✅ PARENT STUDENTS: search + sort + pagination */
  getMyStudents(
    page: number,
    size: number,
    searchText?: string,
    sortField: string = 'id',
    direction: 'asc' | 'desc' = 'asc'
  ): Observable<any> {

    const params: string[] = [
      `page=${page}`,
      `size=${size}`,
      `sort=${sortField},${direction}`
    ];

    if (searchText) {
      params.push(`q=${encodeURIComponent(searchText)}`);
    }

    return this.http.get<any>(
      `${this.BASE_URL}/api/parent/students?${params.join('&')}`,
      { headers: this.getAuthHeaders() }
    );
  }


  /* ✅ GET SINGLE STUDENT */
  getStudentById(childId: number): Observable<any> {
    return this.http.get<any>(
      `${this.BASE_URL}/api/parent/students/${childId}`,
      { headers: this.getAuthHeaders() }
    );
  }

  /* ✅ UPDATE STUDENT */
  updateChildFromParent(childId: number, student: any): Observable<any> {
    return this.http.post(
      `${this.BASE_URL}/api/parent/students/${childId}`,
      student,
      { headers: this.getAuthHeaders() }
    );
  }

  /* ✅ DELETE STUDENT */
  deleteChildFromParent(childId: number): Observable<any> {
    return this.http.delete(
      `${this.BASE_URL}/api/parent/students/${childId}/delete`,
      { headers: this.getAuthHeaders() }
    );
  }

  /* ✅ DOWNLOAD REPORT */
  downloadStudentReport(childId: number): Observable<Blob> {
    return this.http.get(
      `${this.BASE_URL}/api/parent/students/${childId}/report`,
      {
        headers: this.getAuthHeaders(),
        responseType: 'blob'
      }
    );
  }

  // /* ✅ ADVANCED SEARCH + PAGINATION + SORT */
  // searchStudents(
  //   criteria: any,
  //   page: number,
  //   size: number,
  //   sort: string,
  //   direction: string
  // ): Observable<any> {
  //   return this.http.post<any>(
  //     `${this.BASE_URL}/api/students/advanceSearch?page=${page}&size=${size}&sort=${sort},${direction}`,
  //     criteria,
  //     { headers: this.getAuthHeaders() }
  //   );
  // }

}