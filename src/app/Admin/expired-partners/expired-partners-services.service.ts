import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExpiredPartnersServicesService {
  private getUrlApi =
    'http://localhost/extensionManagementRestAPI/controllers/admin/show_expired_partners.php';
  private getExpiredApi =
    'http://localhost/extensionManagementRestAPI/controllers/admin/show_expired_partners.php';
  constructor(private http: HttpClient) {}

  getOngoingPartners(): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `${localStorage.getItem('token')}`
    );
    return this.http.get(this.getUrlApi, {
      headers,
    });
  }

  getExpired(): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `${localStorage.getItem('token')?.replace('Bearer ', '')}`
    );
    console.log(`Token: ${localStorage.getItem('token')}`);
    return this.http.get(this.getExpiredApi, {
      headers,
    });
  }
}
