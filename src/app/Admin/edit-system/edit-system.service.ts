import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EditSystemService {
  private getAdmin = `http://localhost/extensionManagementRestAPI/controllers/admin/show_admin_profile.php`;

  constructor(private http: HttpClient) {}

  getAdminInfo(): Observable<any> {
    const headers = new Headers().set(
      'Authorization',
      `${localStorage.getItem('token')}`
    );
    return this.http.get<{
      fullName: string;
      email: string;
      position: string;
      profilePicture: string;
    }>(this.getAdmin, {});
  }

  submit(data: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `${localStorage.getItem('token')}`,
    });
    return this.http.post(
      `http://localhost/extensionManagementRestAPI/controllers/admin/edit_admin_profile.php`,
      data,
      { headers }
    );
  }
}
