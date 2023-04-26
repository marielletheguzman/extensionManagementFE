import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  ConfirmEventType,
  ConfirmationService,
  MessageService,
} from 'primeng/api';
import { ManageServicesService } from './manage-services.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { timer } from 'rxjs';
import { LandingService } from 'src/app/landing-page/landing.service';

@Component({
  selector: 'app-manage-accounts',
  templateUrl: './manage-accounts.component.html',
  styleUrls: ['./manage-accounts.component.css'],
  providers: [ConfirmationService, MessageService],
})
export class ManageAccountsComponent {
  activeAccounts = {
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

  private token: string | null | undefined;

  //para makuha yung selected if galing sa html
  selectedAccountId: Number | undefined;

  constructor(
    private router: Router,
    private manageServices: ManageServicesService,
    private http: HttpClient,
    private landingService: LandingService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    //to initialized the token
    this.token = localStorage.getItem('token');
  }
  ngOnInit(): void {
    this.landingService.getSystemProfile().subscribe((data: any) => {
      this.systemProfile = data;
      console.log(this.systemProfile);
    });
    const token = localStorage.getItem('token');
    this.manageServices.getActiveAccount().subscribe((data: any) => {
      this.activeAccounts = data;
      console.log(this.activeAccounts);
    });
  }

  archive(accountId: Number) {
    const headers = new HttpHeaders().set('Authorization', `${this.token}`);
    this.selectedAccountId = accountId;
    this.confirmationService.confirm({
      message: `Are you sure that you want to continue?`,
      header: 'Achive Account',
      accept: () => {
        // Make an HTTP request to the backend API
        this.http
          .put(
            'http://localhost/extensionManagementRestAPI/controllers/admin/archive_account.php',
            { id: this.selectedAccountId },
            { headers }
          )
          .subscribe(
            (response) => {
              this.messageService.add({
                severity: 'success',
                summary: 'Successfully Archived',
                detail: 'Account Archived',
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
              detail: 'You have cancelled archiving account',
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: 'warn',
              summary: 'Cancelled',
              detail: 'You have cancelled archiving account',
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
      header: 'Approve Account',
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
                detail: 'Account Successfully Declined',
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
              detail: 'You have cancelled declining account',
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: 'warn',
              summary: 'Cancelled',
              detail: 'You have cancelled declining account',
            });
            break;
        }
      },
    });
  }
  edit(id: number) {
    this.router.navigate([`admin/edit_user/${id}`]);
  }
}
