import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

    private readonly API_URL = 'http://localhost:8080/api/auth';
    constructor(private http: HttpClient) {}

    
// ✅ REAL LOGIN (calls backend)
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/login`, {
      email,
      password
    });
  }

  
 // ✅ REGISTER (NEW)
  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/register`, {
      name,
      email,
      password
    });
  }


  // ✅ Logout
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('name');
  }

  // ✅ AuthGuard uses this
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // ✅ Used by dashboard
  getName(): string {
    return localStorage.getItem('name') || '';
  }
  
}
