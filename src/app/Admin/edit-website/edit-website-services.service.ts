import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
}
