import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExpiredProgramsService {
  constructor(private http: HttpClient) {}

  getExpiredPrograms(): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `${localStorage.getItem('token')}`
    );
    return this.http.get(
      `http://localhost/extensionManagementRestAPI/controllers/users/show_expired_programs.php`,
      {
        headers,
      }
    );
  }
}
