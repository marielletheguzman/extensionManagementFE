import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/auth-service.service';
import { LandingService } from 'src/app/landing-page/landing.service';
import { UserAuthService } from 'src/app/user-auth.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css'],
})
export class TopNavComponent {
  constructor(
    private authService: UserAuthService,
    private router: Router,
    private landingService: LandingService
  ) {}

  systemProfile = {
    Logo: '',
    WebsiteName: '',
    ThemeColor: '',
    Description: '',
    MainImg: '',
  };

  ngOnInit() {
    this.landingService.getSystemProfile().subscribe((data: any) => {
      this.systemProfile = data;
      console.log(this.systemProfile);
    });
    let menu = document.querySelector('#menu-icon');
    let navigation = document.querySelector('.navigation');

    menu!.addEventListener('click', function () {
      if (menu!.classList.toggle('bx-x')) {
        navigation!.classList.toggle('open');
      } else {
        navigation!.classList.toggle('open');
      }
    });
  }
  onLogoutClick() {
    this.authService.logout();
    this.router.navigate(['/login']);
    alert('logged out');
  }
}
