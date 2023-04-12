import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminDashboardService {
  constructor(private http: HttpClient) {}
  private apiUrl = `http://localhost/extensionManagementRestAPI/controllers/admin/show_dashboard.php`;

  getDashboardDetails(): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `${localStorage.getItem('token')}`
    );
    return this.http.get<{
      numbersOfFaculty: string;
      numbersOfPendingAccounts: string;
      numbersOfExtensionPartner: string;
      numbersOfActivePrograms: string;
      partners: {
        id: number;
        extensionPartner: string;
        partnerAddress: string;
        partnerContactPerson: string;
        partnerContactNumber: string;
        partnerLogo: string;
        partnerMoaFile: string;
        partnerStartDate: string;
        partnerEndDate: string;
      };
    }>(`${this.apiUrl}`, { headers });
  }
}
