import { Component } from '@angular/core';
import { homepage } from './homepage-data';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent {
  company: homepage = {
    upperNavColor: '#1e0550',
    companyLogo: 'https://bulsu.edu.ph/resources/colleges-logo/CICT.png',
    companyName: 'College of Information Communication & Technology',
    companyTitle: 'Extension Office Management System',
    companyDescription:
      'Sed sed sem diam. Aliquam velit odio, faucibus vel eleifend nec, blandit ac elit. Donec in est ullamcorper, finibus mi sit amet, molestie nulla. Sed velit purus, imperdiet et ultricies vel, placerat vitae nulla. Etiam nisl ipsum, laoreet nec quam in, molestie consequat sem. Proin vulputate vitae massa vel facilisis. Aliquam erat volutpat. Sed eleifend tempus d',
    companyImage:
      'https://www.bulakenyo.ph/wp-content/uploads/2021/08/parallax-bg2.jpg',
  };
  alpha = 0.05;
  hex = this.company.upperNavColor;

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
