import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/auth-service.service';
import { LandingService } from 'src/app/landing-page/landing.service';
import { UserAuthService } from 'src/app/user-auth.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
})
export class SideNavComponent {
  systemProfile = {
    Logo: '',
    WebsiteName: '',
    ThemeColor: '',
    Description: '',
    MainImg: '',
  };
  constructor(
    private landingService: LandingService,
    private authService: AuthServiceService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.landingService.getSystemProfile().subscribe((data: any) => {
      this.systemProfile = data;
      console.log(this.systemProfile);
    });
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

  toggleNav() {
    // let btn = document.querySelector("#btn");
    let sidebar = document.querySelector('.sidebar');
    sidebar?.classList.toggle('active');
  }

  myLogout() {
    this.authService.logout();
    this.router.navigate(['']);
    alert('logged out');
  }
}
// export class SidenavComponent {
//   sidenavOpened = false;

//   toggleSidenav() {
//     this.sidenavOpened = !this.sidenavOpened;
//   }
// }
