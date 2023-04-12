import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  private apiUrl =
    'http://localhost/extensionManagementRestAPI/controllers/users/create_account.php';

  constructor(private http: HttpClient) {}

  register(data: any): Observable<any> {
    return this.http.post<{
      status: string;
    }>(this.apiUrl, data);
  }
}
