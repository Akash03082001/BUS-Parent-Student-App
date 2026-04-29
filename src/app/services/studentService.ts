import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private readonly API_URL =
    'http://localhost:8080/api/parent/students';

    
// ✅ Absolute APIs (edit / delete / view single)
  private readonly BASE_API =
    'http://localhost:8080';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  addStudent(student: {
    name: string;
    gender: string;
    dateOfBirth: string;
  }): Observable<any> {
    return this.http.post(
      this.API_URL,
      student,
      { headers: this.getAuthHeaders() }
    );
  }

  getMyStudents(): Observable<any[]> {
    return this.http.get<any[]>(
      this.API_URL,
      { headers: this.getAuthHeaders() }
    );
  }

/* ✅ GET SINGLE STUDENT (FOR EDIT PREFILL) */
 
getStudentById(childId: number): Observable<any> {
  return this.http.get<any>(
    `http://localhost:8080/api/parent/students/${childId}`,
    { headers: this.getAuthHeaders() }
  );
}


  /* ✅ UPDATE STUDENT (POST MAPPING – YOUR EXISTING API) */
  
updateChildFromParent(childId: number, student: any) {
  return this.http.post(
    `http://localhost:8080/api/parent/students/${childId}`,
    student,
    { headers: this.getAuthHeaders() }
  );
}


  //delete child
  
deleteChildFromParent(childId: number) {
  return this.http.delete(
    `http://localhost:8080/api/parent/students/${childId}/delete`,
    {
      
      headers: this.getAuthHeaders(),
      body: {}   // ✅ optional, but allowed

    },
  );
}



downloadStudentReport(childId: number) {
  return this.http.get(
    `http://localhost:8080/api/parent/students/${childId}/report`,
    {
      headers: this.getAuthHeaders(),
      responseType: 'blob'
    }
  );
}



}