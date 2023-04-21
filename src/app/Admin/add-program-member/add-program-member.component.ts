import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { AddProgramMemberService } from './add-program-member.service';
import { Router } from '@angular/router';

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
  myForm!: FormGroup;
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private message: MessageService,
    private router: Router
  ) {}
  ngOnInit(): void {
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
      },
      (error) => {
        console.error(error);
        this.message.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to add user to program',
        });
        timer(50)
          .toPromise()
          .then((done) => {
            this.router.navigate(['/admin/list-member']);
          });
      }
    );
  }
}
