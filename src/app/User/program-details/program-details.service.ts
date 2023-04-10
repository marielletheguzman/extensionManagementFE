import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProgramDetailsService {
  constructor(private http: HttpClient) {}

  // Modify getProgram method to take program id as a parameter and use it to construct the URL
  getProgram(id: string): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `${localStorage.getItem('token')}`
    );
    return this.http.get(
      `http://localhost/extensionManagementRestAPI/controllers/users/show_specific_program.php?id=${id}`,
      {
        headers,
      }
    );
  }
}
