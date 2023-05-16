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
  images = [
    {
      src: '../../assets/profiles/mercado1.jpg',
      alt: 'Image 1',
      text: 'This is the first image',
    },
    {
      src: '../../assets/profiles/mercado1.jpg',
      alt: 'Image 2',
      text: 'This is the second image',
    },
    {
      src: '../../assets/profiles/mercado1.jpg',
      alt: 'Image 3',
      text: 'This is the third image',
    },
  ];
  getVisibleItems(): number {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 576) {
      return 1; // Show 1 item on small screens (e.g., mobile)
    } else if (screenWidth <= 992) {
      return 2; // Show 2 items on medium screens (e.g., tablets)
    } else {
      return 3; // Show 3 items on larger screens (e.g., desktops)
    }
  }

  partners!: any[];
  isLoading = false;
  constructor(
    private landingService: LandingService,
    private http: HttpClient,
    private primengConfig: PrimeNGConfig
  ) {}

  alpha = 0.04;
  hex = this.systemProfile.ThemeColor;
  responsiveOptions: any[] | undefined;
  ngOnInit() {
    this.isLoading = true;
    this.landingService.getSystemProfile().subscribe((data: any) => {
      this.systemProfile = data;
      console.log(this.systemProfile);
    });

    this.responsiveOptions = [
      {
        breakpoint: '1400px',
        numVisible: 3,
        numScroll: 3,
      },
      {
        breakpoint: '1220px',
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: '1100px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
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
