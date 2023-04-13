import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddProgramService {
  private getApiUrl = `http://localhost/extensionManagementRestAPI/controllers/admin/show_all_extension_partners.php`;
  constructor(private http: HttpClient) {}

  getPendingAccounts(): Observable<any> {
    return this.http.get(this.getApiUrl);
  }
}
