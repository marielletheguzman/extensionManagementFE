import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/auth-service.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css'],
})
export class TopNavComponent {
  constructor(
    private authService: AuthServiceService,
    private router: Router
  ) {}
  onLogoutClick() {
    this.authService.logout();
    this.router.navigate(['/login']);
    alert('logged out');
  }
}
