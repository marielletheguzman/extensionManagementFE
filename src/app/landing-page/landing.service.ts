import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LandingService {
  private apiUrl =
    'http://localhost/extensionManagementRestAPI/controllers/admin/show_admin_profile.php';

  constructor(private http: HttpClient) {}

  getSystemProfile(): Observable<any> {
    return this.http.get<{
      Logo: string;
      WebsiteName: string;
      ThemeColor: string;
      Description: string;
      MainImg: string;
    }>(`${this.apiUrl}`);
  }
}
