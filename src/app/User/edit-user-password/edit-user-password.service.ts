import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EditUserPasswordService {
  constructor(private http: HttpClient) {}
  submit(formData: any): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `${localStorage.getItem('token')}`
    );
    return this.http.post(
      `http://localhost/extensionManagementRestAPI/controllers/users/user_update_password.php`,
      formData,
      { headers }
    );
  }
}
