import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { AddProgramMemberService } from './add-program-member.service';
import { Router } from '@angular/router';
import { LandingService } from 'src/app/landing-page/landing.service';

@Component({
  selector: 'app-add-program-member',
  templateUrl: './add-program-member.component.html',
  styleUrls: ['./add-program-member.component.css'],
})
export class AddProgramMemberComponent implements OnInit {
  users = {
    pending: [
      {
        id: 0,
        fullName: '',
        position: '',
      },
    ],
  };
  systemProfile = {
    Logo: '',
    WebsiteName: '',
    ThemeColor: '',
    Description: '',
    MainImg: '',
  };
  myForm!: FormGroup;
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private landingService: LandingService,
    private message: MessageService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.landingService.getSystemProfile().subscribe((data: any) => {
      this.systemProfile = data;
      console.log(this.systemProfile);
    });
    const headers = new HttpHeaders().set(
      'Authorization',
      `${localStorage.getItem('token')}`
    );
    this.http
      .get<any>(
        'http://localhost/extensionManagementRestAPI/controllers/admin/show_manage_account.php'
      )
      .subscribe((data) => {
        if (data && data['pending']) {
          this.users.pending = data.pending;
          console.log(this.users.pending);
        }
      });

    this.myForm = this.fb.group({
      name: ['', Validators.required],
      involvement: ['', Validators.required],
    });
  }
  onSubmit(): void {
    const selectedUser = this.myForm.controls['name'].value;
    const userId = selectedUser.id;
    const position = selectedUser.position;
    const name = selectedUser.fullName;
    const involvement = this.myForm.controls['involvement'].value;
    const headers = new HttpHeaders().set(
      'Authorization',
      `${localStorage.getItem('token')}`
    );
    const url =
      'http://localhost/extensionManagementRestAPI/controllers/admin/create_program_mems.php';
    const body = { user_id: userId, position, name, involvement };
    this.http.post(url, body).subscribe(
      (response) => {
        console.log(response);
        this.message.add({
          severity: 'success',
          summary: 'Success',
          detail: 'User added to program',
        });
        timer(300)
          .toPromise()
          .then((done) => {
            this.router.navigate(['/admin/list-member']);
          });
      },
      (error) => {
        console.error(error);
        this.message.add({
          severity: 'success',
          summary: 'Success',
          detail: 'User added to program',
        });
        timer(300)
          .toPromise()
          .then((done) => {
            this.router.navigate(['/admin/list-member']);
          });
      }
    );
  }
}
