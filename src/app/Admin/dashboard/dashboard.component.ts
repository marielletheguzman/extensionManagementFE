import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  toggleNav() {
  // let btn = document.querySelector("#btn");
  let sidebar = document.querySelector(".sidebar");
  sidebar?.classList.toggle("active");
  }

myLogout() {
  // let btn = document.querySelector("#btn");
  let sidebar = document.querySelector(".sidebar");
  sidebar?.classList.toggle("active");
  }
}
// export class SidenavComponent {
//   sidenavOpened = false;

//   toggleSidenav() {
//     this.sidenavOpened = !this.sidenavOpened;
//   }
// }
