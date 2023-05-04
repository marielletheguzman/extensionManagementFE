import { Component } from '@angular/core';
import { AddProgramService } from './add-program.service';
import { Router } from '@angular/router';
import { PendingAccountService } from '../pending-account/pending-account.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  ConfirmEventType,
  ConfirmationService,
  MessageService,
} from 'primeng/api';
import { timer } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LandingService } from 'src/app/landing-page/landing.service';

@Component({
  selector: 'app-add-program',
  templateUrl: './add-program.component.html',
  styleUrls: ['./add-program.component.css'],
})
export class AddProgramComponent {
  users = {
    pending: [
      {
        id: 0,
        fullName: '',
        position: '',
      },
    ],
  };
  partnerss = {
    partners: [
      {
        id: 0,
        partnerName: '',
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
  date: Date | undefined;
  myForm!: FormGroup;
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private landingService: LandingService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    console.log('users: ');
    console.log(this.users);
    this.landingService.getSystemProfile().subscribe((data: any) => {
      this.systemProfile = data;
      console.log(this.systemProfile);
    });
    this.http
      .get<any>(
        'http://localhost/extensionManagementRestAPI/controllers/admin/show_all_extension_partners.php'
      )
      .subscribe((data) => {
        if (data && data['partners']) {
          this.partnerss.partners = data.partners;
          console.log(this.partnerss);
        }
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
      programTitle: ['', Validators.required],
      programLead: ['', Validators.required],
      place: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      additionalDetails: ['', Validators.required],
      partner: ['', Validators.required],
    });
  }

  onSubmit() {
    const selectedUser = this.myForm.controls['programLead'].value;
    console.log(selectedUser);
    const programLead = selectedUser.fullName;
    const data = {
      programTitle: this.myForm.value.programTitle,
      programLead: programLead,
      place: this.myForm.value.place,
      startDate: this.myForm.value.startDate,
      endDate: this.myForm.value.endDate,
      additionalDetails: this.myForm.value.additionalDetails,
      partner: this.myForm.value.partner.partnerName,
    };

    const headers = new HttpHeaders().set(
      'Authorization',
      `${localStorage.getItem('token')}`
    );
    this.http
      .post(
        'http://localhost/extensionManagementRestAPI/controllers/admin/create_extensionprograms.php',
        data,
        { headers }
      )
      .subscribe(
        (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Program Added',
          });
          timer(200)
            .toPromise()
            .then((done) => {
              this.router.navigate(['/admin/list-member']);
            });
          // this.router.navigate(['/home']);
        },
        (err) => {
          this.messageService.add({
            severity: 'warn',
            summary: 'Warn',
            detail: 'Message Content',
          });
        }
      );
  }
}
