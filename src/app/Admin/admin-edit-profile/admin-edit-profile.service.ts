import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminEditProfileService {
  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute
  ) {}

  getUserInfo(id: string): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `${localStorage.getItem('token')}`
    );
    return this.http.get<{
      fullName: string;
      email: string;
      position: string;
      profilePicture: string;
    }>(
      `http://localhost/extensionManagementRestAPI/controllers/admin/show-user-profile.php?id=${id}`,
      {
        headers,
      }
    );
  }
  submit(id: string, formData: any): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `${localStorage.getItem('token')}`
    );
    return this.http.post(
      `http://localhost/extensionManagementRestAPI/controllers/admin/edit_user_profile.php?id=${id}`,
      formData,
      { headers }
    );
  }
}
