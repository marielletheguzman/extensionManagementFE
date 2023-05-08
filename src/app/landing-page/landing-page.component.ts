import { Component } from '@angular/core';
import { homepage } from './homepage-data';
import { LandingService } from './landing.service';
import { HttpClient } from '@angular/common/http';
import { PrimeNGConfig } from 'primeng/api';
import { CarouselModule } from 'primeng/carousel';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent {
  systemProfile = {
    Logo: '',
    WebsiteName: '',
    ThemeColor: '',
    Description: '',
    MainImg: '',
  };
  partners!: any[];
  isLoading = false;
  constructor(
    private landingService: LandingService,
    private http: HttpClient,
    private primengConfig: PrimeNGConfig
  ) {}

  alpha = 0.04;
  hex = this.systemProfile.ThemeColor;

  ngOnInit() {
    this.isLoading = true;
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
    this.isLoading = false;
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
