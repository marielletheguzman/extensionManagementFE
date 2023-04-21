import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'app-add-participant',
  templateUrl: './add-participant.component.html',
  styleUrls: ['./add-participant.component.css'],
})
export class AddParticipantComponent {
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
  ngOnInit() {
    this.myForm = this.fb.group({
      participant: ['', Validators.required],
      entity: ['', Validators.required],
    });
  }

  onSubmit(): void {
    const participant = this.myForm.controls['participant'].value;
    const entity = this.myForm.controls['entity'].value;
    const headers = new HttpHeaders().set(
      'Authorization',
      `${localStorage.getItem('token')}`
    );
    const url =
      'http://localhost/extensionManagementRestAPI/controllers/admin/create_prog_part.php';
    const body = { participant, entity };
    this.http.post(url, body, { headers }).subscribe(
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
      }
    );
    timer(50)
      .toPromise()
      .then((done) => {
        this.router.navigate(['/admin/list-member']);
      });
  }
}
