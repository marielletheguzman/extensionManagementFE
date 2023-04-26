import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EditProfileService } from './edit-profile.service';
import { LandingService } from 'src/app/landing-page/landing.service';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
  providers: [MessageService],
})
export class EditProfileComponent implements OnInit {
  profileForm!: FormGroup;
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
    private landingService: LandingService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.landingService.getSystemProfile().subscribe((data: any) => {
      this.systemProfile = data;
      console.log(this.systemProfile);
    });

    this.profileForm = this.formBuilder.group({
      fullName: '',
      email: '',
      position: '',
    });

    this.editProfileServices.getUserInfo().subscribe((data: any) => {
      this.profileDetails = data;
      console.log(this.profileDetails);

      this.profileForm.setValue({
        fullName: this.profileDetails.fullName,
        email: this.profileDetails.email,
        position: this.profileDetails.position,
      });
    });
  }

  onSubmit() {
    this.editProfileServices.submit(this.profileForm.value).subscribe(
      (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'User Updated Successfully',
        });
        timer(500)
          .toPromise()
          .then((done) => {
            this.router.navigate(['/edit-profile']);
          });
        console.log('Success');
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to Update the User',
        });
      }
    );
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

  lightAlpha = 0.8;
  lightRGBA(hex: string, lightAlpha: number) {
    var r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);

    if (lightAlpha) {
      return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + lightAlpha + ')';
    } else {
      return 'rgb(' + r + ', ' + g + ', ' + b + ')';
    }
  }
}
