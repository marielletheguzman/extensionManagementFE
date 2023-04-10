import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PendingAccountService {
  http: any;

  constructor() {}
  getPrograms(): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `${localStorage.getItem('token')}`
    );
    return this.http.get(
      `http://localhost/extensionManagementRestAPI/controllers/admin/approve_account.php`,
      {
        headers,
      }
    );
  }
}
