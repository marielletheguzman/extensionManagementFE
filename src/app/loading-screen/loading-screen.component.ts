import { Component } from '@angular/core';
import { LandingService } from '../landing-page/landing.service';
import { HttpClient } from '@angular/common/http';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.css'],
})
export class LoadingScreenComponent {
  systemProfile = {
    Logo: '',
    WebsiteName: '',
    ThemeColor: '',
    Description: '',
    MainImg: '',
  };
  partners!: any[];

  constructor(
    private landingService: LandingService,
    private http: HttpClient,
    private primengConfig: PrimeNGConfig
  ) {}

  alpha = 1;
  hex = this.systemProfile.ThemeColor;

  ngOnInit() {
    this.landingService.getSystemProfile().subscribe((data: any) => {
      this.systemProfile = data;
      console.log(this.systemProfile);
    });
    this.http
      .get(
        `http://localhost/extensionManagementRestAPI/controllers/admin/show_ongoing_for_landing.php`
      )
      .subscribe((data: any) => {
        this.partners = data.partners;
        console.log(data);
      });
  }

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
