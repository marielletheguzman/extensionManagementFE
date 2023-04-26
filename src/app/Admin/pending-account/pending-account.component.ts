import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/auth-service.service';
import { PendingAccountService } from './pending-account.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {
  ConfirmEventType,
  ConfirmationService,
  MessageService,
} from 'primeng/api';
import { timer } from 'rxjs';
import { ImageModule } from 'primeng/image';
import { LandingService } from 'src/app/landing-page/landing.service';

@Component({
  selector: 'app-pending-account',
  templateUrl: './pending-account.component.html',
  styleUrls: ['./pending-account.component.css'],
  providers: [ConfirmationService, MessageService, ImageModule],
})
export class PendingAccountComponent {
  private token: string | null | undefined;
  pendingAccounts = {
    counts: '',
    pending: [
      {
        id: 0,
        fullName: '',
        email: '',
        position: '',
        profilePicture: '',
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
  selectedAccountId: Number | undefined;
  constructor(
    private router: Router,
    private landingService: LandingService,
    private pendingService: PendingAccountService,
    private http: HttpClient,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.token = localStorage.getItem('token');
  }

  ngOnInit(): void {
    this.landingService.getSystemProfile().subscribe((data: any) => {
      this.systemProfile = data;
      console.log(this.systemProfile);
    });
    const token = localStorage.getItem('token');

    this.pendingService.getPendingAccounts().subscribe((data: any) => {
      this.pendingAccounts = data;
      console.log(this.pendingAccounts);
    });
  }

  //redirect to view on the other page
  onView(id: string) {
    this.router.navigate(['/program-details', id]);
  }

  confirm(accountId: Number) {
    const headers = new HttpHeaders().set('Authorization', `${this.token}`);
    this.selectedAccountId = accountId;
    this.confirmationService.confirm({
      message: `Are you sure that you want to continue?`,
      header: 'Approve Account',
      accept: () => {
        // Make an HTTP request to the backend API
        this.http
          .put(
            'http://localhost/extensionManagementRestAPI/controllers/admin/approve_account.php?',
            { id: this.selectedAccountId },
            { headers }
          )
          .subscribe(
            (response) => {
              this.messageService.add({
                severity: 'success',
                summary: 'Successfully Approved',
                detail: 'Account Approved',
              });
              timer(750)
                .toPromise()
                .then((done) => {
                  window.location.reload();
                });
            },
            (error) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: error.message,
              });
            }
          );
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: 'warn',
              summary: 'Cancelled',
              detail: 'You have cancelled approving account',
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: 'warn',
              summary: 'Cancelled',
              detail: 'You have cancelled approving account',
            });
            break;
        }
      },
    });
  }

  reject(accountId: Number) {
    const headers = new HttpHeaders().set('Authorization', `${this.token}`);
    this.selectedAccountId = accountId;
    this.confirmationService.confirm({
      message: `Are you sure that you want to continue?`,
      header: 'Reject Account',
      accept: () => {
        // Make an HTTP request to the backend API
        this.http
          .put(
            'http://localhost/extensionManagementRestAPI/controllers/admin/decline_account.php?id=',
            { id: this.selectedAccountId },
            { headers }
          )
          .subscribe(
            (response) => {
              this.messageService.add({
                severity: 'success',
                summary: 'Successfully Declined',
                detail: 'Account Successfully Rejected',
              });
              timer(750)
                .toPromise()
                .then((done) => {
                  window.location.reload();
                });
            },
            (error) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: error.message,
              });
            }
          );
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: 'warn',
              summary: 'Cancelled',
              detail: 'You have cancelled rejecting account',
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: 'warn',
              summary: 'Cancelled',
              detail: 'You have cancelled rejecting account',
            });
            break;
        }
      },
    });
  }
}
