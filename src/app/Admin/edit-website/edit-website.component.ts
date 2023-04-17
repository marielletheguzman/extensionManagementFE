// import { HttpClient } from '@angular/common/http';
// import { Component, ViewChild } from '@angular/core';
// import { ColorPicker, ColorPickerModule } from 'primeng/colorpicker';
// import { EditWebsiteServicesService } from './edit-website-services.service';
// import { FormBuilder, FormGroup } from '@angular/forms';

// @Component({
//   selector: 'app-edit-website',
//   templateUrl: './edit-website.component.html',
//   styleUrls: ['./edit-website.component.css'],
//   providers: [ColorPickerModule],
// })
// export class EditWebsiteComponent {
//   profileForm!: FormGroup;
//   systemProfile = {
//     Logo: '',
//     WebsiteName: '',
//     ThemeColor: '',
//     Description: '',
//     MainImg: '',
//   };

//   constructor(
//     private http: HttpClient,
//     private editWebsiteServices: EditWebsiteServicesService,
//     private formBuilder: FormBuilder
//   ) {}

//   ngOnInit() {
//     this.editWebsiteServices.getAdminInfo().subscribe((data: any) => {
//       this.systemProfile = data;
//       console.log(this.systemProfile);
//     });
//     this.profileForm = this.formBuilder.group({
//       fullName: '',
//       email: '',
//       position: '',
//     });
//   }

//   onSubmit() {
//     const formData = new FormData();
//     // formData.append('Logo', this.Logo);
//     // formData.append('WebsiteName', this.WebsiteName);
//     // formData.append('ThemeColor', this.ThemeColor);
//     // formData.append('Description', this.Description);
//     // formData.append('MainImg', this.MainImg);

//     this.http
//       .post(
//         'http://localhost/extensionManagementRestAPI/controllers/admin/edit_admin_profile.php',
//         formData
//       )
//       .subscribe((response) => console.log(response));
//   }

//   // onLogoSelected(event: any) {
//   //   this.Logo = event.target.files[0];
//   // }

//   // onMainImgSelected(event: any) {
//   //   this.MainImg = event.target.files[0];
//   // }
// }
