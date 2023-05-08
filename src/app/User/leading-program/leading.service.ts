import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LeadingService {
  constructor(private http: HttpClient) {}

  getPrograms(): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `${localStorage.getItem('token')}`
    );
    return this.http.get(
      `http://localhost/extensionManagementRestAPI/controllers/users/show_assigned_lead.php`,
      {
        headers,
      }
    );
  }
}
