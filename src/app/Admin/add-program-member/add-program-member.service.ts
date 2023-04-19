import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddProgramMemberService {
  private getApiUrl = `http://localhost/extensionManagementRestAPI/controllers/admin/show_manage_account.php`;
  constructor(private http: HttpClient) {}
  getProgramMembers(): Observable<any> {
    return this.http.get(this.getApiUrl);
  }
}
