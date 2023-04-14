import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddPartnerServicesService {
  private apiUrl =
    'http://localhost/extensionManagementRestAPI/controllers/admin/create_extensionpartner.php';
  constructor(private http: HttpClient) {}

  createPartner(data: any): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `${localStorage.getItem('token')}`
    );
    return this.http.post(this.apiUrl, {
      headers,
    });
  }
}
