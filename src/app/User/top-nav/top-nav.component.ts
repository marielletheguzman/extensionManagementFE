import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/auth-service.service';
import { UserAuthService } from 'src/app/user-auth.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css'],
})
export class TopNavComponent {
  constructor(private authService: UserAuthService, private router: Router) {}
  onLogoutClick() {
    this.authService.logout();
    this.router.navigate(['/login']);
    alert('logged out');
  }
}
