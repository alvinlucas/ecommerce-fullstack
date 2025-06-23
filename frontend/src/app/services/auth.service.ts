import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private url = 'http://localhost:3000/utilisateurs';

  constructor(private http: HttpClient) {}

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${this.url}/login`, { email, password }).pipe(
      tap((res) => {
        if (this.isBrowser()) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('userNom', res.nom);
        }
      })
    );
  }

  register(data: any) {
    return this.http.post(`${this.url}/register`, data);
  }

  getUserNom(): string | null {
    if (!this.isBrowser()) return null;
    return localStorage.getItem('userNom');
  }

  isLoggedIn(): boolean {
    if (!this.isBrowser()) return false;
    return !!localStorage.getItem('token');
  }

  logout() {
    if (this.isBrowser()) {
      localStorage.removeItem('token');
      localStorage.removeItem('userNom');
    }
  }
}
