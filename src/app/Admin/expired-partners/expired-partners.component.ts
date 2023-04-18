import { Component } from '@angular/core';
import { ManageServicesService } from '../manage-accounts/manage-services.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ExpiredPartnersServicesService } from './expired-partners-services.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-expired-partners',
  templateUrl: './expired-partners.component.html',
  styleUrls: ['./expired-partners.component.css'],
})
export class ExpiredPartnersComponent {
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
    private expiredPartnersService: ExpiredPartnersServicesService,
    private messageService: MessageService
  ) {
    //to initialized the token
    this.token = localStorage.getItem('token');
  }
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    this.expiredPartnersService.getOngoingPartners().subscribe((data: any) => {
      this.onGoingPartners = data;
      console.log(this.onGoingPartners);
    });
  }
  onView() {
    this.router.navigate(['admin/view_partner']);
  }
  renew(id: number) {
    this.router.navigate([`admin/renew_partner/${id}`]);
  }
}
