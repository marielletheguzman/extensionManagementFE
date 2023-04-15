import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ViewSpecificPartnerServicesService {
  constructor(private http: HttpClient) {}

  getSpecificPartner(id: Number): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `${localStorage.getItem('token')}`
    );
    return this.http.get(
      `http://localhost/extensionManagementRestAPI/controllers/admin/show_specific_partner.php?id=${id}`,
      {
        headers,
      }
    );
  }
}
