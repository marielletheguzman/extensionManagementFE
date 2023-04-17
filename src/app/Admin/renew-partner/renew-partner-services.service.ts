import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RenewPartnerServicesService {
  private updateRenewUrl = `http://localhost/extensionManagementRestAPI/controllers/admin/update_renew_expired.php`;

  constructor(private http: HttpClient) {}

  submit(id: number, data: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `${localStorage.getItem('token')}`,
    });
    return this.http.put(
      `http://localhost/extensionManagementRestAPI/controllers/admin/update_renew_expired.php?id=${id}`,
      data,
      { headers }
    );
  }
}
