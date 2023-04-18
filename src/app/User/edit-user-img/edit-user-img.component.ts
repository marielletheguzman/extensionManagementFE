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
}
