import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/auth-service.service';
import { ProgramListService } from './program-list.service';
import jwt_decode from 'jwt-decode';
import { UserAuthService } from 'src/app/user-auth.service';
import { LandingService } from 'src/app/landing-page/landing.service';
import { Table } from 'primeng/table';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'app-show-list',
  templateUrl: './show-list.component.html',
  styleUrls: ['./show-list.component.css'],
})
export class ShowListComponent {
  @ViewChild('myTab') myTab: Table | undefined;
  filterItems: MenuItem[] | undefined;
  programs: {
    programTitle: string;
    id: string;
    programLead: string;
    place: string;
    additionalDetails: string;
    partner: string;
    status: string;
    startDate: string;
    endDate: string;
  }[] = [];
  systemProfile = {
    Logo: '',
    WebsiteName: '',
    ThemeColor: '',
    Description: '',
    MainImg: '',
  };
  statuses: { label: string; value: string }[] = [
    { label: 'Any', value: '' },
    { label: 'Active', value: 'Active' },
    { label: 'Expired', value: 'Expired' },
  ];

  constructor(
    private authService: UserAuthService,
    private router: Router,
    private landingService: LandingService,
    private programService: ProgramListService
  ) {}
  selectedOption: string | undefined;
  ngOnInit(): void {
    const token = localStorage.getItem('token');

    this.programService.getPrograms().subscribe((data: any) => {
      this.programs = data.extensionPrograms;
    });
    this.landingService.getSystemProfile().subscribe((data: any) => {
      this.systemProfile = data;
      console.log(this.systemProfile);
    });
  }
  filterByOption() {
    if (this.selectedOption === 'Any') {
      this.myTab?.filter(['Active', 'Expired'], 'status', 'in');
    } else if (this.selectedOption) {
      this.myTab?.filter(this.selectedOption, 'status', 'equals');
    } else {
      this.myTab?.filterGlobal('', 'contains');
    }
  }
  //redirect to view on the other page
  onView(id: string) {
    this.router.navigate(['/program-details', id]);
  }

  alpha = 0.1;
  alphaDarker = 0.9;
  hex = this.systemProfile.ThemeColor;
  hexToRgbA(hex: string, alpha: number) {
    var r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
      return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
    } else {
      return 'rgb(' + r + ', ' + g + ', ' + b + ')';
    }
  }
  getSeverity(status: string) {
    switch (status.toLowerCase()) {
      case 'expired':
        return 'danger';
      case 'active':
        return 'success';
      default:
        return '';
    }
  }
}
