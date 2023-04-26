import { Component } from '@angular/core';
import { ManageServicesService } from '../manage-accounts/manage-services.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ExpiredPartnersServicesService } from './expired-partners-services.service';
import { MessageService } from 'primeng/api';
import { LandingService } from 'src/app/landing-page/landing.service';

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
  systemProfile = {
    Logo: '',
    WebsiteName: '',
    ThemeColor: '',
    Description: '',
    MainImg: '',
  };
  private token: string | null | undefined;
  selectedAccountId: Number | undefined;
  constructor(
    private router: Router,
    private manageServices: ManageServicesService,
    private http: HttpClient,
    private landingService: LandingService,
    private expiredPartnersService: ExpiredPartnersServicesService,
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
