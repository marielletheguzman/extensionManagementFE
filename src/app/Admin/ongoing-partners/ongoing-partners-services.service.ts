import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OngoingPartnersServicesService {
  private getUrlApi =
    'http://localhost/extensionManagementRestAPI/controllers/admin/show_ongoing_partners.php';
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
}
