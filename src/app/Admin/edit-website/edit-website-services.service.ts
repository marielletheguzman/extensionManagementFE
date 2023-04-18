import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservedValueOf } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EditWebsiteServicesService {
  private adminApiUrl =
    'http://localhost/extensionManagementRestAPI/controllers/admin/edit_admin_profile.php';
  constructor(private http: HttpClient) {}

  getAdminInfo(): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `${localStorage.getItem('token')}`
    );
    return this.http.get<{
      Logo: String;
      WebsiteName: String;
      Description: String;
      ThemeColor: String;
      MainImg: String;
    }>(this.adminApiUrl, {
      headers,
    });
  }
  submitLogo(data: any): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `${localStorage.getItem('token')}`
    );
    return this.http.post(
      `http://localhost/extensionManagementRestAPI/controllers/admin/edit-admin-logo.php`,
      data,
      { headers }
    );
  }

  submitImg(data: any): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `${localStorage.getItem('token')}`
    );
    return this.http.post(
      `http://localhost/extensionManagementRestAPI/controllers/admin/edit-admin-main-img.php`,
      data,
      { headers }
    );
  }
}
