import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  private apiUrl = 'http://localhost/ev1/controllers/users/create_account.php';

  constructor(private http: HttpClient) {}

  register(data: any) {
    return this.http.post(this.apiUrl, data);
  }
}
