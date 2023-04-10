import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class ProgramListService {
  constructor(private http: HttpClient) {}

  getPrograms(): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `${localStorage.getItem('token')}`
    );
    return this.http.get(
      `http://localhost/ev1/controllers/users/show_assigned_programs.php`,
      {
        headers,
      }
    );
  }
}
