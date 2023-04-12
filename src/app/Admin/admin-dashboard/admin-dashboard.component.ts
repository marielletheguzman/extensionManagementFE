import { Component } from '@angular/core';
import { AdminDashboardService } from './admin-dashboard.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LandingService } from 'src/app/landing-page/landing.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent {
  dashboardDetails = {
    numbersOfFaculty: '',
    numbersOfPendingAccounts: '',
    numbersOfExtensionPartner: '',
    numbersOfActivePrograms: '',
    partners: [
      {
        id: 1,
        extensionPartner: '',
        partnerAddress: '',
        partnerContactPerson: '',
        partnerContactNumber: '',
        partnerLogo: '',
        partnerMoaFile: '',
        partnerStartDate: '',
        partnerEndDate: '',
      },
    ],
  };

  constructor(
    //to get the background color in the database
    private landingService: LandingService,
    private authService: AdminDashboardService,
    private router: Router,
    private http: HttpClient
  ) {}

  systemProfile = {
    Logo: '',
    WebsiteName: '',
    ThemeColor: '',
    Description: '',
    MainImg: '',
  };
  data: any;

  options: any;
  ngOnInit(): void {
    const token = localStorage.getItem('token');

    this.landingService.getSystemProfile().subscribe((data: any) => {
      this.systemProfile = data;
    });
    this.authService.getDashboardDetails().subscribe((data: any) => {
      this.dashboardDetails = data;

      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      console.log(this.dashboardDetails.numbersOfFaculty);
      this.data = {
        labels: [
          'Faculty',
          'Pending Accounts',
          'Extension Partners',
          'Active Programs',
        ],
        datasets: [
          {
            data: [
              this.dashboardDetails.numbersOfFaculty,
              this.dashboardDetails.numbersOfPendingAccounts,
              this.dashboardDetails.numbersOfExtensionPartner,
              this.dashboardDetails.numbersOfActivePrograms,
            ],
            backgroundColor: [
              documentStyle.getPropertyValue('--blue-500'),
              documentStyle.getPropertyValue('--yellow-500'),
              documentStyle.getPropertyValue('--green-500'),
              documentStyle.getPropertyValue('--orange-500'),
            ],
            hoverBackgroundColor: [
              documentStyle.getPropertyValue('--blue-400'),
              documentStyle.getPropertyValue('--yellow-400'),
              documentStyle.getPropertyValue('--green-400'),
              documentStyle.getPropertyValue('--orange-400'),
            ],
          },
        ],
      };

      this.options = {
        responsive: false,
        maintainAspectRatio: false,
        cutout: '60%',
        plugins: {
          legend: {
            labels: {
              color: textColor,
            },
          },
        },
      };
    });
  }

  toggleNav() {
    let sidebar = document.querySelector('.sidebar');
    sidebar?.classList.toggle('active');
  }

  myLogout() {
    let sidebar = document.querySelector('.sidebar');
    sidebar?.classList.toggle('active');
  }

  //for thebackground color:::

  alpha = 0.04;
  alphaDarker = 0.8;
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
}
