import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EditProfileService {
  updateProfile(profileData: any) {
    throw new Error('Method not implemented.');
  }
  private getUser =
    'http://localhost/extensionManagementRestAPI/controllers/users/show_user_profile.php';
  private updateUser =
    'http://localhost/extensionManagementRestAPI/controllers/users/user_update_profile.php';
  constructor(private http: HttpClient) {}

  getUserInfo(): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `${localStorage.getItem('token')}`
    );
    return this.http.get<{
      fullName: string;
      email: string;
      position: string;
      profilePicture: string;
    }>(this.getUser, {
      headers,
    });
  }

  submit(formData: any): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `${localStorage.getItem('token')}`
    );
    return this.http.put(this.updateUser, formData, { headers });
  }
}
