import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/auth-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private authService: AuthServiceService,
    private router: Router
  ) {}
  ngOnInit() {
    console.log('HomeComponent initialized');
  }
  onLogoutClick() {
    this.authService.logout();
    this.router.navigate(['/login']);
    alert('logged out');
  }
}
