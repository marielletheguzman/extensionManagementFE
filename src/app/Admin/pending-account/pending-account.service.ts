import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PendingAccountService {
  private getApiUrl = `http://localhost/extensionManagementRestAPI/controllers/admin/show_pending_list.php`;
  constructor(private http: HttpClient) {}

  getPendingAccounts(): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `${localStorage.getItem('token')}`
    );
    return this.http.get(this.getApiUrl, {
      headers,
    });
  }
}
