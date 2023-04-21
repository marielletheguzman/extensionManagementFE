import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UploadRelatedFilesService {
  constructor(private http: HttpClient) {}

  submit(data: any, id: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `${localStorage.getItem('token')}`,
    });
    return this.http.post(
      `http://localhost/extensionManagementRestAPI/controllers/admin/update_related_files.php?id=${id}`,
      data,
      { headers }
    );
  }
}
