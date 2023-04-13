import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { EditProfileService } from 'src/app/User/edit-profile/edit-profile.service';
import { LandingService } from 'src/app/landing-page/landing.service';

@Component({
  selector: 'app-edit-user-account',
  templateUrl: './edit-user-account.component.html',
  styleUrls: ['./edit-user-account.component.css'],
})
export class EditUserAccountComponent {
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
    });
    this.profileForm = this.formBuilder.group({
      fullName: '',
      email: '',
      position: '',
    });

    //get user info
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
}
