import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private token: string | null | undefined;
  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token');
    console.log(this.token);
  }
  login(data: LoginData): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `${this.token}`);
    return this.http.post(
      `http://localhost/extensionManagementRestAPI/controllers/admin/admin-login.php`,
      data,
      { headers }
    );
  }
  ngOnInit() {
    console.log(this.token);
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  getToken(): string | null | undefined {
    return this.token;
  }

  removeToken() {
    this.token = undefined;
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    this.removeToken();
  }

  getAuthHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `${this.getToken()}`,
    });
    return headers;
  }
}

interface LoginData {
  username: string;
  password: string;
}
