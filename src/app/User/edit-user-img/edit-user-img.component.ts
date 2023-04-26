import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { EditProfileService } from '../edit-profile/edit-profile.service';
import { LandingService } from 'src/app/landing-page/landing.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { EditUserImgService } from './edit-user-img.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-edit-user-img',
  templateUrl: './edit-user-img.component.html',
  styleUrls: ['./edit-user-img.component.css'],
})
export class EditUserImgComponent {
  profileForm!: FormGroup;
  img = new FormGroup({
    profilePicture: new FormControl(''),
  });
  profileDetails = {
    fullName: '',
    email: '',
    position: '',
    profilePicture: '',
  };
  systemProfile = {
    Logo: '',
    WebsiteName: '',
    ThemeColor: '',
    Description: '',
    MainImg: '',
  };
  constructor(
    private formBuilder: FormBuilder,
    private editProfileServices: EditProfileService,
    private editProfile: EditUserImgService,
    private landingService: LandingService,
    private messageService: MessageService,
    private router: Router
  ) {}
  ngOnInit() {
    this.editProfileServices.getUserInfo().subscribe((data: any) => {
      this.profileDetails = data;
      console.log(this.profileDetails);
    });
    this.landingService.getSystemProfile().subscribe((data: any) => {
      this.systemProfile = data;
      console.log(this.systemProfile);
    });
  }
  onSubmit() {
    const formData = new FormData();
    if (this.img.value.profilePicture) {
      formData.append('profilePicture', this.img.value.profilePicture);
      console.log('profilePicture:', this.img.value.profilePicture);
      console.log('formData:', formData);
    }
    this.editProfile.submitImg(formData).subscribe(
      (response) => {
        this.messageService.add({
          key: 'bc',
          severity: 'success',
          summary: 'Success',
          detail: 'Image Updated',
        });
        timer(1000)
          .toPromise()
          .then((done) => {
            this.router.navigate(['/edit-profile']);
          });
      },
      (error) => {
        this.messageService.add({
          key: 'bc',
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to update',
        });
      }
    );
  }
  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.img.patchValue({
        profilePicture: file,
      });
    }
  }
  alpha = 0.1;
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
