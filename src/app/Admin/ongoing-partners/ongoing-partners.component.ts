import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { OngoingPartnersServicesService } from './ongoing-partners-services.service';
import { ManageServicesService } from '../manage-accounts/manage-services.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-ongoing-partners',
  templateUrl: './ongoing-partners.component.html',
  styleUrls: ['./ongoing-partners.component.css'],
})
export class OngoingPartnersComponent {
  onGoingPartners = {
    count: '',
    partners: [
      {
        id: 0,
        partnerName: '',
        partnerAddress: '',
        partnerContactPerson: '',
        partnerContactNumber: '',
        partnerLogo: '',
        partnerMoaFile: '',
        partnerStartDate: '',
        partnerEndDate: '',
        partnerIsExpired: '',
        added_at: '',
      },
    ],
  };
  private token: string | null | undefined;
  selectedAccountId: Number | undefined;
  constructor(
    private router: Router,
    private manageServices: ManageServicesService,
    private http: HttpClient,
    private ongoingPartnerService: OngoingPartnersServicesService,
    private messageService: MessageService
  ) {
    //to initialized the token
    this.token = localStorage.getItem('token');
  }
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    this.ongoingPartnerService.getOngoingPartners().subscribe((data: any) => {
      this.onGoingPartners = data;
      console.log(this.onGoingPartners);
    });
  }
  onView() {
    this.router.navigate(['admin/view_partner']);
  }

  // onView(accountId: Number) {
  //   const headers = new HttpHeaders().set('Authorization', `${this.token}`);
  //   this.selectedAccountId = accountId;
  //   this.selectedAccountId = accountId;
  //   this.confirmationService.confirm({
  //     message: `Are you sure that you want to continue?`,
  //     header: 'Achive Account',
  //     accept: () => {
  //       // Make an HTTP request to the backend API
  //       this.http
  //         .put(
  //           'http://localhost/extensionManagementRestAPI/controllers/admin/archive_account.php',
  //           { id: this.selectedAccountId },
  //           { headers }
  //         )
  //         .subscribe(
  //           (response) => {
  //             this.messageService.add({
  //               severity: 'success',
  //               summary: 'Successfully Approved',
  //               detail: 'Account Approved',
  //             });
  //             timer(750)
  //               .toPromise()
  //               .then((done) => {
  //                 window.location.reload();
  //               });
  //           },
  //           (error) => {
  //             this.messageService.add({
  //               severity: 'error',
  //               summary: 'Error',
  //               detail: error.message,
  //             });
  //           }
  //         );
  //     },
  //     reject: (type: any) => {
  //       switch (type) {
  //         case ConfirmEventType.REJECT:
  //           this.messageService.add({
  //             severity: 'warn',
  //             summary: 'Cancelled',
  //             detail: 'You have cancelled archiving account',
  //           });
  //           break;
  //         case ConfirmEventType.CANCEL:
  //           this.messageService.add({
  //             severity: 'warn',
  //             summary: 'Cancelled',
  //             detail: 'You have cancelled archiving account',
  //           });
  //           break;
  //       }
  //     },
  //   });
  // }
}
