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
  onView(id: string) {
    this.router.navigate(['admin/view_partner', id]);
  }
}
