import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ManageServicesService {
  private getAccountsApiUrl =
    'http://localhost/extensionManagementRestAPI/controllers/admin/show_manage_account.php';
  constructor(private http: HttpClient) {}

  getActiveAccount(): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `${localStorage.getItem('token')}`
    );
    return this.http.get(this.getAccountsApiUrl, {
      headers,
    });
  }
}
