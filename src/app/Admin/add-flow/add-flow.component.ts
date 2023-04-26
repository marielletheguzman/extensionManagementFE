import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { LandingService } from 'src/app/landing-page/landing.service';

@Component({
  selector: 'app-add-flow',
  templateUrl: './add-flow.component.html',
  styleUrls: ['./add-flow.component.css'],
})
export class AddFlowComponent {
  users = {
    selectedId: 0,
    eventName: '',
    eventType: '',
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
  ngOnInit() {
    this.landingService.getSystemProfile().subscribe((data: any) => {
      this.systemProfile = data;
      console.log(this.systemProfile);
    });
    this.myForm = this.fb.group({
      eventName: ['', Validators.required],
      eventType: ['', Validators.required],
    });
  }
  onSubmit(): void {
    const eventName = this.myForm.controls['eventName'].value;
    const eventType = this.myForm.controls['eventType'].value;
    const headers = new HttpHeaders().set(
      'Authorization',
      `${localStorage.getItem('token')}`
    );
    const url =
      'http://localhost/extensionManagementRestAPI/controllers/admin/create_program_fl.php';
    const body = { eventName, eventType };
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
